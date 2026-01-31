-- CreateTable
CREATE TABLE `EmailCode` (
    `email` VARCHAR(255) NOT NULL,
    `code` VARCHAR(6) NOT NULL,
    `expiredAt` TIMESTAMP(3) NOT NULL,

    UNIQUE INDEX `EmailCode_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
