import * as SQLite from 'expo-sqlite';
export async function LocalDB() {
    const db = await SQLite.openDatabaseAsync('forkDB');
    db.execAsync('CREATE TABLE IF NOT EXISTS Fork (ForkID INTEGER PRIMARY KEY NOT NULL, creator_id INTEGER NOT NULL, recipe_name STRING NOT NULL, recipe_desc STRING, recipe_method STRING, banner_img BLOB, img BLOB, icon BLOB, fork_count INTEGER)');
    return db;
}