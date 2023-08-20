/*
  Warnings:

  - You are about to alter the column `speed` on the `Ship` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Ship" ALTER COLUMN "id" SET DEFAULT (concat('ship_', gen_random_uuid()))::TEXT,
ALTER COLUMN "speed" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;
