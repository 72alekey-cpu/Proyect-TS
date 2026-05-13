const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();


const db = new sqlite3.Database('./smartphones.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS devices (id INTEGER PRIMARY KEY, brand TEXT, model TEXT, processor TEXT, pros TEXT, cons TEXT)");
});

app.get('/api/devices', (req, res) => {
    db.all("SELECT * FROM devices", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
)`);
const hudContainer = document.getElementById('hud-cursor-container');
let currentHudElement = null;

// Función para crear un elemento decorativo de cursor
function createHudElement() {
    const el = document.createElement('div');
    el.classList.add('cursor-hud-icon');
    hudContainer.appendChild(el);
    return el;
}

currentHudElement = createHudElement();

function updateCursorPosition(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    if (currentHudElement) {
        currentHudElement.style.left = `${mouseX}px`;
        currentHudElement.style.top = `${mouseY}px`;
        
        if (currentHudElement.style.opacity === "0") {
            currentHudElement.style.opacity = "1";
        }
    }
}

window.addEventListener('mousemove', updateCursorPosition);