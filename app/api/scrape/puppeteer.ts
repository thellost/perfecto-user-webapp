import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium"
console.log(await chromium.executablePath)
const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath,
});
console.log("Puppeteer browser launched successfully.");

export default browser