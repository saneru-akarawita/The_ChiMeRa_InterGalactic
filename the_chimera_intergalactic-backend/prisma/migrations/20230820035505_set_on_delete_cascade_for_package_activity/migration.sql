-- DropForeignKey
ALTER TABLE "PackageActivity" DROP CONSTRAINT "PackageActivity_package_id_fkey";

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
ALTER TABLE "Traveler" ALTER COLUMN "id" SET DEFAULT (concat('traveler_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT (concat('user_', gen_random_uuid()))::TEXT;

-- AddForeignKey
ALTER TABLE "PackageActivity" ADD CONSTRAINT "PackageActivity_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
