CREATE TABLE categories (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  CONSTRAINT "categoriesPkey" PRIMARY KEY ("id")
);

CREATE TABLE products (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "quantity" int NOT NULL,
  "image" text NOT NULL,
  "price" float NOT NULL,
  "onSale"  boolean DEFAULT true NOT NULL,
  "categoryId" uuid NOT NULL,
  CONSTRAINT "productsPkey" PRIMARY KEY ("id")
);

CREATE TABLE reviews (
  "id" uuid NOT NULL,
  "date" TIMESTAMPTZ NOT NULL DEFAULT (now()),
  "title" text NOT NULL,
  "comment" text NOT NULL,
  "rating" int NOT NULL,
  "productId" uuid NOT NULL,
  CONSTRAINT "reviewsPkey" PRIMARY KEY ("id")
);


