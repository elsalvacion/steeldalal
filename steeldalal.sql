-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2022 at 11:14 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `steeldalal`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`title`, `image`) VALUES
('Aluminium', ''),
('Bars', ''),
('Coils', ''),
('Pipes', ''),
('Sheets', ''),
('Steel', '');

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `id` int(11) NOT NULL,
  `product` int(11) DEFAULT NULL,
  `detail` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `product` int(11) DEFAULT NULL,
  `image` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `product`, `image`) VALUES
(7, 61, 'uploads/eipk58Oji-LsPq6Pf9mhA.webp'),
(8, 61, 'uploads/DuAK7QMzHvOOZQq57a2Nf.webp'),
(9, 61, 'uploads/grb4YNJUkT-1DYosGAmU5.webp'),
(10, 61, 'uploads/rn0zSqobvt3lNilGlKu0L.webp'),
(19, 66, 'uploads/qfQBgQQVSa5f0KnQK9eCh.webp'),
(20, 66, 'uploads/T64XQHOEp3LT-IQCMpGJh.webp'),
(21, 67, 'uploads/rh73t-KHcxJxRuZ8FMV_o.webp'),
(22, 67, 'uploads/rH73jMBypn4Rb_pPU7wUp.webp'),
(35, 233, 'uploads/T1tC09s-eCPB4kxmp5kf7.webp'),
(36, 233, 'uploads/hnKppj-GEG8yfsxjsfAbm.webp'),
(41, 236, 'uploads/VPWE-OXBfNgwcD_IOXUzt.webp'),
(42, 236, 'uploads/n4RoXsretDivum1IRvi_H.webp'),
(43, 236, 'uploads/-_MaVDGIu0fuwc1pPPD5k.webp'),
(44, 236, 'uploads/wtVE5STSqrYic6zZbP16n.webp'),
(45, 237, 'uploads/WvzDZZHIhDwaLpal5hZfj.webp'),
(46, 237, 'uploads/kfW22qgk1pvwqplBvE-P0.webp');

-- --------------------------------------------------------

--
-- Table structure for table `length`
--

CREATE TABLE `length` (
  `id` int(11) NOT NULL,
  `length` float DEFAULT NULL,
  `product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(10000) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(3000) NOT NULL,
  `details` longtext NOT NULL,
  `detailsText` longtext DEFAULT NULL,
  `rating` float NOT NULL,
  `type` varchar(255) NOT NULL,
  `user` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `brand`, `category`, `qty`, `discount`, `price`, `image`, `details`, `detailsText`, `rating`, `type`, `user`, `createdAt`, `updatedAt`) VALUES
(2, 'aisi 304 316 316ti Stainless steel plate/coil/pipe/Angle/Channel /Flat 410 430 440c 201 202 ss bar', 'Hot rolled', 'Steel', 3, 7, 149.99, 'https://www.sddlmetal.com/UpLoadFile/20220412/c446a26c-0576-47aa-a133-5bd511a7d6a2.jpg', 'Delong Metal is group company in the steel manufacture & Trading, founded in the 2000s, 800+ staff, 25, 000+ m2 non-dust workshop, 40+ great large mills and cooperation partners in China, 4000, 000+ MT production per year under ISO management, 40, 000+customers in domestic and overseas market, 10 billion USD of annual turnover, 15+ subsidiary companies all over China, ranking the Top 100 private enterprises in China, 1 hour reach Shanghai/Tianjin /Guangzhou Port, we keep high quality, competitive price, thousands tons of stock, most efficient delivery and reliable cooperation for global valued customers.', '', 0, 'Coils', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(3, 'Stainless Steel Plate', 'German', 'Steel', 3, 20, 129.99, 'https://www.sddlmetal.com/UpLoadFile/20201130/9baccf04-7c84-4664-9ec6-bd9fe0c0b497.jpg', 'Delong Metal is group company in the steel manufacture & Trading, founded in the 2000s, 800+ staff, 25, 000+ m2 non-dust workshop, 40+ great large mills and cooperation partners in China, 4000, 000+ MT production per year under ISO management, 40, 000+customers in domestic and overseas market, 10 billion USD of annual turnover, 15+ subsidiary companies all over China, ranking the Top 100 private enterprises in China, 1 hour reach Shanghai/Tianjin /Guangzhou Port, we keep high quality, competitive price, thousands tons of stock, most efficient delivery and reliable cooperation for global valued customers. We have been engaging industry steel for over 20 years, best service and the most competitive price is one of our greatest advantages that make us today!', '', 2.5, 'Cold rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(5, 'Stainless Steel Rod', 'German', 'Steel', 3, 20, 129.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/a5b86298-2b4f-4da6-a3e6-58d271d50b77.jpg', 'Main products: seamless steel pipe, round steel, welded pipes, spiral pipes, galvanized pipe, alloy pipes, stainless steel, threaded steel, angle grooves, aluminum plates, U-shaped steel and other dozens of products, hundreds of steel grade materials.', '', 2.5, 'Cold rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(7, 'Stainless Steel Tube', 'German', 'Steel', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/9b6d2f76-48ab-4e84-ac97-488efa067869.jpg', 'Main products: seamless steel pipe, round steel, welded pipes, spiral pipes, galvanized pipe, alloy pipes, stainless steel, threaded steel, angle grooves, aluminum plates, U-shaped steel and other dozens of products, hundreds of steel grade materials.', '', 4.5, 'Cold rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(9, 'Aluminum Block', 'English', 'Aluminium', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/48835dee-31f0-49ba-bd76-f9a1a50edcba.jpg', 'aluminum block 6061 T6 alloy price. \nHigh weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in  aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(10, 'Aluminum Rod', 'English', 'Aluminium', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/89cfc634-6c03-48f1-a02e-b4f9462e4b59.jpg', 'aluminum block 6061 T6 alloy price. \nHigh weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in  aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(11, 'Aluminum Sheet', 'English', 'Aluminium', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/1428e048-bb89-482c-957b-ccf48f6f4c95.jpg', 'aluminum block 6061 T6 alloy price. \nHigh weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in  aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(12, 'Aluminum Tube', 'English', 'Aluminium', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/cd36c206-7fdf-4fd6-9b8d-a5fbf4a2397e.jpg', 'aluminum block 6061 T6 alloy price. \nHigh weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in  aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(14, 'ASTM a36 ar500 ss400 sa516 hardox 500 450 carbon steel plate/sheet wear resistant steel mild steel', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220330/683200b6-e75d-4f9a-9771-b7c2d4b086ac.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(16, 'Galvanized Steel Sheet/plate gi sheet', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220411/b11c5d34-182b-414f-8fcc-48b32a8feaec.jpeg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(17, 'ppgi roofing sheet', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220505/1a9ec5c1-d49f-4052-8617-0e65f387c514.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(18, 'Spring Steel Plate En42j SAE Strip 1095 Carbon Alloy Steel Sheet', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220513/f34b6b73-00cc-45d7-b6f5-de35d5b2b709.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(19, 'Perforated Steel Plate Sheet Galvanized Punched Aluminum/Stainless/Carbon/Copper Panel', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220429/541f3fed-abe3-4aaf-aa25-7617bb59081f.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(20, 'Cold rolled low carbon and ultra-low carbon steel plate', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220427/db314fd9-538a-4bd5-bcbc-e65ef96a24e2.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(21, '304 316 430 410 440c Stainless Steel Plate/sheet ss plate', 'English', 'Sheets', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220411/2bff3fc8-5a2c-4887-ba3f-c7b188f9c1fc.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(22, 'Rebar Steel HRB400 HRB500 HRB235 HRB355 ASTM a36 a516 a572 a514 a588 a285 ss400', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220420/2992041a-21ca-4048-8874-7bdf0d71111a.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(23, 'Round Bar Steel ASTM a36 a516 a572 a514 a588 a285 ss400', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210524/ac2d3296-225b-433f-a6ed-244d86aebfcd.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(24, 'Rebar', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201130/dd7674c6-845c-4791-82f5-827ed6fbb6b7.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(25, 'Round Steel', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201130/6eded182-814c-417f-a599-88d8b27abe5c.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(26, 'Flat Bar Steel', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210524/f5359729-51b6-4159-ba74-085cacdb45a0.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(28, 'Angle Steel', 'English', 'Bars', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210525/a872743b-c502-4864-8b64-1ca6009204b3.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(29, 'Steel Coil', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210528/bdf0fb6d-6a59-42ba-a254-f91192e36005.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(31, 'PPGI & PPGL steel coil', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210115/8543eede-9037-44c2-93e7-1eaa4b01cd62.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(33, 'Galvalume Steel Coil & Sheet', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210115/84bba84a-39c0-42a5-a8c3-8d834c462ffe.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(34, 'Coated Steel Coil', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210521/f58d2d20-5dee-4868-8591-b74c6c555fef.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(35, 'Cold-rolled steel coil', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210115/114fe09f-1ff0-4fbb-8c89-0595aa4b350b.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(36, 'Hot Rolled Steel Coil', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210115/3e882055-8bbb-4995-981b-75e091cc4957.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(37, 'Hot Dipped Galvanized Steel Coils', 'English', 'Coils', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210115/61444543-681e-4aa9-8913-d175a70a90e5.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(38, 'Carbon Steel Pipe sch 40 pipe steel and tube', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201125/846ccd78-f213-415b-9fe9-952f54df6ad9.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(39, 'Seamless Steel Pipe metal pipe tube supplier', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201125/a4f22cad-f454-4cb4-bee2-a77aafed4e61.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(40, 'sus 316l 304 Stainless Steel Pipe ss tube sst tubing', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201125/35d82653-f190-48fb-8bf1-16029a1bb5a2.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(41, 'ERW Steel Pipe rolled tube welded pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220324/c22e192b-fd97-46dc-9786-0033f92f7476.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(42, 'black pipe steel and pipe metal pipe seamless pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20220324/8379de27-8151-4914-82f9-fd5ba3bf5575.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(44, 'SSAW Steel Pipe Carbon steel pipe welded pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201127/daa69e67-4a97-43c1-a873-24367123e84f.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(46, 'Galvanized Steel Pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201127/49fc00c5-2352-47bb-b0fd-b53ed6a41b7a.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(47, 'Coated Steel Pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201127/12ea160f-49ef-410f-99ed-251ed224fa08.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(48, 'Hollow Section', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20201201/cec31665-fc36-4787-be2f-f9046d3154b7.png', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(49, 'Coated Steel Pipe', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210521/067bd307-9e59-44a9-9022-55b3a22e1065.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(50, 'STEEL PIPE', 'English', 'Pipes', 3, 50, 109.99, 'https://www.sddlmetal.com/UpLoadFile/20210520/28486008-9b76-40f2-a2b6-2ac5a74584da.jpg', 'The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc', '', 4.5, 'hot rolled', 2, '2022-05-25 11:36:18', '2022-05-25 11:36:18'),
(61, 'JSL Stainless Steel HRAP JT N1 Finish Sheets', 'American', 'Sheets', 1, 0, 2563, 'uploads/eipk58Oji-LsPq6Pf9mhA.webp', '<div style=\"color: rgb(38, 38, 38); font-family: Manrope, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><div data-v-6a97199c=\"\" class=\"overview-subtitle\" style=\"font-size: 16px; font-weight: 600; line-height: 0.88; font-stretch: normal; font-family: Manrope, sans-serif;\">Product information</div><div data-v-6a97199c=\"\" class=\"mt-3\" style=\"font-family: Manrope, sans-serif; font-size: 16px; margin-top: 1rem !important;\"><div data-v-6a97199c=\"\" class=\"packaging-info\" style=\"margin-top: 16px; font-stretch: normal; font-size: 14px; line-height: 1.71;\"><div data-v-6a97199c=\"\"><div>Produced in state-of-art facilities, Stainless Steel Hot Rolled products:</div><ul style=\"margin-top: 16px; margin-bottom: 1rem; padding-left: 24px;\"><li>have a high degree of shape &amp; profile correction</li><li>have 2B finish which is at par with international quality</li><li>have fine surface quality</li><li>are rust free and maintain their luster</li></ul><div><br></div></div></div></div></div>', '', 0, 'Hot Rolled', 2, '2022-06-01 16:55:06', '2022-06-01 16:55:06'),
(66, 'JSW Steel Wire Rod Coils IS 7887:1992 SAE1008', 'JSW Steel', 'Coils', 3, 0, 4244, 'uploads/qfQBgQQVSa5f0KnQK9eCh.webp', '<div data-v-fc6d4dc6=\"\" style=\"color: rgb(38, 38, 38); font-family: Manrope, sans-serif; font-size: 16px;\"><div data-v-6a97199c=\"\" data-v-fc6d4dc6=\"\"><div data-v-6a97199c=\"\" class=\"overview-subtitle\" style=\"font-size: 1rem; font-weight: 600; line-height: 0.88; font-stretch: normal;\">Product information</div><div data-v-6a97199c=\"\" class=\"mt-3\" style=\"margin-top: 1rem !important;\"><div data-v-6a97199c=\"\" class=\"packaging-info\" style=\"margin-top: 16px; font-stretch: normal; font-size: 14px; line-height: 1.71;\"><div data-v-6a97199c=\"\"><div>Wire rods are wound up in coils. They\'re long steel semi-finished products, made by hot rolling millets on continuous rolling mills. Its properties are</div><ul style=\"margin-top: 16px; margin-bottom: 1rem; padding-left: 24px;\"><li>Superior re-drawability, strength, and flexibility</li><li>Perfect for ropes, springs, electrodes, barbed wires, steel reinforcement for aluminium conductor and pre-stressed concrete</li><li>Also used for wire mesh, fasteners, and more</li></ul><div></div></div></div></div></div></div><div data-v-fc6d4dc6=\"\" style=\"color: rgb(38, 38, 38); font-family: Manrope, sans-serif; font-size: 16px;\"><div data-v-d8de5a48=\"\" data-v-fc6d4dc6=\"\"><div data-v-d8de5a48=\"\" class=\"overview-subtitle\" style=\"font-size: 1rem; font-weight: 600; line-height: 0.88; font-stretch: normal;\"><br></div></div></div>', '', 0, 'Cold Rolled', 2, '2022-06-01 17:38:49', '2022-06-01 17:38:49'),
(67, 'JSL Stainless Steel CRAP JT N4 PVC Finish Coils', 'Jindal Stainless', 'Coils', 6, 0, 66554, 'uploads/rh73t-KHcxJxRuZ8FMV_o.webp', '<div data-v-6a97199c=\"\" class=\"overview-subtitle\" style=\"font-size: 16px; font-weight: 600; line-height: 0.88; font-stretch: normal; color: rgb(38, 38, 38); font-family: Manrope, sans-serif; background-color: rgb(255, 255, 255);\">Product information</div><div data-v-6a97199c=\"\" class=\"mt-3\" style=\"color: rgb(38, 38, 38); font-family: Manrope, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255); margin-top: 1rem !important;\"><div data-v-6a97199c=\"\" class=\"packaging-info\" style=\"margin-top: 16px; font-stretch: normal; font-size: 14px; line-height: 1.71;\"><div data-v-6a97199c=\"\"><div>Produced in state-of-art facilities, Stainless Steel Cold Rolled products:</div><ul style=\"margin-top: 16px; margin-bottom: 1rem; padding-left: 24px;\"><li>have a high degree of shape &amp; profile correction</li><li>have 2B finish which is at par with international quality</li><li>have fine surface quality</li><li>are rust free and maintain their luster</li></ul><div><span style=\"font-weight: bolder;\">Applications</span></div><div>Medium &amp; deep drawn, drawn &amp; spun utensils. Suitable for deep drawn utensils upto 10 inch deep</div></div></div></div>', '', 0, 'Hot Rolled', 2, '2022-06-01 18:07:00', '2022-06-01 18:07:00'),
(233, 'Colis bar', 'German', 'Coils', 10, 0, 522, 'uploads/T1tC09s-eCPB4kxmp5kf7.webp', '<ul>\n<li>Thickness</li>\n</ul>\n', '* Thickness', 0, 'Cold Rolled', 2, '2022-06-05 16:33:49', '2022-06-05 16:33:49'),
(236, 'Test', 'Test', 'Coils', 5, 0, 8522, 'uploads/VPWE-OXBfNgwcD_IOXUzt.webp', '<p>Okay this</p>\n', 'Okay this', 0, 'Cold Rolled', 2, '2022-06-05 18:11:14', '2022-06-05 18:11:14'),
(237, 'New Test', 'Test', 'Coils', 1, 0, 5442, 'uploads/WvzDZZHIhDwaLpal5hZfj.webp', '<p>dsddsssd</p>\n', 'dsddsssd', 0, 'Hot Rolled', 2, '2022-06-05 18:18:26', '2022-06-05 18:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `thickness`
--

CREATE TABLE `thickness` (
  `id` int(11) NOT NULL,
  `product` int(11) DEFAULT NULL,
  `thickness` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `state` varchar(4000) NOT NULL DEFAULT 'Mumbai',
  `city` varchar(4000) NOT NULL DEFAULT 'Metroplolitan Region',
  `address` varchar(4000) NOT NULL DEFAULT 'Section 7 house 7',
  `phone` varchar(3000) NOT NULL DEFAULT '+94655467465',
  `updatedAt` date DEFAULT current_timestamp(),
  `createdAt` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `state`, `city`, `address`, `phone`, `updatedAt`, `createdAt`) VALUES
(2, 'elsalvacion2022@gmail.com', 'El salvacion', '$2a$10$u/ab9tMX0Th9W5mTRcyfeORWFwDlWnlDp2vm2PCIi9IAEVbheuJjK', 'Assam', 'Tezpur', 'Section 7 house 7', '+94655467465', '2022-06-04', '2022-06-04');

-- --------------------------------------------------------

--
-- Table structure for table `width`
--

CREATE TABLE `width` (
  `id` int(11) NOT NULL,
  `width` float DEFAULT NULL,
  `product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`title`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `length`
--
ALTER TABLE `length`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `thickness`
--
ALTER TABLE `thickness`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `width`
--
ALTER TABLE `width`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `details`
--
ALTER TABLE `details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `length`
--
ALTER TABLE `length`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT for table `thickness`
--
ALTER TABLE `thickness`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `width`
--
ALTER TABLE `width`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `details_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `length`
--
ALTER TABLE `length`
  ADD CONSTRAINT `length_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`title`) ON DELETE CASCADE;

--
-- Constraints for table `thickness`
--
ALTER TABLE `thickness`
  ADD CONSTRAINT `thickness_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `types_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`);

--
-- Constraints for table `width`
--
ALTER TABLE `width`
  ADD CONSTRAINT `width_ibfk_1` FOREIGN KEY (`product`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
