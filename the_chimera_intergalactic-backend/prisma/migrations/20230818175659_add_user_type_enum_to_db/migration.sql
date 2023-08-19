-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'TRAVELER');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT (concat('admin_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'TRAVELER',
ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;
