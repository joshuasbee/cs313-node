--not sure if i need this alter table
-- ALTER TABLE user_to_cart ADD FOREIGN KEY (cart_id) REFERENCES cart_item(cart_id) ON DELETE CASCADE;

INSERT INTO users(username, pass) VALUES ('joshbee', 'passw0rd');
INSERT INTO users(username, pass) VALUES ('joe', 'passw0rd');
INSERT INTO blob(content, likes, user_id) VALUES ('test blob', 0, 1);
INSERT INTO blob(content, likes, user_id) VALUES ('second test blob', 0, 1);
INSERT INTO blob(content, likes, user_id) VALUES ('blob written by joe', 0, 2);