/*
  Warnings:

  - You are about to alter the column `grade` on the `pupil` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `_pupilsubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_pupilsubject` DROP FOREIGN KEY `_PupilSubject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pupilsubject` DROP FOREIGN KEY `_PupilSubject_B_fkey`;

-- AlterTable
ALTER TABLE `pupil` MODIFY `grade` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_pupilsubject`;

-- CreateTable
CREATE TABLE `_PupilToSubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PupilToSubject_AB_unique`(`A`, `B`),
    INDEX `_PupilToSubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PupilToSubject` ADD CONSTRAINT `_PupilToSubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pupil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PupilToSubject` ADD CONSTRAINT `_PupilToSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
