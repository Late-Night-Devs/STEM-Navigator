-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 14, 2023 at 12:34 AM
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
-- Database: `Private_STEM_Navigator_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `citizenship_residency`
--

CREATE TABLE `citizenship_residency` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `citizenship_residency`
--

INSERT INTO `citizenship_residency` (`id`, `tag`) VALUES
(1, 'REQUIRED'),
(2, 'NOT REQUIRED'),
(3, 'NOT SPECIFIED'),
(4, 'DIFFERS BY EMPLOYER');

-- --------------------------------------------------------

--
-- Table structure for table `conflict`
--

CREATE TABLE `conflict` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conflict`
--

INSERT INTO `conflict` (`id`, `tag`) VALUES
(1, 'None'),
(2, 'Yes'),
(3, 'Other summer programs');

-- --------------------------------------------------------

--
-- Table structure for table `major_focus`
--

CREATE TABLE `major_focus` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `major_focus`
--

INSERT INTO `major_focus` (`id`, `tag`) VALUES
(1, 'STEM'),
(2, 'NON-STEM'),
(3, 'ENGINEERING');

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_citizenship_residency`
--

CREATE TABLE `map_program_to_citizenship_residency` (
  `program_id` int(11) NOT NULL,
  `citizen_residency_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_citizenship_residency`
--

INSERT INTO `map_program_to_citizenship_residency` (`program_id`, `citizen_residency_id`) VALUES
(1, 2),
(2, 4),
(3, 1),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_conflict`
--

CREATE TABLE `map_program_to_conflict` (
  `program_id` int(11) NOT NULL,
  `conflict_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_conflict`
--

INSERT INTO `map_program_to_conflict` (`program_id`, `conflict_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_major_focus`
--

CREATE TABLE `map_program_to_major_focus` (
  `program_id` int(11) NOT NULL,
  `major_focus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_major_focus`
--

INSERT INTO `map_program_to_major_focus` (`program_id`, `major_focus_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(3, 2),
(4, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_prio_served`
--

CREATE TABLE `map_program_to_prio_served` (
  `program_id` int(11) NOT NULL,
  `prio_served_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_prio_served`
--

INSERT INTO `map_program_to_prio_served` (`program_id`, `prio_served_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 3),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_program_duration`
--

CREATE TABLE `map_program_to_program_duration` (
  `program_id` int(11) NOT NULL,
  `program_duration_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_program_duration`
--

INSERT INTO `map_program_to_program_duration` (`program_id`, `program_duration_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 2),
(3, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `map_program_to_university_level_status`
--

CREATE TABLE `map_program_to_university_level_status` (
  `program_id` int(11) NOT NULL,
  `university_level_status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_program_to_university_level_status`
--

INSERT INTO `map_program_to_university_level_status` (`program_id`, `university_level_status_id`) VALUES
(1, 1),
(2, 3),
(3, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `prio_served`
--

CREATE TABLE `prio_served` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prio_served`
--

INSERT INTO `prio_served` (`id`, `tag`) VALUES
(1, 'Hispanic'),
(2, 'Latino/e/x'),
(3, 'None');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `id` int(11) NOT NULL,
  `name` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_to_web` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lead_contact` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `application` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_development` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `financial_assistance` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `career_development` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`id`, `name`, `category`, `link_to_web`, `lead_contact`, `email`, `description`, `application`, `student_development`, `financial_assistance`, `career_development`) VALUES
(1, 'GANAS', 'STUDENT SUPPORT', 'https://ondeck.pdx.edu/multicultural-retention-services/ganas', 'Emanuel Magaña', 'emanuel.magana@pdx.edu', 'Ganas program is a year-long support/mentor program designed to help new Latino/a students transition to P.S.U from high school. Students enrolled in this program will become active members of the campus community and will acquire skills and tools that will lead to continuing success beyond the first year at P.S.U.', 'REQUIRED', 'AVAILABLE', 'AVAILABLE', 'NOT AVAILABLE'),
(2, 'EWX', 'INTERNSHIPS', 'https://www.pdx.edu/engineering/ewx', 'Frank Goovaerts', 'fhg@pdx.edu', 'Engineering Work Experience (EWX) is a structured internship program for undergraduate students in Electrical & Computer Engineering (ECE), Mechanical Engineering (MME) and Civil & Environmental Engineering (CEE). ', 'REQUIRED', 'NOT AVAILABLE', 'AVAILABLE', 'AVAILABLE'),
(3, 'NSF REU @ PSU | MICROSCOPY AND MICROANALYSIS', 'RESEARCH', 'https://www.pdx.edu/research-experience/', 'Jun Jiao', 'reuga@pdx.edu', 'This REU Site program focuses on the applications of microscopy and microanalysis in multidisciplinary research and provides opportunities for undergraduate students to participate in cutting-edge research projects. The participant recruitment is emphasized on underrepresented minorities, women, veterans of the US armed forces, students with disabilities, and nontraditional students.', 'REQUIRED', 'AVAILABLE', 'AVAILABLE', 'AVAILABLE'),
(4, 'COMPUTER ACTION TEAM (CAT)', 'CAMPUS JOBS - CAREER DEVELOPMENT', 'https://braindump.cat.pdx.edu/braindump/', 'Janaka Jayawardena', 'support@cat.pdx.edu', 'The CAT is the Computer Action Team, a dedicated and self-selected band of student computer enthusiasts from diverse majors and backgrounds who learn, grow, and innovate together on the systems in the Maseeh College of Engineering and Computer Science.\nNo matter their prior knowledge, many members of the CAT become frequent and knowledgeable volunteers and student workers that provides the support of the entire Maseeh College.', 'NOT REQUIRED', 'AVAILABLE', 'NOT AVAILABLE', 'NOT AVAILABLE');

-- --------------------------------------------------------

--
-- Table structure for table `program_duration`
--

CREATE TABLE `program_duration` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `program_duration`
--

INSERT INTO `program_duration` (`id`, `tag`) VALUES
(1, '3 TERMS'),
(2, 'SUMMER'),
(3, '3 MONTHS'),
(4, '8 WEEKS'),
(5, 'VARIES');

-- --------------------------------------------------------

--
-- Table structure for table `university_level_status`
--

CREATE TABLE `university_level_status` (
  `id` int(11) NOT NULL,
  `tag` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `university_level_status`
--

INSERT INTO `university_level_status` (`id`, `tag`) VALUES
(1, 'EARLY LEVEL STATUS'),
(2, 'MID LEVEL STATUS'),
(3, 'LATE LEVEL STATUS'),
(4, 'ALL');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citizenship_residency`
--
ALTER TABLE `citizenship_residency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conflict`
--
ALTER TABLE `conflict`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `major_focus`
--
ALTER TABLE `major_focus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map_program_to_citizenship_residency`
--
ALTER TABLE `map_program_to_citizenship_residency`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `citizen_residency_id` (`citizen_residency_id`);

--
-- Indexes for table `map_program_to_conflict`
--
ALTER TABLE `map_program_to_conflict`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `conflict_id` (`conflict_id`);

--
-- Indexes for table `map_program_to_major_focus`
--
ALTER TABLE `map_program_to_major_focus`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `major_focus_id` (`major_focus_id`);

--
-- Indexes for table `map_program_to_prio_served`
--
ALTER TABLE `map_program_to_prio_served`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `prio_served_id` (`prio_served_id`);

--
-- Indexes for table `map_program_to_program_duration`
--
ALTER TABLE `map_program_to_program_duration`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `program_duration_exists` (`program_duration_id`);

--
-- Indexes for table `map_program_to_university_level_status`
--
ALTER TABLE `map_program_to_university_level_status`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `university_level_status_id` (`university_level_status_id`);

--
-- Indexes for table `prio_served`
--
ALTER TABLE `prio_served`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `program_duration`
--
ALTER TABLE `program_duration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `university_level_status`
--
ALTER TABLE `university_level_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citizenship_residency`
--
ALTER TABLE `citizenship_residency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conflict`
--
ALTER TABLE `conflict`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `major_focus`
--
ALTER TABLE `major_focus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prio_served`
--
ALTER TABLE `prio_served`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `program_duration`
--
ALTER TABLE `program_duration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `university_level_status`
--
ALTER TABLE `university_level_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `map_program_to_citizenship_residency`
--
ALTER TABLE `map_program_to_citizenship_residency`
  ADD CONSTRAINT `mptcr_citizenship_residency_exists` FOREIGN KEY (`citizen_residency_id`) REFERENCES `citizenship_residency` (`id`),
  ADD CONSTRAINT `mptcr_program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

--
-- Constraints for table `map_program_to_conflict`
--
ALTER TABLE `map_program_to_conflict`
  ADD CONSTRAINT `mptc_conflict_exists` FOREIGN KEY (`conflict_id`) REFERENCES `conflict` (`id`),
  ADD CONSTRAINT `mptc_program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

--
-- Constraints for table `map_program_to_major_focus`
--
ALTER TABLE `map_program_to_major_focus`
  ADD CONSTRAINT `mptmf_major_focus_exists` FOREIGN KEY (`major_focus_id`) REFERENCES `major_focus` (`id`),
  ADD CONSTRAINT `mptmf_program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

--
-- Constraints for table `map_program_to_prio_served`
--
ALTER TABLE `map_program_to_prio_served`
  ADD CONSTRAINT `mptps_prio_served_exists` FOREIGN KEY (`prio_served_id`) REFERENCES `prio_served` (`id`),
  ADD CONSTRAINT `mptps_program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

--
-- Constraints for table `map_program_to_program_duration`
--
ALTER TABLE `map_program_to_program_duration`
  ADD CONSTRAINT `program_duration_exists` FOREIGN KEY (`program_duration_id`) REFERENCES `program_duration` (`id`),
  ADD CONSTRAINT `program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`);

--
-- Constraints for table `map_program_to_university_level_status`
--
ALTER TABLE `map_program_to_university_level_status`
  ADD CONSTRAINT `mptuls_program_exists` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`),
  ADD CONSTRAINT `mptuls_university_level_status_exists` FOREIGN KEY (`university_level_status_id`) REFERENCES `university_level_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
