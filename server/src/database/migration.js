import Database from './database.js';
 
async function up() {
  const db = await Database.connect();

  const usersSql = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(50) NOT NULL,
      image_url VARCHAR(200) NOT NULL,
      description VARCHAR(500)
    );
  `;

  const booksSql = `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title VARCHAR(150) NOT NULL,
      image_url VARCHAR(200) NOT NULL,
      author VARCHAR(80) NOT NULL,
      publication_date VARCHAR(10) NOT NULL,
      description VARCHAR(500),
      FOREIGN KEY (user_id) REFERENCES user(id)
    );
  `;
  try{
   const q1 = await db.run(usersSql);
    const q2 = await db.run(booksSql);
    console.log(q1,q2)
  }

  catch(error){
    console.log(error)
  }

  
}
 
export default { up };