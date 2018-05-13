import AWS from 'aws-sdk'
import BaseStore from 'ghost-storage-base'
import { join } from 'path'
import { readFile } from 'fs'

const readFileAsync = function(filename) {
  return new Promise(function(resolve, reject) {
    readFile(filename, function(err, data) {
      if (err) 
        reject(err); 
      else 
        resolve(data);
    });
  });
};

const stripLeadingSlash = s => s.indexOf('/') === 0 ? s.substring(1) : s

class Store extends BaseStore {
  constructor (config = {}) {
    super(config)

    const {
      accessKeyId,
      assetHost,
      bucket,
      pathPrefix,
      region,
      secretAccessKey,
      endpoint,
      serverSideEncryption
    } = config

    // Compatible with the aws-sdk's default environment variables
    this.accessKeyId = process.env.AWS_ACCESS_KEY_ID || accessKeyId
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || secretAccessKey
    this.region = process.env.AWS_DEFAULT_REGION || region

    this.bucket = process.env.GHOST_STORAGE_ADAPTER_S3_PATH_BUCKET || bucket

    // Optional configurations
    this.host = process.env.GHOST_STORAGE_ADAPTER_S3_ASSET_HOST || assetHost || `https://s3${this.region === 'us-east-1' ? '' : `-${this.region}`}.amazonaws.com/${this.bucket}`
    this.pathPrefix = stripLeadingSlash(process.env.GHOST_STORAGE_ADAPTER_S3_PATH_PREFIX || pathPrefix || '')
    this.endpoint = process.env.GHOST_STORAGE_ADAPTER_S3_ENDPOINT || endpoint || ''
    this.serverSideEncryption = process.env.GHOST_STORAGE_ADAPTER_S3_SSE || serverSideEncryption || ''
  }

  delete (fileName, targetDir) {
    const directory = targetDir || this.getTargetDir(this.pathPrefix)

    return new Promise((resolve, reject) => {
      return this.s3()
        .deleteObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash(join(directory, fileName))
        }, (error, data) => {
          if (error) {
            resolve(false)
            return;
          } else {
            resolve(true)
          }
        })
    })
  }

  exists (fileName, targetDir) {
    return new Promise((resolve, reject) => {
      return this.s3()
        .getObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash(join(targetDir, fileName))
        }, (error, data) => {
          if (error) {
            resolve(false)
            return;
          } else {
            resolve(true)
          }
        })
    })
  }

  s3 () {
    const options = {
      accessKeyId: this.accessKeyId,
      bucket: this.bucket,
      region: this.region,
      secretAccessKey: this.secretAccessKey
    }
    if (this.endpoint !== '') {
      options.endpoint = this.endpoint
    }
    return new AWS.S3(options)
  }

  save (image, targetDir) {
    const directory = targetDir || this.getTargetDir(this.pathPrefix)

    return new Promise((resolve, reject) => {
      return Promise.all([
        this.getUniqueFileName(image, directory),
        readFileAsync(image.path)
      ]).then(([ fileName, file ]) => {
        let config = {
          ACL: 'public-read',
          Body: file,
          Bucket: this.bucket,
          CacheControl: `max-age=${30 * 24 * 60 * 60}`,
          ContentType: image.type,
          Key: stripLeadingSlash(fileName)
        }
        if (this.serverSideEncryption !== '') {
          config.ServerSideEncryption = this.serverSideEncryption
        }

        return this.s3()
          .putObject(config, (error, data) => {
            if (error) {
              reject(error)
              return;
            } else {
              resolve(`${this.host}/${fileName}`)
            }
          })
      })
      .catch(error => reject(error))
    })
  }

  serve () {
    return (req, res, next) => {
      return this.s3()
        .getObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash(req.path)
        }).on('httpHeaders', function (statusCode, headers, response) {
          res.set(headers)
        })
        .createReadStream()
        .on('error', function (err) {
          res.status(404)
          next(err)
        })
        .pipe(res)
    }
  }

  read (options) {
    options = options || {}

    return new Promise((resolve, reject) => {
      // remove trailing slashes
      let path = (options.path || '').replace(/\/$|\\$/, '')

      // check if path is stored in s3 handled by us
      if (!path.startsWith(this.host)) {
        reject(new Error(`${path} is not stored in s3`))
      }
      path = path.substring(this.host.length)

      return this.s3()
        .getObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash(path)
        }, (error, data) => {
          if (error) {
            reject(error)
            return;
          } else {
            resolve(data.Body)
          }
        })
    })
  }
}

export default Store
