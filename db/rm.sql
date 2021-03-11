--given cart_id and item_id, delete from cart_item and from user_to_cart
-- -- 
-- DELETE FROM user_to_cart
-- WHERE user_id = 1 AND cart_id = 1;
-- -- WHERE user_id = $_SESSION['user_id'] AND cart_id = $cid;


-- --then delete from cart_item
-- DELETE FROM cart_item
-- WHERE item_id = 2 AND cart_id = 1;
--WHERE item_id = cart_item.item_id and cart_id = cart_item.cart_id;