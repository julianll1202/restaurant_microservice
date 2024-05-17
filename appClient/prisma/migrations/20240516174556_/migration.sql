-- CreateTable
CREATE TABLE `Platillos` (
    `platilloId` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Platillos_nombre_key`(`nombre`),
    PRIMARY KEY (`platilloId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `ventaId` INTEGER NOT NULL AUTO_INCREMENT,
    `comandaId` INTEGER NOT NULL,
    `mesero` VARCHAR(191) NOT NULL,
    `numMesa` INTEGER NOT NULL,
    `precioFinal` DECIMAL(65, 30) NULL,
    `fechaCreacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ventaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatillosEnVentas` (
    `cantidad` INTEGER NOT NULL,
    `platilloId` INTEGER NOT NULL,
    `ventaId` INTEGER NOT NULL,

    PRIMARY KEY (`platilloId`, `ventaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlatillosEnVentas` ADD CONSTRAINT `PlatillosEnVentas_platilloId_fkey` FOREIGN KEY (`platilloId`) REFERENCES `Platillos`(`platilloId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatillosEnVentas` ADD CONSTRAINT `PlatillosEnVentas_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Ventas`(`ventaId`) ON DELETE RESTRICT ON UPDATE CASCADE;
