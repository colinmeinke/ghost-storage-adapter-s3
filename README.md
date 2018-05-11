# Ghost storage adapter S3

An AWS S3 storage adapter for Ghost 1.x

For Ghost 0.10.x and 0.11.x support check out
[Ghost storage adapter s3 v1.3.0](https://github.com/colinmeinke/ghost-storage-adapter-s3/releases/tag/v1.3.0).

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
    "assetHost": "YOUR_OPTIONAL_CDN_URL (See note 1 below)",
    "pathPrefix": "YOUR_OPTIONAL_BUCKET_SUBDIRECTORY",
    "endpoint": "YOUR_OPTIONAL_ENDPOINT_URL (only needed for 3rd party S3 providers)",
    "serverSideEncryption": "YOUR_OPTIONAL_SSE (See note 2 below)"
  }
}
```
Note 1: Be sure to include "//" or the appropriate protocol within your assetHost string/variable to ensure that your site's domain is not prepended to the CDN URL.

Note 2: if your s3 bucket enforces SSE use serverSideEncryption with the [appropriate supported](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property) value.

### Via environment variables

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
GHOST_STORAGE_ADAPTER_S3_PATH_BUCKET
GHOST_STORAGE_ADAPTER_S3_ASSET_HOST  // optional
GHOST_STORAGE_ADAPTER_S3_PATH_PREFIX // optional
GHOST_STORAGE_ADAPTER_S3_ENDPOINT // optional
GHOST_STORAGE_ADAPTER_S3_SSE // optional
```

## License

[ISC](./LICENSE.md).
