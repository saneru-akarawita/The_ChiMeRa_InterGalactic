-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "id" SET DEFAULT (concat('activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT (concat('location_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "id" SET DEFAULT (concat('package_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "PackageActivity" ALTER COLUMN "id" SET DEFAULT (concat('package_activity_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "id" SET DEFAULT (concat('seat_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Ship" ALTER COLUMN "id" SET DEFAULT (concat('ship_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL DEFAULT (concat('booking_', gen_random_uuid()))::TEXT,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "finishing_date" TIMESTAMP(3) NOT NULL,
    "payment_amount" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
