CREATE TABLE hashtags (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtag" TEXT NOT NULL UNIQUE,
	"createdAt" DATE NOT NULL DEFAULT NOW()
);