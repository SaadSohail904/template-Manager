
CREATE TABLE IF NOT EXISTS `uicomponentoption` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NULL,
  `label` VARCHAR(45) NULL,
  `value` VARCHAR(45) NULL,
  `uicomponentid` INT NOT NULL,
  `createdby` INT NULL,
  `updatedby` INT NULL,
  `deletedby` INT NULL,
  `deletedat` DATETIME NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_option_uicomponent1_idx` (`uicomponentid` ASC),
  CONSTRAINT `fk_option_uicomponent1`
    FOREIGN KEY (`uicomponentid`)
    REFERENCES `uicomponent` (`id`)
    ON DELETE CASCADE
    ON UPDatE NO ACTION)
ENGINE = InnoDB;
