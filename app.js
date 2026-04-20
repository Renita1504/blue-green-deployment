const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Green Deployment</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #16a34a, #14532d);
                    font-family: Arial, sans-serif;
                    color: white;
                }
                .container {
                    text-align: center;
                    background: rgba(0,0,0,0.3);
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.5);
                    animation: fadeIn 1s ease-in-out;
                }
                h1 {
                    font-size: 60px;
                    margin-bottom: 15px;
                }
                p {
                    font-size: 22px;
                    margin: 5px 0;
                }
                .badge {
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: white;
                    color: #16a34a;
                    border-radius: 20px;
                    font-weight: bold;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>GREEN DEPLOYMENT 🚀</h1>
                <p>New Version Deployed via CI/CD</p>
                <p>Zero Downtime Deployment</p>
                <div class="badge">LIVE RELEASE ✅</div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});