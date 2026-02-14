-- Drop the global unique constraint on slug (so soft-deleted products don't block reusing a slug)
DROP INDEX IF EXISTS "products_slug_key";

-- Slug unique only among active (non-deleted) products
CREATE UNIQUE INDEX "products_slug_active_key" ON "products"("slug") WHERE "deleted_at" IS NULL;
