CREATE TABLE post_hashtag (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" serial NOT NULL REFERENCES posts(id),
	"hashtagId" serial NOT NULL REFERENCES hashtags(id)
);