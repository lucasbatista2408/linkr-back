CREATE TABLE posts (
	id serial NOT NULL PRIMARY KEY,
	"userId" INT NOT NULL REFERENCES users(id),
	url TEXT,
	description TEXT NOT NULL
);