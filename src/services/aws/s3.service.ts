import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import * as fs from "fs";
import * as path from "path";

@Injectable()

export class S3Service {
  private s3;
  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
  }

  async listBuckets() {
    return new Promise((resolve, reject) => {
      this.s3.listBuckets(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  async createNewBucket(Bucket: string) {
    return new Promise((resolve, reject) => {
      this.s3.createBucket({ Bucket }, function(err, data) {
        if (err) {
          console.log("Error", err);
          reject(err)
        } else {
          console.log("Success", data.Location);
          resolve(data.Location)
        }
      });
    })
  }

  async createNewFolder(Bucket: string, name: string) {
    return new Promise((resolve, reject) => {
      this.s3.upload ({ Bucket, Key: `${name}/`, Body: 'Client Folder' }, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err)
        } if (data) {
          console.log("Upload Success", data.Location);
          resolve(data)
        }
      });
    })
  }

  async uploadNewFile(Bucket: string, name: string, file: any) {
    const params = { Bucket, Key: name, Body: file };

    return new Promise((resolve, reject) => {
      this.s3.upload (params, function (err, data) {
        if (err) {
          reject(err)
        } if (data) {
          resolve(data.Location)
        }
      });
    })
  }
}