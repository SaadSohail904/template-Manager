CREATE TABLE IF NOT EXISTS `data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(45) NULL,
  `text` VARCHAR(45) NULL,
  `answer` VARCHAR(45) NULL,
  `patientid` INT NULL,
  `uicomponentid` INT NOT NULL,
  `createdby` INT NULL,
  `deletedby` INT NULL,
  `updatedby` INT NULL,
  `createdat` DatETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedat` DatETIME NULL,
  `updatedat` DatETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_data_uicomponent1_idx` (`uicomponentid` ASC),
  CONSTRAINT `fk_data_uicomponent1`
    FOREIGN KEY (`uicomponentid`)
    REFERENCES `uicomponent` (`id`)
    ON DELETE CASCADE
    ON UPDatE NO ACTION)
ENGINE = InnoDB;
