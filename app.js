const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Blue Version</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #2563eb, #1e3a8a);
                    font-family: Arial, sans-serif;
                    color: white;
                }
                .container {
                    text-align: center;
                    background: rgba(255,255,255,0.1);
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                h1 {
                    font-size: 55px;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>BLUE VERSION 💙</h1>
                <p>Initial Production Deployment</p>
                <p>Running Stable Version</p>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});