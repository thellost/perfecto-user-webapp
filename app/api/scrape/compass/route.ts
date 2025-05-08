import { NextRequest, NextResponse } from "next/server";
import { callScrapperCompass } from "../lambda";

export async function GET(req: NextRequest) {
  try {
    // Get URL from query parameters
    const url = new URL(req.url).searchParams.get("url");

    // Validate URL
    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    // Check if URL is from compass.com
    if (!url.includes("compass.com")) {
      return NextResponse.json(
        { error: "Invalid URL. Only compass.com URLs are allowed" },
        { status: 400 }
      );
    }

    // Call Lambda function
    const scrapedData = await callScrapperCompass(url);

    if (!scrapedData) {
      return NextResponse.json(
        { error: "Failed to fetch data from URL" },
        { status: 500 }
      );
    }

    // Return the scraped data
    return NextResponse.json(scrapedData);

  } catch (error) {
    console.error("Error scraping data:", error);
    return NextResponse.json(
      { 
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}