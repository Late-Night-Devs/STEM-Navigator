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
-- Table structure for table `Programs`
--

DROP TABLE IF EXISTS `Programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Programs` (
  `program_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `lead_contact` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `link_to_web` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `duration_unit` varchar(20) DEFAULT NULL,
  `long_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`program_id`),
  UNIQUE KEY `program_id` (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Programs`
--

LOCK TABLES `Programs` WRITE;
/*!40000 ALTER TABLE `Programs` DISABLE KEYS */;
INSERT INTO `Programs` VALUES (1,'LSAMP','Joyce Pieretti Ph.D','lsamp@pdx.edu','https://www.pdx.edu/alliance-minority-participation/',NULL,'','The Louis Stokes Alliance for Minority Participation (LSAMP) Program is committed to supporting the success of students from historically underrepresented groups pursuing and earning a bachelor\'s degree in Science, Technology, Engineering, and Mathematics (STEM).\nWith support from the National Science Foundation and the Provost\'s Office at PSU, we provide mentorship, activities, events, and opportunities for students at Portland State University or from our local community colleges.'),(2,'ACCESS','Vvdaul Holloway','vvdaul.holloway@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/access',3,'Terms','The ACCESS Program is designed to help support students during their first year at Portland State University by providing academic advising, help with identifying and setting academic goals, and referrals to campus and community resources.\nIn addition to these support services, students participated in a college success class.  In an attempt to alleviate financial deficiencies ACCESS students receive $1000 in tuition remission per quarter during their first year at Portland State University.'),(3,'EWX','Frank Goovaerts','fhg@pdx.edu','https://www.pdx.edu/engineering/ewx',3,'Months','Engineering Work Experience (EWX) is a structured internship program for undergraduate students in Electrical & Computer Engineering (ECE), Mechanical Engineering (MME) and Civil & Environmental Engineering (CEE). '),(4,'NSF REU Computational Modeling','Christof Teuscher','reucomputing@pdx.edu','https://www.teuscher-lab.com/reucomputing/',10,'Weeks','The focus area of our Research Experiences for Undergraduates (REU) site is computational modeling to serve and enhance the Portland metropolitan region as it grows and evolves. Students will be involved in cutting-edge, multi-disciplinary research projects and trained in computational thinking across different disciplines and communities.');
/*!40000 ALTER TABLE `Programs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-10 12:37:51
