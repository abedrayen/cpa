/*
  Warnings:

  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "products_category_id_deleted_at_is_active_idx";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "categories";
