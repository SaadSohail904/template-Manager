CREATE TABLE IF NOT EXISTS `alluicomponents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `properties` JSON NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DatETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DatETIME NULL,
  `updatedat` DatETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
