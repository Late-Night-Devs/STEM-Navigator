-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 06, 2023 at 12:13 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stem_navigator`
--

-- --------------------------------------------------------

--
-- Table structure for table `Programs`
--

-- we are making the db from scratch here. 
-- if we have existing database data, 
-- those data should be removed
-- otherwise you might get an error like 'table already exists'
-- and 'table cannot be dropped due to dependencies'
DROP DATABASE IF EXISTS db;
CREATE DATABASE db;
USE db;



CREATE TABLE `Programs` (
  `program_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lead_contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_to_web` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `duration_unit` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Programs`
--

INSERT INTO `Programs` (`program_id`, `title`, `lead_contact`, `contact_email`, `link_to_web`, `duration`, `duration_unit`, `long_description`) VALUES
(1, 'LSAMP', 'Joyce Pieretti Ph.D', 'lsamp@pdx.edu', 'https://www.pdx.edu/alliance-minority-participation/', NULL, NULL, 'The Louis Stokes Alliance for Minority Participation (LSAMP) Program is committed to supporting the success of students from historically underrepresented groups pursuing and earning a bachelor\'s degree in Science, Technology, Engineering, and Mathematics (STEM).\nWith support from the National Science Foundation and the Provost\'s Office at PSU, we provide mentorship, activities, events, and opportunities for students at Portland State University or from our local community colleges.'),
(13, 'MESA C2C', 'Yongwen Lampert', 'mesac2c@pcc.edu', 'https://www.pcc.edu/maker/stem-center/programming/mesac2c/', 9, 'Terms', 'MESA Community College Program (MCCP) provides full tuition for two years at PCC Southeast and one year at PSU for students majoring in a STEM field.\nWhile new to Oregon, the MCCP has successfully supported students across the US for over 30 years.'),
(14, 'SCHOLARS FOR SUCCESS IN STEM', 'Joyce Pieretti Ph.D', 'pieretti@pdx.edu', 'https://www.pdx.edu/engineering/S3', 2, 'Terms', 'The Scholars for Success in STEM (S3) program at Maseeh College is committed to the educational success and professional development of historically underrepresented students pursuing an undergraduate degree in engineering or computer science.\n\nSupport students during their first two terms at MCECS through interactive bi-monthly academic workshops & peer mentoring,\nPromote community and fortify students’ personal & STEM identities, and\nIncrease students\' exposure to engineering and computer science career paths through site visits and faculty networking.'),
(15, 'ACCESS', 'Vvdaul Holloway', 'vvdaul.holloway@pdx.edu', 'https://ondeck.pdx.edu/multicultural-retention-services/access', 3, 'Terms', 'The ACCESS Program is designed to help support students during their first year at Portland State University by providing academic advising, help with identifying and setting academic goals, and referrals to campus and community resources.\nIn addition to these support services, students participated in a college success class.  In an attempt to alleviate financial deficiencies ACCESS students receive $1000 in tuition remission per quarter during their first year at Portland State University.'),
(16, 'EMPOWER', 'Michelle Lee', 'michellelee@pdx.edu', 'https://ondeck.pdx.edu/multicultural-retention-services/empower', 3, 'Terms', 'EMPOWER is a support program designed for first-generation, Asian and Pacific Islander identifying students (both transfer and freshman standing) entering Portland State University for the first time.\nOur program is based off the understanding that college can be challenging and sometimes discouraging as students transition in their first year, and it can be even harder as students of color and first generation students- but don’t worry! EMPOWER has your back!\nAs a year-long program, EMPOWER seeks to encourage and help its students pursue their education in ways that will enable them to feel confident and be successful. Through our program, students are provided with opportunities to gain various skills and tools, sources of support, and a sense of community that all contribute to the development of successful students and leaders.'),
(17, 'GANAS', 'Emanuel Magaña', 'emanuel.magana@pdx.edu', 'https://ondeck.pdx.edu/multicultural-retention-services/ganas', 3, 'Terms', 'Ganas program is a year-long support/mentor program designed to help new Latino/a students transition to P.S.U from high school. Students enrolled in this program will become active members of the campus community and will acquire skills and tools that will lead to continuing success beyond the first year at P.S.U.'),
(18, 'NATIONS', 'Trevino Brings Plenty', 'trevino.bringsplenty@pdx.edu', 'https://ondeck.pdx.edu/multicultural-retention-services/nations', 3, 'Terms', 'Native American Student Services provides to Native American (N.A) and Alaskan Native (A.N) students services to support their academic success, including academic advising, guidance and referrals to appropriate student services.\nNative American Student Services coordinates with the Diversity and Multicultural Student Services (D.M.S.S) offices; the Diversity Recognition Scholarship Program, the Native American Student and Community Center, the Student Support Services/Educational Opportunity Program, and the Tutoring Center as key services for the retention and success of the N.A/A.N students.'),
(19, 'DIVERSITY SCHOLARSHIP PROGRAM', 'Perla Pinedo', 'perlap@pdx.edu', 'https://ondeck.pdx.edu/multicultural-retention-services/dsp', 3, 'Terms', 'The Diversity Scholarship program promotes diversity and student participation in campus life through volunteerism and academic excellence. Scholarship recipients will share their unique strengths and diverse perspectives through their involvement in on-campus activities, in the classroom and through their participation in community service.\nThe Diversity Scholarship is a renewable tuition-remission credit in the amount of 12 undergraduate credits at the resident tuition rate excluding fees (actual amount varies).'),
(20, 'TRIO', 'Linda Liu', 'triosss@pdx.edu', 'https://www.pdx.edu/trio-student-support-services/', NULL, NULL, 'TRIO Student Support Services (SSS) is a college retention and graduation program, which helps students develop the academic skills and personal development necessary to successfully pursue and complete a college degree.\n\nWe currently have two TRIO - SSS programs - \"Classic\" and \"STEM\" (for those in Science, Technology, Engineering, and Math majors, including pre-health and Public Health Studies). Students accepted into TRIO Student Support Services will be a part of the program until they graduate from Portland State.'),
(21, 'EWX', 'Frank Goovaerts', 'fhg@pdx.edu', 'https://www.pdx.edu/engineering/ewx', 3, 'Months', 'Engineering Work Experience (EWX) is a structured internship program for undergraduate students in Electrical & Computer Engineering (ECE), Mechanical Engineering (MME) and Civil & Environmental Engineering (CEE). ');

-- --------------------------------------------------------

--
-- Table structure for table `ProgramTags`
--

CREATE TABLE `ProgramTags` (
  `program_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tag_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProgramTags`
--

INSERT INTO `ProgramTags` (`program_id`, `tag_id`) VALUES
(1, 18),
(1, 19),
(1, 21),
(1, 20),
(1, 22),
(1, 23),
(1, 24),
(1, 5),
(1, 6),
(1, 7),
(13, 28),
(13, 1),
(13, 27),
(13, 3),
(13, 9),
(13, 10),
(13, 2),
(14, 30),
(14, 25),
(14, 18),
(14, 19),
(14, 20),
(14, 21),
(14, 22),
(14, 23),
(14, 24),
(14, 9),
(14, 5),
(15, 29),
(15, 18),
(15, 19),
(15, 9),
(15, 2),
(15, 5),
(15, 7),
(16, 29),
(16, 23),
(16, 9),
(16, 2),
(16, 5),
(16, 7),
(16, 15),
(17, 29),
(17, 20),
(17, 21),
(17, 9),
(17, 2),
(17, 5),
(17, 7),
(18, 29),
(18, 22),
(18, 9),
(18, 2),
(18, 5),
(18, 7),
(19, 29),
(19, 15),
(19, 9),
(19, 2),
(19, 5),
(19, 7),
(20, 14),
(20, 15),
(20, 17),
(20, 3),
(20, 9),
(20, 10),
(20, 5),
(20, 8),
(21, 34),
(21, 26),
(21, 25),
(21, 11),
(21, 7),
(21, 6),
(21, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE `Tags` (
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `tag_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Tags`
--

INSERT INTO `Tags` (`tag_id`, `tag_name`, `category`) VALUES
(1, 'STEM', 'Program Focus'),
(2, 'Application Required', 'Eligibility'),
(3, 'Citizen Required', 'Eligibility'),
(4, 'Research Opportunity', 'Student Services'),
(5, 'Student Development', 'Student Services'),
(6, 'Career Development', 'Student Services'),
(7, 'Financial Assistance', 'Student Services'),
(8, 'Conflicts', 'Eligibility'),
(9, 'Early Level', 'University Status'),
(10, 'Mid Level', 'University Status'),
(11, 'Late Level', 'University Status'),
(12, 'Student Support', 'Student Services'),
(13, 'Internship', 'Student Services'),
(14, 'Low Income', 'Identity '),
(15, 'First Generation', 'Identity '),
(16, 'Women ', 'Identity '),
(17, 'ADA Disability', 'Identity '),
(18, 'Black', 'Identity '),
(19, 'African American', 'Identity '),
(20, 'Hispanic', 'Identity'),
(21, 'Latino', 'Identity'),
(22, 'Native American', 'Identity'),
(23, 'Native Hawaiian / Pacific Islander', 'Identity'),
(24, 'Indigenous', 'Identity'),
(25, 'Engineering', 'Program Focus'),
(26, 'Summer', 'Timing'),
(27, 'Community College', 'Identity'),
(28, '9 Terms', 'Timing'),
(29, '3 Terms', 'Timing'),
(30, '2 Terms', 'Timing'),
(31, '1 Term', 'Timing'),
(32, '24 Months', 'Timing'),
(33, '12 Months', 'Timing'),
(34, '3 Months', 'Timing'),
(35, '10 Weeks', 'Timing'),
(36, '8 Weeks', 'Timing');

-- --------------------------------------------------------

--
-- Table structure for table `UserFavorites`
--

CREATE TABLE `UserFavorites` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `program_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserFavorites`
--

INSERT INTO `UserFavorites` (`user_id`, `program_id`) VALUES
(1, 1),
(2, 13),
(2, 14);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `first_name`, `last_name`, `email`, `admin`) VALUES
(1, 'Adam', 'Inistrator', 'admin@gmail.com', 'TRUE'),
(2, 'Notta', 'Inistrator', 'notadmin@gmail.com', 'FALSE'),
(3, 'team', 'admin', 'latenightdevsfw23@gmail.com', 'TRUE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Programs`
--
ALTER TABLE `Programs`
  ADD PRIMARY KEY (`program_id`),
  ADD UNIQUE KEY `program_id` (`program_id`);

--
-- Indexes for table `ProgramTags`
--
ALTER TABLE `ProgramTags`
  ADD KEY `program_id_fk` (`program_id`),
  ADD KEY `program_tag_fk` (`tag_id`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `tag_id` (`tag_id`);

--
-- Indexes for table `UserFavorites`
--
ALTER TABLE `UserFavorites`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Programs`
--
ALTER TABLE `Programs`
  MODIFY `program_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
  MODIFY `tag_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ProgramTags`
--
ALTER TABLE `ProgramTags`
  ADD CONSTRAINT `program_id_fk` FOREIGN KEY (`program_id`) REFERENCES `Programs` (`program_id`),
  ADD CONSTRAINT `program_tag_fk` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`tag_id`);

--
-- Constraints for table `UserFavorites`
--
ALTER TABLE `UserFavorites`
  ADD CONSTRAINT `UserFavorites_ProgramExists` FOREIGN KEY (`program_id`) REFERENCES `Programs` (`program_id`),
  ADD CONSTRAINT `UserFavorites_UserExists` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
