CREATE TABLE IF NOT EXISTS `uicomponent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `type` TEXT NULL,
  `tags` TEXT NULL,
  `properties` json NOT NULL,
  `sectionid` INT NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DatETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DatETIME NULL,
  `updatedat` DatETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_uicomponent_section1_idx` (`sectionid` ASC),
  CONSTRAINT `fk_uicomponent_section1`
    FOREIGN KEY (`sectionid`)
    REFERENCES `section` (`id`)
    ON DELETE CASCADE
    ON UPDatE NO ACTION)
ENGINE = InnoDB;
