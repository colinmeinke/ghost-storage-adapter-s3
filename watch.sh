nodemon -w src/index.js --exec "npm run build && cp -f index.js ghost/content/adapters/storage/s3/"
