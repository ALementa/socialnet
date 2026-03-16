CREATE TABLE user_account (
 id SERIAL PRIMARY KEY,
 username TEXT NOT NULL,
 bio TEXT NOT NULL,
 clerk_id TEXT UNIQUE NOT NULL
);

CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 content TEXT NOT NULL,
 user_id INTEGER REFERENCES user_account(id) ON DELETE CASCADE,
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
 id SERIAL PRIMARY KEY,
 content TEXT NOT NULL,
 post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
 user_id INTEGER REFERENCES user_account(id),
 created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
 id SERIAL PRIMARY KEY,
 post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
 user_id INTEGER REFERENCES user_account(id),
 created_at TIMESTAMP DEFAULT NOW(),
 UNIQUE (post_id, user_id)
);

CREATE TABLE followers (
 id SERIAL PRIMARY KEY,
 follower_id INTEGER REFERENCES user_account(id) ON DELETE CASCADE,
 following_id INTEGER REFERENCES user_account(id) ON DELETE CASCADE,
 created_at TIMESTAMP DEFAULT NOW(),
 UNIQUE (follower_id, following_id)
);  
