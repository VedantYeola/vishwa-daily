
const fs = require('fs');
const path = require('path');
const https = require('https');

function getApiKey() {
    if (process.env.VITE_GEMINI_API_KEY) return process.env.VITE_GEMINI_API_KEY;
    try {
        const envPath = path.resolve(__dirname, '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            const match = content.match(/VITE_GEMINI_API_KEY=(.+)/);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
    } catch (e) {
        // ignore
    }
    return null;
}

const API_KEY = getApiKey();
if (!API_KEY) {
    console.error("API Key not found. Please set VITE_GEMINI_API_KEY in .env.local or environment.");
    process.exit(1);
}
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Check for gemini-1.5-flash:");
                const flash = json.models.find(m => m.name === 'models/gemini-1.5-flash');
                if (flash) {
                    console.log("FOUND EXACT MATCH: " + flash.name);
                    console.log("Methods: " + JSON.stringify(flash.supportedGenerationMethods));
                } else {
                    console.log("NOT FOUND EXACT MATCH.");
                    // Print all flash variants
                    console.log("Flash variants found:");
                    json.models.filter(m => m.name.includes("flash")).forEach(m => console.log(m.name));

                    console.log("---");
                    console.log("First 5 models:");
                    json.models.slice(0, 5).forEach(m => console.log(m.name));
                }
            } else {
                console.log("No models property found. Response:", data);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });
}).on('error', (e) => {
    console.error("Got error: " + e.message);
});
