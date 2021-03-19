-- CREATE TABLE user_to_cart(
--   user_to_cart_id SERIAL  NOT NULL PRIMARY KEY,
--   cart_id         INTEGER NOT NULL REFERENCES cart_item(cart_id),
--   user_id         INTEGER NOT NULL REFERENCES users(user_id)
-- );

-- CREATE TABLE user_to_address(
--   user_to_address_id SERIAL  NOT NULL PRIMARY KEY,
--   user_id            INTEGER NOT NULL REFERENCES users(user_id),
--   address_id         INTEGER NOT NULL REFERENCES address_(address_id) 
-- );
CREATE TABLE users(
  user_id  SERIAL      NOT NULL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  pass     TEXT        NOT NULL
);

CREATE TABLE blob(
  blob_id SERIAL       NOT NULL PRIMARY KEY,
  content VARCHAR(250) NOT NULL,
  likes   INTEGER      NOT NULL,
  user_id INTEGER      NOT NULL REFERENCES users(user_id)
);