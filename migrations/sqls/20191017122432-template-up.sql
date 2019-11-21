CREATE TABLE IF NOT EXISTS `template` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `tags` TEXT NOT NULL,
  `docid` INT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DATETIME NULL,
  `updatedat` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
