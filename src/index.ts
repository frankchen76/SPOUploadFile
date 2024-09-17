import axios, { type AxiosRequestConfig } from 'axios'
import fs from 'fs';

const filePath = 'C:\\Temp\\SampleDocs\\franktest.pdf';
const filecontent = fs.readFileSync(filePath);

let url = 'https://login.microsoftonline.com/MngEnvMCAP604196.onmicrosoft.com/oauth2/v2.0/token';
let config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
        client_id: process.env.CLIENT_ID,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'client_credentials',
    },
};
let response = await axios.get(url, config);
const token = response.data.access_token;
console.log(`Got access token. `);

url = 'https://graph.microsoft.com/v1.0/drives/b!RN4KUJ5pqE231Ps4tVhQMi9KPY5p0ydCqOcpFCaA-_1vv2gYdXftQbDgweRlYcCN/root:/Folder1/franktest1.pdf:/content'
config = {
    headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${token}`,
    }
};

response = await axios.put(url, filecontent, config);
console.log(`Uploaded file. `);




