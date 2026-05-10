import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync(
    'agenda_nusantara.db'
);

export const resetDatabase = async () => {

    await db.execAsync(`
        DROP TABLE IF EXISTS tasks;
    `);

    await db.execAsync(`
        DROP TABLE IF EXISTS users;
    `);
};

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

export const loginUser = async (
    username: string,
    password: string
) => {

    const user =
        await db.getFirstAsync<{
            id: number;
            username: string;
        }>(
            `
                SELECT id, username
                FROM users

                WHERE username = ?
                AND password = ?
            `,
            [username, password]
        );
        
    return user;
};

export const seedDatabase = async () => {
    // cek apakah user sudah ada
    const user = await db.getFirstAsync(
        `
            SELECT * FROM users
            WHERE username = ?
        `,
        ['user']
    );

    // kalau sudah ada jangan insert lagi
    if (user) return;

    // insert user
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
            'user',
            'user',
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

export const getTasks = async (user_id: number) => {
    const tasks = await db.getAllAsync(
        `
            SELECT * FROM tasks
            WHERE user_id = ?
            ORDER BY created_at DESC
        `,
        [user_id]
    );
    
    return tasks;
};

export const createTask = async ({
    user_id,
    title,
    description,
    due_date,
    category,
}: {
    user_id: number;
    title: string;
    description: string;
    due_date: string;
    category: 'penting' | 'biasa';
}) => {
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
            VALUES (?, ?, ?, ?, ?, 0, ?)
        `,
        [user_id, title, description, due_date, category, new Date().toISOString()]
    );
};

export const toggleTaskStatus = async (id: number, status: number) => {
    await db.runAsync(
        `
            UPDATE tasks
            SET is_completed = ?
            WHERE id = ?
        `,
        [status, id]
    );
};

export const deleteTask = async (id: number) => {
    await db.runAsync(
        `
            DELETE FROM tasks
            WHERE id = ?
        `,
        [id]
    );
}
