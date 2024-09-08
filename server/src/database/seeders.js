import Database from "./database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, "livros.json");
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

async function up() {
  const db = await Database.connect();
  //console.log(jsonData)

  for (const book of jsonData.books) {
    const userSql = `
            INSERT INTO user
            (name, email, password, image_url, description) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const booksSql = `
            INSERT INTO books 
            (title, publication_date, image_url, author, user_id) 
            VALUES (?, ?, ?, ?, ?)
        `;
    const user = jsonData.users[0];
    const userResult = await db.run(userSql, [
      user.name,
      user.email,
      user.password,
      user.image_url,
      user.description,
    ]);
    const userId = userResult.lastID;

    await db.run(booksSql, [
      book.title,
      book.publication_date,
      book.image_url,
      book.author,
      userId
    ]);
  }

  console.log("Database seeded successfully");
}

export default { up };