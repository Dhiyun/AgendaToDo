import * as SQLite from 'expo-sqlite';

const getLocalDateString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

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
    const database = await SQLite.openDatabaseAsync('agenda_nusantara.db');

    await database.execAsync('PRAGMA journal_mode = WAL;');
    await database.execAsync('PRAGMA foreign_keys = ON;');
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT
        );
    `);
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            category TEXT CHECK(category IN ('penting', 'biasa')),
            is_completed INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
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
                created_at,
                updated_at
            )

            VALUES (?, ?, ?, ?)
        `,
        [
            'user',
            'user',
            getLocalDateString(),
            getLocalDateString(),
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
                created_at,
                updated_at
            )

            VALUES
            (
                1,
                'Belajar React Native',
                'Mempelajari dasar Expo Router',
                '2026-05-12',
                'penting',
                1,
                ?,
                ?
            ),

            (
                1,
                'Mengerjakan SQLite',
                'Membuat database lokal',
                '2026-05-15',
                'penting',
                0,
                ?,
                ?
            ),

            (
                1,
                'Membuat Home Screen',
                'UI Home modern',
                '2026-05-18',
                'biasa',
                1,
                ?,
                ?
            )
        `,
        [
            new Date().toISOString(),
            new Date().toISOString(),
            new Date().toISOString(),
            null,
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
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, 0, ?, ?)
        `,
        [user_id, title, description, due_date, category, getLocalDateString(), getLocalDateString()]
    );
};

export const toggleTaskStatus = async (id: number, status: number) => {
    await db.runAsync(
        `
            UPDATE tasks
            SET 
                is_completed = ?,
                updated_at = ?
            WHERE id = ?
        `,
        [status, getLocalDateString(), id]
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

export const changePassword = async ({
    user_id,
    currentPassword,
    newPassword
}: {
    user_id: number;
    currentPassword: string,
    newPassword: string,
}) => {
    const user = await db.getFirstAsync(
        `
            SELECT *
            FROM users

            WHERE id = ?
            AND password = ?
        `,
        [user_id, currentPassword]
    );

    // password lama salah
    if (!user) {
        return false;
    }

    // update password baru
    await db.runAsync(
        `
            UPDATE users
            SET 
                password = ?,
                updated_at = ?
            WHERE id = ?
        `,
        [newPassword, getLocalDateString(), user_id]
    );

    return true;
};
