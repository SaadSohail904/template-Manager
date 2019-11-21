CREATE TABLE IF NOT EXISTS `section` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `tags` TEXT NOT NULL,
  `templateid` INT NOT NULL,
  `properties` JSON NOT NULL,
  `parentsectionid` INT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DATETIME NULL,
  `updatedat` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_section_template_idx` (`templateid` ASC),
  INDEX `fk_section_section1_idx` (`parentsectionid` ASC),
  CONSTRAINT `fk_section_template`
    FOREIGN KEY (`templateid`)
    REFERENCES `template` (`id`)
    ON DELETE CASCADE
    ON UPDatE NO ACTION,
  CONSTRAINT `fk_section_section1`
    FOREIGN KEY (`parentsectionid`)
    REFERENCES `section` (`id`)
    ON DELETE CASCADE
    ON UPDatE NO ACTION)
ENGINE = InnoDB;
