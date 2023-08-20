/*
  Warnings:

  - Added the required column `location_id` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT (concat('location_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "location_id" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT (concat('package_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "PackageActivity" ALTER COLUMN "id" SET DEFAULT (concat('package_activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
