-- INSERT INTO cart_item (item_id) VALUES (1);
-- INSERT INTO user_to_cart (cart_id, user_id) VALUES (1, 1);
-- INSERT INTO cart_item(item_id) VALUES (3);
-- INSERT INTO user_to_cart(cart_id, user_id) VALUES (1, 1);
--not sure if i need this alter table
-- ALTER TABLE user_to_cart ADD FOREIGN KEY (cart_id) REFERENCES cart_item(cart_id) ON DELETE CASCADE;

INSERT INTO users(username, pass) VALUES ('joshbee', 'passw0rd');
INSERT INTO blob(content, user_id) VALUES ('test blob', 1);
INSERT INTO blob(content, user_id) VALUES ('second test blob', 1);