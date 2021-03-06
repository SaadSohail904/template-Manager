CREATE TABLE IF NOT EXISTS `alluicomponents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `properties` JSON NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DATETIME NULL,
  `updatedat` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
