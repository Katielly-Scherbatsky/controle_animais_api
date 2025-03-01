/*
  Warnings:

  - You are about to alter the column `perfil` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Usuario` MODIFY `perfil` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Denuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `alertaId` INTEGER NOT NULL,
    `Observacao` VARCHAR(191) NULL,
    `motivo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Denuncia` ADD CONSTRAINT `Denuncia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Denuncia` ADD CONSTRAINT `Denuncia_alertaId_fkey` FOREIGN KEY (`alertaId`) REFERENCES `Alerta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
