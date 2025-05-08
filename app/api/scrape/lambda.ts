import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ID,
    region: process.env.NEXT_PUBLIC_AWS_REGION, // Replace with your AWS region
});

// Create Lambda service object
const lambda = new AWS.Lambda();

async function invokeLambdaFunction(functionName: string, payload: object) {
    try {
        const params = {
            FunctionName: functionName,
            Payload: JSON.stringify(payload),
        };

        const response = await lambda.invoke(params).promise();
        console.log('Lambda response:', response);

        if (response.Payload) {
            const result = JSON.parse(response.Payload.toString());
            console.log('Lambda result:', result);
            return result;
        }
    } catch (error) {
        console.error('Error invoking Lambda function:', error);
        throw error;
    }
}

export async function callScrapperCompass(url: string) {
    const functionName = 'scrapper-compass'; // Lambda function name
    const payload = { url }; // Payload with the URL

    try {
        const result = await invokeLambdaFunction(functionName, payload);
        console.log('Scrapper Compass Result:', result);
        return result;
    } catch (error) {
        console.error('Error calling Scrapper Compass:', error);
        throw error;
    }
}
/*
// Example usage
(async () => {
    const functionName = 'your-lambda-function-name'; // Replace with your Lambda function name
    const payload = { key: 'value' }; // Replace with your payload

    const result = await invokeLambdaFunction(functionName, payload);
    console.log('Result from Lambda:', result);
})();
*/