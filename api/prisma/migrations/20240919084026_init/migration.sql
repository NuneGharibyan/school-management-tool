/*
  Warnings:

  - You are about to drop the column `teacherId` on the `subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Pupil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Pupil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Pupil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_teacherId_fkey`;

-- AlterTable
ALTER TABLE `pupil` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `teacherId`,
    ADD COLUMN `grade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teacher` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_PupilSubjects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PupilSubjects_AB_unique`(`A`, `B`),
    INDEX `_PupilSubjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeacherSubjects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeacherSubjects_AB_unique`(`A`, `B`),
    INDEX `_TeacherSubjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Pupil_email_key` ON `Pupil`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Teacher_email_key` ON `Teacher`(`email`);

-- AddForeignKey
ALTER TABLE `_PupilSubjects` ADD CONSTRAINT `_PupilSubjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pupil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PupilSubjects` ADD CONSTRAINT `_PupilSubjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeacherSubjects` ADD CONSTRAINT `_TeacherSubjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeacherSubjects` ADD CONSTRAINT `_TeacherSubjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
