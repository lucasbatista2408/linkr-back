CREATE TABLE users (
	"id" serial NOT NULL PRIMARY KEY,
	"username" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"profileImgUrl" TEXT
);