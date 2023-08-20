/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Ship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('FIRST', 'ECONOMY', 'BUSINESS');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "ship_pic" TEXT NOT NULL DEFAULT 'ship.png',
ALTER COLUMN "id" SET DEFAULT (concat('ship_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL DEFAULT (concat('seat_', gen_random_uuid()))::TEXT,
    "type" "SeatType" NOT NULL DEFAULT 'ECONOMY',
    "booking_status" BOOLEAN NOT NULL,
    "ship_id" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_ship_id_key" ON "Seat"("ship_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_identifier_key" ON "Ship"("identifier");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
