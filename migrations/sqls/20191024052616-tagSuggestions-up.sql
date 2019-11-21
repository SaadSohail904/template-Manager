CREATE TABLE IF NOT EXISTS `tagsuggestions` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `tagsuggestion` VARCHAR(45) NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DATETIME NULL,
  `updatedat` DATETIME NULL,
  PRIMARY KEY (`id`),
 UNIQUE INDEX `uniq_tagName_tagType` (name, type, tagsuggestion))
ENGINE = InnoDB;
