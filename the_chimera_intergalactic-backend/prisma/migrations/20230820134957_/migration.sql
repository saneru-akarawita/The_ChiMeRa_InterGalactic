/*
  Warnings:

  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `business_seat_price` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_seat_total` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economy_seat_price` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economy_seat_total` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_seat_price` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_seat_total` to the `Ship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_ship_id_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "id" SET DEFAULT (concat('booking_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT (concat('location_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "id" SET DEFAULT (concat('package_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "PackageActivity" ALTER COLUMN "id" SET DEFAULT (concat('package_activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "business_seat_occupied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "business_seat_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "business_seat_total" INTEGER NOT NULL,
ADD COLUMN     "economy_seat_occupied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "economy_seat_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "economy_seat_total" INTEGER NOT NULL,
ADD COLUMN     "first_seat_occupied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "first_seat_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "first_seat_total" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT (concat('ship_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- DropTable
DROP TABLE "Seat";

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_start_fkey" FOREIGN KEY ("start") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_end_fkey" FOREIGN KEY ("end") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
