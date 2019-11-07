CREATE TABLE IF NOT EXISTS `tagsuggestions` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `tagsuggestion` VARCHAR(45) NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DatETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DatETIME NULL,
  `updatedat` DatETIME NULL,
  PRIMARY KEY (`id`),
 UNIQUE INDEX `uniq_tagName_tagType` (name, type, tagsuggestion))
ENGINE = InnoDB;
