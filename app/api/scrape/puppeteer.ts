import chromium from 'chrome-aws-lambda';
const browser = await chromium.puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath,
  headless: chromium.headless,
});
console.log("Puppeteer browser launched successfully.");
export default browser