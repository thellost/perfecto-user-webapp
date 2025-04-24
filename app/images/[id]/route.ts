import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client, getS3Config } from "@/app/api/crud/s3";
import { headers } from "next/headers";
// Initialize S3 Client
const s3Config = await getS3Config()
const s3 = await getS3Client()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imageName = new URL(req.url).pathname.split("/").pop() as string;
  if (!imageName) {
    return NextResponse.json({ message: "Image name is required" }, { status: 400 });
  }

  try {
    // Get the image from S3
    const command = new GetObjectCommand({
      Bucket: s3Config.bucketName,
      Key: `images/${imageName}`, // Assuming images are stored in the "images/" folder
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // Generate a signed URL valid for 1 hour

    // Fetch the image data from the signed URL
    const response = await fetch(signedUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image from S3");
    }

    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache headers
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { message: "Failed to fetch image", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}