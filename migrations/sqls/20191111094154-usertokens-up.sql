CREATE TABLE IF NOT EXISTS `usertoken` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` TEXT NOT NULL,
  `userid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_token_idx` (`userid` ASC),
  CONSTRAINT `fk_user_token`
    FOREIGN KEY (`userid`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
