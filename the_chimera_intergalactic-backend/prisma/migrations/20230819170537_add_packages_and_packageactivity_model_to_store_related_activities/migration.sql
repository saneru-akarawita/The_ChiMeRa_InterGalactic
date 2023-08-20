-- CreateEnum
CREATE TYPE "PackageCategory" AS ENUM ('ADVENTURE', 'SUMMIT');

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT (concat('location_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL DEFAULT (concat('package_', gen_random_uuid()))::TEXT,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "accomadation" TEXT,
    "category" "PackageCategory" NOT NULL,
    "destinations" TEXT[],
    "additional" TEXT[],

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageActivity" (
    "id" TEXT NOT NULL DEFAULT (concat('package_activity_', gen_random_uuid()))::TEXT,
    "package_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,

    CONSTRAINT "PackageActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackageActivity" ADD CONSTRAINT "PackageActivity_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageActivity" ADD CONSTRAINT "PackageActivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
