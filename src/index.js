import AWS from 'aws-sdk';
import BaseStore from '../../../core/server/storage/base';
import { join } from 'path';
import Promise, { promisify } from 'bluebird';
import { readFile } from 'fs';

const readFileAsync = promisify( readFile );

const stripLeadingSlash = s => s.indexOf( '/' ) === 0 ? s.substring( 1 ) : s;

class Store extends BaseStore {
  constructor ( config = {}) {
    super( config );

    AWS.config.setPromisesDependency( Promise );

    const { accessKeyId, assetHost, bucket, region, secretAccessKey, pathPrefix } = config;

    this.accessKeyId = accessKeyId;
    this.bucket = bucket;
    this.host = assetHost ? assetHost : `https://s3${ region === 'us-east-1' ? '' : `-${ region }` }.amazonaws.com/${ bucket }`;
    this.region = region;
    this.secretAccessKey = secretAccessKey;
    this.pathPrefix = stripLeadingSlash(pathPrefix || '');
  }

  delete ( fileName, targetDir ) {
    const directory = targetDir || this.getTargetDir(this.pathPrefix);

    return new Promise(( resolve, reject ) => {
      return this.s3()
        .deleteObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash( join( directory, fileName )),
        })
        .promise()
        .then(() => resolve( true ))
        .catch(() => resolve( false ));
    });
  }

  exists ( fileName ) {
    return new Promise(( resolve, reject ) => {
      return this.s3()
        .getObject({
          Bucket: this.bucket,
          Key: stripLeadingSlash( fileName ),
        })
        .promise()
        .then(() => resolve( true ))
        .catch(() => resolve( false ));
    });
  }

  s3 () {
    return new AWS.S3({
      accessKeyId: this.accessKeyId,
      bucket: this.bucket,
      region: this.region,
      secretAccessKey: this.secretAccessKey,
    });
  }

  save ( image, targetDir ) {
    const directory = targetDir || this.getTargetDir(this.pathPrefix);

    return new Promise(( resolve, reject ) => {
      Promise.all([
        this.getUniqueFileName( this, image, directory ),
        readFileAsync( image.path ),
      ]).then(([ fileName, file ]) => (
        this.s3()
          .putObject({
            ACL: 'public-read',
            Body: file,
            Bucket: this.bucket,
            CacheControl: `max-age=${ 30 * 24 * 60 * 60 }`,
            ContentType: image.type,
            Key: stripLeadingSlash( fileName ),
          })
          .promise()
          .then(() => resolve( `${ this.host }/${ fileName }` ))
      )).catch( error => reject( error ));
    });
  }

  serve () {
    return ( req, res, next ) => {
      next();
    };
  }
}

export default Store;
