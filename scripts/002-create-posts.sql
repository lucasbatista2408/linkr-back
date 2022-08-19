CREATE TABLE posts (
	id serial NOT NULL PRIMARY KEY,
	"userId" INT NOT NULL REFERENCES users(id),
	url TEXT NOT NULL,
	description TEXT,
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);