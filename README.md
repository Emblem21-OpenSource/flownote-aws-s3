# Flownote AWS S3

```
npm install flownote-aws-s3 --production
```

```
yarn add flownote-aws-s3 --production
```

## Usage

In your application Flow, simply add the following:

```java
import "flownote-aws-s3"
```
## Examples

```java
import "flownote-aws-s3"

flow getFile(GET /file) = AWS.S3.GetObject
```

This `getFile` endpoint will expect `AWS.S3.BucketName` and `AWS.S3.GetFileName` in the HTTP query.