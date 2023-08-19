-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Ship" (
    "id" TEXT NOT NULL DEFAULT (concat('ship_', gen_random_uuid()))::TEXT,
    "name" TEXT NOT NULL,
    "speed" DECIMAL(65,30) NOT NULL,
    "model" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);
