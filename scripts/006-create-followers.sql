CREATE TABLE followers (
	"id" serial NOT NULL PRIMARY KEY,
	"followerId" integer NOT NULL REFERENCES users(id),
	"followedId" integer NOT NULL REFERENCES users(id) 
);
