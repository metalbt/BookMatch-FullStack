/*
  Warnings:

  - Added the required column `url` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publication_date" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Books" ("author", "description", "id", "image_url", "publication_date", "title") SELECT "author", "description", "id", "image_url", "publication_date", "title" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
