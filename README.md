# Ghost storage adapter S3

An AWS S3 storage adapter for Ghost 0.10+

## Installation

```bash
# Install the module
npm install ghost-storage-adapter-s3 --save

# Create the adapter link file
touch ./content/storage/s3/index.js
```

Inside `./content/storage/s3/index.js` add the following code

```javascript
'use strict';
module.exports = require('ghost-storage-adapter-s3');
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

## Support

This library works with Ghost 0.10 and 0.11.

## License

[ISC](./LICENSE.md).
