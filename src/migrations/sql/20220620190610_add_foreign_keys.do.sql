ALTER TABLE products ADD CONSTRAINT categoryId FOREIGN KEY ("categoryId") REFERENCES categories(id) ON DELETE CASCADE;
ALTER TABLE reviews ADD CONSTRAINT productId FOREIGN KEY ("productId") REFERENCES products(id) ON DELETE CASCADE;