"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// S3 Config
const s3Config = {
  bucketName: process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_NAME as string,
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID as string,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ID as string,
};

const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL as string;

// Initialize S3 Client
const s3 = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});
function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const UploadImage = async (formData: FormData) => {
  console.log("Uploading image to S3...");
  console.log(s3Config);

  try {
    const file = formData.get("file") as File;
    const folderName = formData.get("folderName") as string;

    if (!file || !folderName) {
      throw new Error("File or folder name is missing");
    }
    const fileid = makeid(32)
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${folderName}/${fileid}`;

    // Upload the file to S3
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.type, // Set the content type of the file
    });

    const response = await s3.send(command);

    console.log("Image uploaded successfully:", response);
    return {
      message: "Image uploaded successfully",
      key: fileName,
      location: url + "/" + fileName,
    };
  } catch (e) {
    console.error("Error uploading image:", e);
    return { message: "Image upload failed", error: e };
  }
};


export async function getS3Client() {
  return Promise.resolve(s3);
}
export async function getS3Config() {
  return Promise.resolve(s3Config);
}
// Removed export of s3 as it is not an async function