CREATE TABLE products (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "quantity" int NOT NULL,
  "image" text NOT NULL,
  "price" float NOT NULL,
  "onSale" boolean NOT NULL,
  "category" text NOT NULL,
  CONSTRAINT "productsPkey" PRIMARY KEY ("id")
);
