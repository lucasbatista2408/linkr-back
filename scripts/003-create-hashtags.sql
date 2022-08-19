CREATE TABLE hashtags (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtag" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);