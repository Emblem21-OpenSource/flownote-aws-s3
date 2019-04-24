import { Action } from 'flownote'
import AWS from 'aws-sdk'

const Actions = [
  /**
   * [AWS.S3.createBucket description]
   * @param  AWS.S3.BucketName
   * @return {Object} as AWS.S3.Bucket.result
   */
  new Action('createBucket', async function createBucket () {
    const bucketName = this.get('AWS.S3.BucketName')

    const parameters = {
      Bucket: bucketName
    }

    const bucket = await new AWS.S3().createBucket(parameters).promise()
    this.set(`AWS.S3.createBucket.result`, bucket)
  }),

  /**
   * [uploadFileToBucket description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.UploadFileName
   * @param  AWS.S3.UploadBody
   * @return {Object} AWS.S3Bucket.uploadFileToBucket.result
   */
  new Action('uploadFileToBucket', async function uploadFileToBucket () {
    const bucketName = this.get('AWS.S3.BucketName')
    const fileName = this.get('AWS.S3.UploadFileName')
    const body = this.get('AWS.S3.UploadBody')

    const parameters = {
      Bucket: bucketName,
      Key: fileName,
      Body: body
    }

    const result = await new AWS.S3().putObject(parameters).promise()
    this.set(`AWS.S3Bucket.uploadFileToBucket.result`, result)
  }),

  /**
   * [uploadStreamToBucket description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.UploadFileName
   * @param  AWS.S3.UploadStream
   * @return {Object} AWS.S3Bucket.uploadStreamToBucket.result
   */
  new Action('uploadStreamToBucket', async function uploadStreamToBucket () {
    const bucketName = this.get('AWS.S3.BucketName')
    const fileName = this.get('AWS.S3.UploadFileName')
    const stream = this.get('AWS.S3.UploadStream')

    const parameters = {
      Bucket: bucketName,
      Key: fileName,
      Body: stream
    }

    const result = await new AWS.S3().upload(parameters).promise()
    this.set(`AWS.S3Bucket.uploadStreamToBucket.result`, result)
  }),

  /**
   * [copyObject description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.CopySource
   * @param  AWS.S3.CopyDestination
   * @return {Object} AWS.S3Bucket.copyObject.result
   */
  new Action('copyObject', async function copyObject () {
    const bucketName = this.get('AWS.S3.BucketName')
    const copySource = this.get('AWS.S3.CopySource')
    const destination = this.get('AWS.S3.CopyDestination')

    const parameters = {
      Bucket: bucketName,
      CopySource: copySource,
      Key: destination
    }

    const result = await new AWS.S3().copyObject(parameters).promise()
    this.set(`AWS.S3Bucket.copyObject.result`, result)
  }),

  /**
   * [prepareDeleteAfterCopy description]
   * @param  AWS.S3.CopySource
   * @return {String} AWS.S3.DeleteFileName
   */
  new Action('prepareDeleteAfterCopy', function prepareDeleteAfterCopy () {
    const copySource = this.get('AWS.S3.CopySource')
    this.set('AWS.S3.DeleteFileName', copySource)
  }),

  /**
   * [deleteBucket description]
   * @param  AWS.S3.BucketName
   * @return {Object}  AWS.S3Bucket.deleteBucket.result
   */
  new Action('deleteBucket', async function deleteBucket () {
    const bucketName = this.get('AWS.S3.BucketName')

    const parameters = {
      Bucket: bucketName
    }

    const result = await new AWS.S3().deleteBucket(parameters).promise()
    this.set(`AWS.S3Bucket.deleteBucket.result`, result)
  }),

  /**
   * [deleteObject description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.DeleteFileName
   * @return {Object}  AWS.S3Bucket.deleteObject.result
   */
  new Action('deleteObject', async function deleteObject () {
    const bucketName = this.get('AWS.S3.BucketName')
    const fileName = this.get('AWS.S3.DeleteFileName')

    const parameters = {
      Bucket: bucketName,
      Key: fileName
    }

    const result = await new AWS.S3().deleteObject(parameters).promise()
    this.set(`AWS.S3Bucket.deleteObject.result`, result)
  }),

  /**
   * [deleteObjects description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.DeleteFileNames
   * @return {Object}  AWS.S3Bucket.deleteObjects.result
   */
  new Action('deleteObjects', async function deleteObjects () {
    const bucketName = this.get('AWS.S3.BucketName')
    const fileNames = this.get('AWS.S3.DeleteFileNames')

    const parameters = {
      Bucket: bucketName,
      Delete: {
        Objects: fileNames.filter(element => {
          return { Key: element }
        })
      }
    }

    const result = await new AWS.S3().deleteObjects(parameters).promise()
    this.set(`AWS.S3Bucket.deleteObjects.result`, result)
  }),

  /**
   * [getObject description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.DeleteFileName
   * @return {Object}  AWS.S3Bucket.getObject.result
   */
  new Action('getObject', async function getObject () {
    const bucketName = this.get('AWS.S3.BucketName')
    const fileName = this.get('AWS.S3.GetFileName')

    const parameters = {
      Bucket: bucketName,
      Key: fileName
    }

    const result = await new AWS.S3().getObject(parameters).promise()
    this.set(`AWS.S3Bucket.getObject.result`, result)
  }),

  /**
   * [listBuckets description]
   * @return {Object}  AWS.S3Bucket.listBuckets.result
   */
  new Action('listBuckets', async function listBuckets () {
    const result = await new AWS.S3().listBuckets().promise()
    this.set(`AWS.S3Bucket.listBuckets.result`, result)
  }),

  /**
   * [listObjects description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.ListMaxKeys
   * @return {Object}  AWS.S3Bucket.listObjects.result
   */
  new Action('listObjects', async function listObjects () {
    const bucketName = this.get('AWS.S3.BucketName')
    const MaxKeys = this.get('AWS.S3.ListMaxKeys')

    const parameters = {
      Bucket: bucketName,
      MaxKeys
    }

    const result = await new AWS.S3().listObjects(parameters).promise()
    this.set(`AWS.S3Bucket.listObjects.result`, result)
  }),

  /**
   * [waitForBucket description]
   * @param  AWS.S3.BucketName
   * @return {Object}  AWS.S3Bucket.waitForBucket.result
   */
  new Action('waitForBucket', async function waitForBucket () {
    const bucketName = this.get('AWS.S3.BucketName')

    const parameters = {
      Bucket: bucketName
    }

    const result = await new AWS.S3().waitFor('bucketExists', parameters).promise()
    this.set(`AWS.S3Bucket.waitForBucket.result`, result)
  }),

  /**
   * [waitForObject description]
   * @param  AWS.S3.BucketName
   * @param  AWS.S3.WaitForObject
   * @return {Object}  AWS.S3Bucket.waitForObject.result
   */
  new Action('waitForObject', async function waitForObject () {
    const bucketName = this.get('AWS.S3.BucketName')
    const filename = this.get('AWS.S3.WaitForObject')

    const parameters = {
      Bucket: bucketName,
      Key: filename
    }

    const result = await new AWS.S3().waitFor('objectExists', parameters).promise()
    this.set(`AWS.S3Bucket.waitForObject.result`, result)
  })
]

export { Actions as default }
