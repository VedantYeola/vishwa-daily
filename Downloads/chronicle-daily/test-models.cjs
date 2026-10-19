
const https = require('https');

const API_KEY = process.env.VITE_GEMINI_API_KEY || 'AIzaSyD3GcHeUK7aZiFttMeRZ_LX7kOBvhjQ1f8';
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
