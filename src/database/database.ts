import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync(
    'agenda_nusantara.db'
);

export const initDatabase = async () => {
    // Enable foreign key
    await db.execAsync(`
        PRAGMA foreign_keys = ON;
    `);

    // USERS TABLE
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT
        );
    `);

    // TASKS TABLE
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            category TEXT CHECK(
                category IN ('penting', 'biasa')
            ),
            is_completed INTEGER DEFAULT 0,
            created_at TEXT,
            FOREIGN KEY(user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        );
  `);
};

export const seedDatabase = async () => {
    // cek apakah user admin sudah ada
    const user = await db.getFirstAsync(
        `
            SELECT * FROM users
            WHERE username = ?
        `,
        ['admin']
    );

    // kalau sudah ada jangan insert lagi
    if (user) return;

    // insert user admin
    await db.runAsync(
        `
            INSERT INTO users
            (
                username,
                password,
                created_at
            )

            VALUES (?, ?, ?)
        `,
        [
            'admin',
            'admin',
            new Date().toISOString(),
        ]
    );

    // insert dummy tasks
    await db.runAsync(
        `
            INSERT INTO tasks
            (
                user_id,
                title,
                description,
                due_date,
                category,
                is_completed,
                created_at
            )

            VALUES
            (
                1,
                'Belajar React Native',
                'Mempelajari dasar Expo Router',
                '2026-05-12',
                'penting',
                1,
                ?
            ),

            (
                1,
                'Mengerjakan SQLite',
                'Membuat database lokal',
                '2026-05-15',
                'penting',
                0,
                ?
            ),

            (
                1,
                'Membuat Home Screen',
                'UI Home modern',
                '2026-05-18',
                'biasa',
                1,
                ?
            )
        `,
        [
            new Date().toISOString(),
            new Date().toISOString(),
            new Date().toISOString(),
        ]
    );
};

export const getCompletedTasksCount = async () => {
    const result =
        await db.getFirstAsync<{
            total: number;
        }>(
            `
                SELECT COUNT(*) as total
                FROM tasks

                WHERE is_completed = 1
            `
        );

    return result?.total ?? 0;
};

export const getPendingTasksCount = async () => {
    const result =
        await db.getFirstAsync<{
            total: number;
        }>(
            `
                SELECT COUNT(*) as total
                FROM tasks

                WHERE is_completed = 0
            `
        );

    return result?.total ?? 0;
};
