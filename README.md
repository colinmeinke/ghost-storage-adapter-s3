# Ghost storage adapter S3

An AWS S3 storage adapter for Ghost 1.x

For Ghost 0.10.x and 0.11.x support check out
[Ghost storage adapter s3 v1.3.0](https://github.com/colinmeinke/ghost-storage-adapter-s3/releases/tag/v1.3.0).

## What's modified by trong-nguyen:

1. Modified the behavior of this adapter when the files were previously stored locally and then moved to AWS S3: it proxies the request to S3 if the path is not recognized as s3 storage.

2. Added the script `install-adapter` as a convenience for user to copy the script over to an already installed Ghost blog. You can either:

```
cp -r dist/node_modules/* ghost/path/content/adapters/node_modules &&
cp -r dist/s3 ghost/path/content/adapters/storage/
```

or:

```
rsync dist ghost/path/content/adapters
```

The latter will not alter the current available directory content, which might have other adapters.s

## Installation

```shell
npm install ghost-storage-adapter-s3
mkdir -p ./content/adapters/storage
cp -r ./node_modules/ghost-storage-adapter-s3 ./content/adapters/storage/s3
```

## Configuration

```json
"storage": {
  "active": "s3",
  "s3": {
    "accessKeyId": "YOUR_ACCESS_KEY_ID",
    "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
    "region": "YOUR_REGION_SLUG",
    "bucket": "YOUR_BUCKET_NAME",
    "assetHost": "YOUR_OPTIONAL_CDN_URL (See note below)",
    "pathPrefix": "YOUR_OPTIONAL_BUCKET_SUBDIRECTORY",
    "endpoint": "YOUR_OPTIONAL_ENDPOINT_URL (only needed for 3rd party S3 providers)"
  }
}
```
Note: Be sure to include "//" or the appropriate protocol within your assetHost string/variable to ensure that your site's domain is not prepended to the CDN URL.

### Via environment variables

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
GHOST_STORAGE_ADAPTER_S3_PATH_BUCKET
GHOST_STORAGE_ADAPTER_S3_ASSET_HOST  // optional
GHOST_STORAGE_ADAPTER_S3_PATH_PREFIX // optional
GHOST_STORAGE_ADAPTER_S3_ENDPOINT // optional
```

## License

[ISC](./LICENSE.md).
