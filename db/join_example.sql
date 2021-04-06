-- SELECT items.item_name 
-- FROM user_to_cart
-- INNER JOIN cart_item 
--   ON user_to_cart.cart_id = cart_item.cart_id
-- INNER JOIN items
--   ON cart_item.item_id = items.item_id;


SELECT * 
FROM blob 
INNER JOIN users 
ON blob.user_id=users.user_id
WHERE content ilike '%joe%'
ORDER BY blob_id DESC;

-- select * from blob where content ilike %'joe'%