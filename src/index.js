import { Action } from 'flownote'
import AWS from 'aws-sdk'

module.exports = [
	/**
	 * [createS3Bucket description]
	 * @param  AWS.S3.BucketName
	 * @return {Object} as AWS.S3.Bucket.${AWS.S3.BucketName}
	 */
	new Action('createS3Bucket', async function createS3Bucket () {
		const bucketName = this.get('AWS.S3.BucketName')

		const parameters = {
			Bucket: bucketName
		}

		const bucket = await new AWS.S3().createBucket(parameters).promise()
		this.set(`AWS.S3.Bucket.${bucketName}`, bucket)
	}),

	/**
	 * [uploadFileToS3Bucket description]
	 * @param  AWS.S3BucketName
	 * @param  AWS.S3UploadFileName
	 * @param  AWS.S3UploadBody
	 * @return {Object} AWS.S3Bucket.${AWS.S3BucketName}.uploadFileToS3Bucket.${AWS.S3UploadFileName}
	 */
	new Action('uploadFileToS3Bucket', async function uploadFileToS3Bucket() {
		const bucketName = this.get('AWS.S3BucketName')
		const fileName = this.get('AWS.S3UploadFileName')
		const body = this.get('AWS.S3UploadBody')

		const parameters = {
			Bucket: bucketName,
			Key: fileName,
			Body: body
		}

		const result = await new AWS.S3().putObject(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.uploadFileToS3Bucket.${fileName}`, result)
	}),

	/**
	 * [uploadStreamToS3Bucket description]
	 * @param  AWS.S3BucketName
	 * @param  AWS.S3UploadFileName
	 * @param  AWS.S3UploadStream
	 * @return {Object} AWS.S3Bucket.${AWS.S3BucketName}.uploadStreamToS3Bucket.${AWS.S3UploadStream}
	 */
	new Action('uploadStreamToS3Bucket', function uploadStreamToS3Bucket () {
		const bucketName = this.get('AWS.S3BucketName')
		const fileName = this.get('AWS.S3UploadFileName')
		const stream = this.get('AWS.S3UploadStream')

		const parameters = {
			Bucket: bucketName,
			Key: fileName,
			Body: stream
		}

		const result = await new AWS.S3().upload(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.uploadStreamToS3Bucket.${fileName}`, result)
	}),

	/**
	 * [copyS3Object description]
	 * @param  AWS.S3BucketName
	 * @param  AWS.S3CopySource
	 * @param  AWS.S3CopyDestination
	 * @return {Object} AWS.S3Bucket.${AWS.S3BucketName}.copyS3Object.${AWS.S3CopyDestination}
	 */
	new Action('copyS3Object', async function copyS3Object () {
		const bucketName = this.get('AWS.S3BucketName')
		const copySource = this.get('AWS.S3CopySource')
		const destination = this.get('AWS.S3CopyDestination')

		const parameters = {
			Bucket: bucketName,
			CopySource: copySource,
			Key: destination
		}

		const result = await new AWS.S3().copyObject(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.copyS3Object.${destination}`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('deleteS3Bucket', async function deleteS3Bucket () {
		const bucketName = this.get('AWS.S3BucketName')

		const parameters = {
			Bucket: bucketName
		}

		const result = await new AWS.S3().deleteBucket(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.deleteS3Bucket`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('deleteS3Object', function deleteS3Object () {
		const bucketName = this.get('AWS.S3BucketName')
		const fileName = this.get('AWS.S3DeleteFileName')

		const parameters = {
			Bucket: bucketName,
			Key: fileName
		}

		const result = await new AWS.S3().deleteObject(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.deleteS3Object.${fileName}`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('deleteS3Objects', function deleteS3Objects () {
		const bucketName = this.get('AWS.S3BucketName')
		const fileNames = this.get('AWS.S3DeleteFileNames')

		const parameters = {
			Bucket: bucketName,
			Delete: {
				Objects: fileNames.filter(element => { Key: element })
			}
		}

		const result = await new AWS.S3().deleteObjects(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.deleteS3Objects`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('getS3Object', function getS3Object () {
		const bucketName = this.get('AWS.S3BucketName')
		const fileName = this.get('AWS.S3DeleteFileName')

		const parameters = {
			Bucket: bucketName,
			Key: fileName
		}

		const result = await new AWS.S3().getObject(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.getS3Object.${fileName}`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('listS3Buckets', function listS3Buckets () {
		const result = await new AWS.S3().listBuckets(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.listS3Buckets`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('listS3Objects', function listS3Objects () {
		const bucketName = this.get('AWS.S3BucketName')
		const MaxKeys = this.get('AWS.S3ListMaxKeys')

		const parameters = {
			Bucket: bucketName,
			Key: fileName
		}

		const result = await new AWS.S3().listObjects(parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.listS3Objects`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('waitForS3Bucket', function waitForS3Bucket () {
		const bucketName = this.get('AWS.S3BucketName')

		const parameters = {
			Bucket: bucketName
		}

		const result = await new AWS.S3().waitFor('bucketExists', parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.waitForS3Bucket`, result)
	}),

	/**
	 * [createS3Bucket description]
	 * @param  
	 */
	new Action('waitForS3Object', function waitForS3Object () {
		const bucketName = this.get('AWS.S3BucketName')
		const filename = this.get('S3WaitForObject')

		const parameters = {
			Bucket: bucketName,
			Key: filename
		}

		const result = await new AWS.S3().waitFor('objectExists', parameters).promise()
		this.set(`AWS.S3Bucket.${bucketName}.waitForS3Object`, result)
	})
]
