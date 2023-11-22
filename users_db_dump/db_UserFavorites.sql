-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 22, 2023 at 01:08 AM
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
-- Database: `PSU_STEM_Navigator_Users`
--

-- --------------------------------------------------------

--
-- Table structure for table `UserFavorites`
--

CREATE TABLE `UserFavorites` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `favorite_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `UserFavorites`
--

INSERT INTO `UserFavorites` (`user_id`, `favorite_id`) VALUES
(1, 1),
(2, 2),
(2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `UserFavorites`
--
ALTER TABLE `UserFavorites`
  ADD UNIQUE KEY `user_id_2` (`user_id`,`favorite_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `favorite_id` (`favorite_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `UserFavorites`
--
ALTER TABLE `UserFavorites`
  ADD CONSTRAINT `userfavorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `userfavorites_ibfk_2` FOREIGN KEY (`favorite_id`) REFERENCES `Favorites` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
