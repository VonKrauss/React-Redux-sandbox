-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.19-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para overattached
CREATE DATABASE IF NOT EXISTS `overattached` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `overattached`;


-- Volcando estructura para tabla overattached.updates
CREATE TABLE IF NOT EXISTS `updates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `sr` int(11) unsigned DEFAULT NULL,
  `games` tinyint(4) unsigned DEFAULT NULL,
  `wins` tinyint(4) unsigned DEFAULT NULL,
  `date` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla overattached.updates: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `updates` DISABLE KEYS */;
INSERT INTO `updates` (`id`, `username`, `sr`, `games`, `wins`, `date`) VALUES
	(15, 'necKros-21595', 2362, 9, 2, 1485993990),
	(16, 'necKros-21595', 2422, 6, 4, 1486079799),
	(17, 'necKros-21595', 2471, 2, 2, 1486315562),
	(18, 'necKros-21595', 2471, 7, 3, 1486330585);
/*!40000 ALTER TABLE `updates` ENABLE KEYS */;


-- Volcando estructura para tabla overattached.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `games` int(11) unsigned DEFAULT NULL,
  `wins` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Contains player usernames with total games played and victories';

-- Volcando datos para la tabla overattached.users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `games`, `wins`) VALUES
	(2, 'necKros-21595', 335, 155),
	(3, 'test-11111', 12, 5);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
