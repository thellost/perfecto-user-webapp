import {NextResponse} from "next/server";
import * as cheerio from 'cheerio';
// Mocked data for Perfecto Home rates and normal rates
updateRate(); // Call the updateRate function to fetch and update rates
// This function will be called to update the rates periodically or on demand
let rates = {
    perfectoHomeRate: 3.15, // Example: Perfecto Home rate in percentage
    normalRate: 5.0, // Example: Normal rate in percentage
    last_checked: 0, // Example: Timestamp of the last check
};

export async function GET() {
    try {
       // Check if the rates are more than 1 hour old
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        const now = Date.now();

        if (now - rates.last_checked > oneHour) {
          console.log("Rates are outdated. Updating rates...");
          await updateRate(); // Update the rates if they are outdated
        }
        // Simulate fetching rates from a database or external API
        return NextResponse.json(rates, {status: 200});
    } catch (error) {
        console.error("Error fetching rates:", error);
        return NextResponse.json({
            error: "Failed to fetch rates"
        }, {status: 500});
    }
}

async function updateRate() {
    console.log("Updating rates...");
    const perfectoRate_response = await fetch("https://www.cnbc.com/quotes/US10Y");
    const perferctoRate_html = await perfectoRate_response.text();


    // Load the HTML into Cheerio for parsing
    const $perfectoRate = cheerio.load(perferctoRate_html);

    // Extract the specific element containing the rate (example selector)
    const perfectoHomeRate = $perfectoRate ("span.QuoteStrip-lastPrice")
        .text()
        .trim(); // Adjust the selector as needed


        const normalRate_response = await fetch("https://www.mortgagenewsdaily.com/mortgage-rates/freddie-mac");
        const normalRate_html = await normalRate_response.text();
    
    
        // Load the HTML into Cheerio for parsing
        const $normalRate = cheerio.load(normalRate_html);
    
        // Extract the specific element containing the rate (example selector)
        const normalRate = $normalRate ("table:first > tbody > tr:first > td:first")
            .text()
    
        console.log("Normal Rate", normalRate )
        
    // Simulate fetching rates from an external API or database
    const newRates = {
        perfectoHomeRate: Number((Number( perfectoHomeRate.replace("%","")) * 1.15).toFixed(2))  , // Example: Updated Perfecto Home rate in percentage
        normalRate: Number((Number( normalRate.replace("%",""))).toFixed(2)), // Example: Updated normal rate in percentage
        last_checked: Date.now(), // Example: Timestamp of the last check
    };
    rates = newRates; // Update the rates variable with new data
    console.log("Rates updated:", rates);
    return rates; // Return the updated rates
}
