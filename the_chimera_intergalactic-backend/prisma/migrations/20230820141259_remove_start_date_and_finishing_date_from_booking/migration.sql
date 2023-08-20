/*
  Warnings:

  - You are about to drop the column `finishing_date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `starting_date` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "finishing_date",
DROP COLUMN "starting_date",
ALTER COLUMN "id" SET DEFAULT (concat('booking_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT (concat('location_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "id" SET DEFAULT (concat('package_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "PackageActivity" ALTER COLUMN "id" SET DEFAULT (concat('package_activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Ship" ALTER COLUMN "id" SET DEFAULT (concat('ship_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;
