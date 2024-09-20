/*
  Warnings:

  - You are about to drop the column `email` on the `pupil` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `pupil` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the `_pupilsubjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_teachersubjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pupilsubjects` DROP FOREIGN KEY `_PupilSubjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pupilsubjects` DROP FOREIGN KEY `_PupilSubjects_B_fkey`;

-- DropForeignKey
ALTER TABLE `_teachersubjects` DROP FOREIGN KEY `_TeacherSubjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_teachersubjects` DROP FOREIGN KEY `_TeacherSubjects_B_fkey`;

-- DropIndex
DROP INDEX `Pupil_email_key` ON `pupil`;

-- DropIndex
DROP INDEX `Teacher_email_key` ON `teacher`;

-- AlterTable
ALTER TABLE `pupil` DROP COLUMN `email`,
    DROP COLUMN `password`,
    MODIFY `grade` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `grade`,
    ADD COLUMN `teacherId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teacher` DROP COLUMN `email`,
    DROP COLUMN `password`;

-- DropTable
DROP TABLE `_pupilsubjects`;

-- DropTable
DROP TABLE `_teachersubjects`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PupilSubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PupilSubject_AB_unique`(`A`, `B`),
    INDEX `_PupilSubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PupilSubject` ADD CONSTRAINT `_PupilSubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pupil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PupilSubject` ADD CONSTRAINT `_PupilSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
