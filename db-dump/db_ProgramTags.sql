-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ProgramTags`
--

DROP TABLE IF EXISTS `ProgramTags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProgramTags` (
  `program_id` bigint unsigned DEFAULT NULL,
  `tag_id` bigint unsigned DEFAULT NULL,
  KEY `program_id_fk` (`program_id`),
  KEY `program_tag_fk` (`tag_id`),
  CONSTRAINT `program_id_fk` FOREIGN KEY (`program_id`) REFERENCES `Programs` (`program_id`),
  CONSTRAINT `program_tag_fk` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProgramTags`
--

LOCK TABLES `ProgramTags` WRITE;
/*!40000 ALTER TABLE `ProgramTags` DISABLE KEYS */;
INSERT INTO `ProgramTags` VALUES (1,18),(1,19),(1,21),(1,20),(1,22),(1,23),(1,24),(1,5),(1,6),(1,7),(13,28),(13,1),(13,27),(13,3),(13,9),(13,10),(13,2),(14,30),(14,25),(14,18),(14,19),(14,20),(14,21),(14,22),(14,23),(14,24),(14,9),(14,5),(15,29),(15,18),(15,19),(15,9),(15,2),(15,5),(15,7),(16,29),(16,23),(16,9),(16,2),(16,5),(16,7),(16,15),(17,29),(17,20),(17,21),(17,9),(17,2),(17,5),(17,7),(18,29),(18,22),(18,9),(18,2),(18,5),(18,7),(19,29),(19,15),(19,9),(19,2),(19,5),(19,7),(20,14),(20,15),(20,17),(20,3),(20,9),(20,10),(20,5),(20,8),(21,34),(21,26),(21,25),(21,11),(21,7),(21,6),(21,8);
/*!40000 ALTER TABLE `ProgramTags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21 16:25:53
