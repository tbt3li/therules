CREATE TABLE contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, rating INTEGER DEFAULT NULL, created_at TEXT DEFAULT (datetime('now')), reply_status TEXT DEFAULT 'pending' );


