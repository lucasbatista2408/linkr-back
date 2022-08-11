CREATE TABLE "users" (
  "id" BIGSERIAL PRIMARY KEY,
  "username" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "profileImg" TEXT
)