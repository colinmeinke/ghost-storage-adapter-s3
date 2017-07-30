# Ghost storage adapter S3

An AWS S3 storage adapter for Ghost 1.x

For Ghost 0.10.x and 0.11.x support check out
[Ghost storage adapter s3 v1.3.0](https://github.com/colinmeinke/ghost-storage-adapter-s3/releases/tag/v1.3.0).

## Installation

```
npm install ghost-storage-adapter-s3
mkdir -p ./content/adapters/storage
cp -r ./node_modules/ghost-storage-adapter-s3 ./content/adapters/storage/s3
```

## Configuration

```
storage: {
  active: 's3',
  s3: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    assetHost: 'YOUR_OPTIONAL_CDN_URL',
    bucket: 'YOUR_BUCKET_NAME',
    pathPrefix: 'YOUR_OPTIONAL_BUCKET_SUBDIRECTORY',
    region: 'YOUR_REGION_SLUG',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
  }
}
```

## License

[ISC](./LICENSE.md).
