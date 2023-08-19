-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ASTEROID', 'PLANET');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL DEFAULT (concat('location_', gen_random_uuid()))::TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "type" "LocationType" NOT NULL DEFAULT 'PLANET',

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL DEFAULT (concat('activity_', gen_random_uuid()))::TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
