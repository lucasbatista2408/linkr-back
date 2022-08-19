CREATE TABLE comments (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
    commentary TEXT NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT NOW()
);