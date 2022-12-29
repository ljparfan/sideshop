import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime";
import inventoryConfig from "../models/inventory-config.js";
const s3Client = new S3Client({
    region: inventoryConfig.awsRegion,
    credentials: {
        accessKeyId: inventoryConfig.awsAccessKeyId,
        secretAccessKey: inventoryConfig.awsSecretAccessKey,
    },
});
export default function uploadFile(file) {
    const fileBuffer = fs.readFileSync(file.path);
    const fileMimetype = mime.getType(file.originalname);
    return s3Client.send(new PutObjectCommand({
        Bucket: inventoryConfig.awsS3BucketName,
        Key: file.originalname,
        Body: fileBuffer,
        ContentType: fileMimetype,
    }));
}
//# sourceMappingURL=upload.js.map