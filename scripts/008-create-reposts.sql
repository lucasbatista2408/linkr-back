CREATE TABLE reposts (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"createdAt" DATE NOT NULL DEFAULT NOW()
);