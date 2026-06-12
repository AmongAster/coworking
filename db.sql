-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tessst
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tessst` DEFAULT CHARACTER SET utf8 ;
USE `tessst` ;

-- -----------------------------------------------------
-- Table `tessst`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tessst`.`users` ;

CREATE TABLE IF NOT EXISTS `tessst`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tessst`.`rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tessst`.`rooms` ;

CREATE TABLE IF NOT EXISTS `tessst`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `capacity` INT NOT NULL,
  `description` TEXT NULL,
  `image_url` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tessst`.`bookings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tessst`.`bookings` ;

CREATE TABLE IF NOT EXISTS `tessst`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `booking_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bookings_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_bookings_rooms_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_bookings_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `tessst`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookings_rooms`
    FOREIGN KEY (`room_id`)
    REFERENCES `tessst`.`rooms` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
