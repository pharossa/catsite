import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('messages.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS messages 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         email TEXT,
         subject TEXT,
         message TEXT,
         ip_address TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    ''')
    conn.commit()
    conn.close()

def save_message(name, email, subject, message, ip_address):
    conn = sqlite3.connect('messages.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO messages (name, email, subject, message, ip_address)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, email, subject, message, ip_address))
    conn.commit()
    conn.close()

# Veritabanını başlat
init_db()
