import Database from "../database/database.js";

async function allBooks() {
  const db = await Database.connect();

  const sql = `
    SELECT 
        books.*, 
        user.name
    FROM books
    JOIN user ON books.id = user.id;
    `;

  const books = await db.all(sql);
  console.log(books)
  return books
}

export default { allBooks}