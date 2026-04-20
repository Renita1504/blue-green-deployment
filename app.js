const express = require('express');
const app = express();

const PORT = 3000;
const color = process.env.COLOR || "BLUE";

app.get('/', (req, res) => {

    const bgColor = color === "GREEN" ? "#16a34a" : "#2563eb";
    const text = color === "GREEN" ? "GREEN DEPLOYMENT 🚀" : "BLUE DEPLOYMENT 💙";

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${color} Deployment</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: ${bgColor};
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                h1 {
                    font-size: 60px;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 24px;
                }
                .box {
                    background: rgba(0,0,0,0.2);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>${text}</h1>
                <p>Zero Downtime Deployment using AWS 🚀</p>
                <p>Server: ${color}</p>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});