/*
  Warnings:

  - You are about to drop the column `seat_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `seat_type` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ship_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_seat_id_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "seat_id",
ADD COLUMN     "seat_type" "SeatType" NOT NULL,
ADD COLUMN     "ship_id" TEXT NOT NULL,
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

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
