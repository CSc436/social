CREATE DATABASE  IF NOT EXISTS `cstestdb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cstestdb`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: cstestdb
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attending`
--

DROP TABLE IF EXISTS `attending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attending` (
  `Email` varchar(50) NOT NULL,
  `Event` int(11) NOT NULL,
  PRIMARY KEY (`Email`,`Event`),
  KEY `Event_idx` (`Event`),
  CONSTRAINT `Email` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Event` FOREIGN KEY (`Event`) REFERENCES `event` (`EventID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attending`
--

LOCK TABLES `attending` WRITE;
/*!40000 ALTER TABLE `attending` DISABLE KEYS */;
/*!40000 ALTER TABLE `attending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryID_UNIQUE` (`CategoryID`),
  UNIQUE KEY `CategoryName_UNIQUE` (`CategoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'music');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(140) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Timestamp` datetime NOT NULL,
  `ChosenTime` datetime NOT NULL,
  `LocationID` int(11) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `CategoryID` int(11) NOT NULL,
  `FlagCount` int(2) NOT NULL,
  `LocationString` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  UNIQUE KEY `EventID_UNIQUE` (`EventID`),
  KEY `Email` (`Email`),
  KEY `LocationID` (`LocationID`),
  KEY `fk_CategoryID` (`CategoryID`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`),
  CONSTRAINT `fk_CategoryID` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  CONSTRAINT `LocationID` FOREIGN KEY (`LocationID`) REFERENCES `locale` (`LocationID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14043 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--
SET GLOBAL event_scheduler = 1;
DELIMITER $$
CREATE EVENT expiredDelete
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
DO
BEGIN 
DELETE from eventkeyword WHERE (eventID = event.eventID) AND (datediff(CURDATE(), event.ChosenTime()) > 5); 
DELETE from attending WHERE (event= event.eventID) AND datediff(CURDATE(), event.ChosenTime()) > 5;
DELETE from event WHERE datediff(CURDATE(), event.ChosenTime()) > 5;
END$$
DELIMITER ;


LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventkeyword`
--

DROP TABLE IF EXISTS `eventkeyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventkeyword` (
  `EventID` int(11) NOT NULL,
  `KeywordID` int(11) NOT NULL,
  PRIMARY KEY (`EventID`,`KeywordID`),
  KEY `KeywordID_idx` (`KeywordID`),
  CONSTRAINT `EventID` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `KeywordID` FOREIGN KEY (`KeywordID`) REFERENCES `keyword` (`KeywordID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventkeyword`
--

LOCK TABLES `eventkeyword` WRITE;
/*!40000 ALTER TABLE `eventkeyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventkeyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `following` (
  `FollowerEmail` varchar(50) NOT NULL DEFAULT '',
  `FollowedEmail` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`FollowerEmail`,`FollowedEmail`),
  KEY `FollowedEmail` (`FollowedEmail`),
  CONSTRAINT `following_ibfk_1` FOREIGN KEY (`FollowerEmail`) REFERENCES `user` (`Email`),
  CONSTRAINT `following_ibfk_2` FOREIGN KEY (`FollowedEmail`) REFERENCES `user` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `following`
--

LOCK TABLES `following` WRITE;
/*!40000 ALTER TABLE `following` DISABLE KEYS */;
INSERT INTO `following` VALUES ('bar@bar.com','foo@foo.com');
/*!40000 ALTER TABLE `following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword` (
  `KeywordID` int(11) NOT NULL AUTO_INCREMENT,
  `Word` varchar(25) NOT NULL,
  PRIMARY KEY (`KeywordID`),
  UNIQUE KEY `KeywordID_UNIQUE` (`KeywordID`),
  UNIQUE KEY `Word_UNIQUE` (`Word`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locale`
--

DROP TABLE IF EXISTS `locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locale` (
  `LocationID` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` float(8,5) NOT NULL,
  `latitude` float(8,5) NOT NULL,
  PRIMARY KEY (`LocationID`),
  UNIQUE KEY `LocationID_UNIQUE` (`LocationID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locale`
--

LOCK TABLES `locale` WRITE;
/*!40000 ALTER TABLE `locale` DISABLE KEYS */;
INSERT INTO `locale` VALUES (1,-110.944,32.2361);
/*!40000 ALTER TABLE `locale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `NotificationID` int(2) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `EventID` int(11) NOT NULL,
  `Seen` bit(1) NOT NULL,
  `Description` varchar(140) NOT NULL,
  PRIMARY KEY (`NotificationID`),
  KEY `Email` (`Email`),
  KEY `EventID` (`EventID`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`),
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Email` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Firstname` varchar(50) DEFAULT NULL,
  `Lastname` varchar(50) DEFAULT NULL,
  `salt` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Reputation` int(11) NOT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-04-29 20:40:33
