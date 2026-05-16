-- Make customer email optional for guest orders created without email
ALTER TABLE "orders"
ALTER COLUMN "customer_email" DROP NOT NULL;
