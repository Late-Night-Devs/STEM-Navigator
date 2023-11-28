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
  `title` varchar(100) DEFAULT NULL,
  `lead_contact` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `link_to_web` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `duration_unit` varchar(20) DEFAULT NULL,
  `long_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`program_id`),
  UNIQUE KEY `program_id` (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Programs`
--

LOCK TABLES `Programs` WRITE;
/*!40000 ALTER TABLE `Programs` DISABLE KEYS */;
INSERT INTO `Programs` VALUES (1,'LSAMP','Joyce Pieretti Ph.D','lsamp@pdx.edu','https://www.pdx.edu/alliance-minority-participation/',NULL,NULL,'The Louis Stokes Alliance for Minority Participation (LSAMP) Program is committed to supporting the success of students from historically underrepresented groups pursuing and earning a bachelor\'s degree in Science, Technology, Engineering, and Mathematics (STEM).\nWith support from the National Science Foundation and the Provost\'s Office at PSU, we provide mentorship, activities, events, and opportunities for students at Portland State University or from our local community colleges.'),(13,'MESA C2C','Yongwen Lampert','mesac2c@pcc.edu','https://www.pcc.edu/maker/stem-center/programming/mesac2c/',9,'Terms','MESA Community College Program (MCCP) provides full tuition for two years at PCC Southeast and one year at PSU for students majoring in a STEM field.\nWhile new to Oregon, the MCCP has successfully supported students across the US for over 30 years.'),(14,'SCHOLARS FOR SUCCESS IN STEM','Joyce Pieretti Ph.D','pieretti@pdx.edu','https://www.pdx.edu/engineering/S3',2,'Terms','The Scholars for Success in STEM (S3) program at Maseeh College is committed to the educational success and professional development of historically underrepresented students pursuing an undergraduate degree in engineering or computer science.\n\nSupport students during their first two terms at MCECS through interactive bi-monthly academic workshops & peer mentoring,\nPromote community and fortify students’ personal & STEM identities, and\nIncrease students\' exposure to engineering and computer science career paths through site visits and faculty networking.'),(15,'ACCESS','Vvdaul Holloway','vvdaul.holloway@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/access',3,'Terms','The ACCESS Program is designed to help support students during their first year at Portland State University by providing academic advising, help with identifying and setting academic goals, and referrals to campus and community resources.\nIn addition to these support services, students participated in a college success class.  In an attempt to alleviate financial deficiencies ACCESS students receive $1000 in tuition remission per quarter during their first year at Portland State University.'),(16,'EMPOWER','Michelle Lee','michellelee@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/empower',3,'Terms','EMPOWER is a support program designed for first-generation, Asian and Pacific Islander identifying students (both transfer and freshman standing) entering Portland State University for the first time.\nOur program is based off the understanding that college can be challenging and sometimes discouraging as students transition in their first year, and it can be even harder as students of color and first generation students- but don’t worry! EMPOWER has your back!\nAs a year-long program, EMPOWER seeks to encourage and help its students pursue their education in ways that will enable them to feel confident and be successful. Through our program, students are provided with opportunities to gain various skills and tools, sources of support, and a sense of community that all contribute to the development of successful students and leaders.'),(17,'GANAS','Emanuel Magaña','emanuel.magana@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/ganas',3,'Terms','Ganas program is a year-long support/mentor program designed to help new Latino/a students transition to P.S.U from high school. Students enrolled in this program will become active members of the campus community and will acquire skills and tools that will lead to continuing success beyond the first year at P.S.U.'),(18,'NATIONS','Trevino Brings Plenty','trevino.bringsplenty@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/nations',3,'Terms','Native American Student Services provides to Native American (N.A) and Alaskan Native (A.N) students services to support their academic success, including academic advising, guidance and referrals to appropriate student services.\nNative American Student Services coordinates with the Diversity and Multicultural Student Services (D.M.S.S) offices; the Diversity Recognition Scholarship Program, the Native American Student and Community Center, the Student Support Services/Educational Opportunity Program, and the Tutoring Center as key services for the retention and success of the N.A/A.N students.'),(19,'DIVERSITY SCHOLARSHIP PROGRAM','Perla Pinedo','perlap@pdx.edu','https://ondeck.pdx.edu/multicultural-retention-services/dsp',3,'Terms','The Diversity Scholarship program promotes diversity and student participation in campus life through volunteerism and academic excellence. Scholarship recipients will share their unique strengths and diverse perspectives through their involvement in on-campus activities, in the classroom and through their participation in community service.\nThe Diversity Scholarship is a renewable tuition-remission credit in the amount of 12 undergraduate credits at the resident tuition rate excluding fees (actual amount varies).'),(20,'TRIO','Linda Liu','triosss@pdx.edu','https://www.pdx.edu/trio-student-support-services/',NULL,NULL,'TRIO Student Support Services (SSS) is a college retention and graduation program, which helps students develop the academic skills and personal development necessary to successfully pursue and complete a college degree.\n\nWe currently have two TRIO - SSS programs - \"Classic\" and \"STEM\" (for those in Science, Technology, Engineering, and Math majors, including pre-health and Public Health Studies). Students accepted into TRIO Student Support Services will be a part of the program until they graduate from Portland State.'),(21,'EWX','Frank Goovaerts','fhg@pdx.edu','https://www.pdx.edu/engineering/ewx',3,'Months','Engineering Work Experience (EWX) is a structured internship program for undergraduate students in Electrical & Computer Engineering (ECE), Mechanical Engineering (MME) and Civil & Environmental Engineering (CEE). ');
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

-- Dump completed on 2023-11-21 16:25:53
