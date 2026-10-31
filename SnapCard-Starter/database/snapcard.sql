CREATE DATABASE IF NOT EXISTS snapcard_db;
USE snapcard_db;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  category VARCHAR(60) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2) DEFAULT 0,
  image_url VARCHAR(700),
  tag VARCHAR(60),
  rating DECIMAL(2,1) DEFAULT 4.7
);

INSERT INTO products (name, category, price, old_price, image_url, tag, rating) VALUES
('Everyday Linen Shirt','Women',699,999,'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85','BESTSELLER',4.8),
('Classic Oversized Tee','Men',449,699,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85','TRENDING',4.7),
('Soft Pastel Kurta Set','Ethnic',1199,1699,'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85','NEW',4.9),
('Everyday Shoulder Bag','Accessories',599,899,'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85','JUST IN',4.6),
('Weekend Denim Jacket','Women',1299,1899,'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85','POPULAR',4.8),
('Minimal Everyday Sneakers','Men',999,1499,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85','VALUE PICK',4.7),
('Gold Tone Hoop Earrings','Accessories',249,399,'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85','UNDER ₹299',4.5),
('Floral Day Dress','Women',899,1299,'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85','NEW',4.8);
