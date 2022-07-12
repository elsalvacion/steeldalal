-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: steeldalal.ce7rcuzkhovh.ap-south-1.rds.amazonaws.com    Database: steeldalal
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Aluminium',''),('Bars',''),('Coils',''),('Pipes',''),('Sheets',''),('Steel','');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facebook`
--

DROP TABLE IF EXISTS `facebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facebook` (
  `id` varchar(2000) DEFAULT NULL,
  `name` varchar(2000) DEFAULT NULL,
  `email` varchar(2000) DEFAULT NULL,
  `phone` varchar(2000) DEFAULT '+94655467465',
  `state` varchar(2000) DEFAULT 'Assam',
  `city` varchar(2000) DEFAULT 'Tezpur',
  `address` varchar(2000) DEFAULT 'Section 7 house 7	',
  `isPremium` int DEFAULT '0',
  `isVerified` int DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facebook`
--

LOCK TABLES `facebook` WRITE;
/*!40000 ALTER TABLE `facebook` DISABLE KEYS */;
INSERT INTO `facebook` VALUES ('2816372695176192','Steps Keita','','+94655467465','Assam','Tezpur','Section 7 house 7	',0,0,'2022-06-15 09:43:37','2022-06-15 09:43:37');
/*!40000 ALTER TABLE `facebook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `google`
--

DROP TABLE IF EXISTS `google`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `google` (
  `id` varchar(2000) NOT NULL,
  `name` varchar(2000) DEFAULT NULL,
  `email` varchar(2000) DEFAULT NULL,
  `phone` varchar(2000) DEFAULT '+94655467465',
  `state` varchar(2000) DEFAULT 'Assam',
  `city` varchar(2000) DEFAULT 'Tezpur',
  `address` varchar(2000) DEFAULT 'Section 7 house 7',
  `isPremium` int DEFAULT '0',
  `isVerified` int DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `google`
--

LOCK TABLES `google` WRITE;
/*!40000 ALTER TABLE `google` DISABLE KEYS */;
INSERT INTO `google` VALUES ('NhbRhKL3X','Alieu Keita','alieukeita201@gmail.com','+94655467465','Assam','Tezpur','Section 7 house 7',0,0,'2022-06-15 10:39:16','2022-06-15 10:39:16'),('DCxLI_Nur','STEPS KEITA','stepskeita@gmail.com','+94655467465','Assam','Tezpur','Section 7 house 7',0,0,'2022-06-26 07:30:23','2022-06-26 07:30:23'),('bgem6t3po','El Salvacion','elsalvacion2022@gmail.com','+94655467465','Assam','Tezpur','Section 7 house 7',0,0,'2022-07-03 23:55:21','2022-07-03 23:55:21'),('OgB2FSlDU','Alieu Keita 180041256','alieukeita@iut-dhaka.edu','+94655467465','Assam','Tezpur','Section 7 house 7',0,0,'2022-07-03 23:59:02','2022-07-03 23:59:02'),('5g3zAbCtj','Gokulnath Nallaiya','gokulaps1998@gmail.com','+94655467465','Assam','Tezpur','Section 7 house 7',0,0,'2022-07-09 06:59:45','2022-07-09 06:59:45');
/*!40000 ALTER TABLE `google` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product` int NOT NULL,
  `image` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (7,61,'uploads/eipk58Oji-LsPq6Pf9mhA.webp'),(8,61,'uploads/DuAK7QMzHvOOZQq57a2Nf.webp'),(9,61,'uploads/grb4YNJUkT-1DYosGAmU5.webp'),(10,61,'uploads/rn0zSqobvt3lNilGlKu0L.webp'),(19,66,'uploads/qfQBgQQVSa5f0KnQK9eCh.webp'),(20,66,'uploads/T64XQHOEp3LT-IQCMpGJh.webp'),(21,67,'uploads/rh73t-KHcxJxRuZ8FMV_o.webp'),(22,67,'uploads/rH73jMBypn4Rb_pPU7wUp.webp'),(35,233,'uploads/T1tC09s-eCPB4kxmp5kf7.webp'),(36,233,'uploads/hnKppj-GEG8yfsxjsfAbm.webp'),(45,237,'uploads/WvzDZZHIhDwaLpal5hZfj.webp'),(46,237,'uploads/kfW22qgk1pvwqplBvE-P0.webp'),(57,243,'uploads/DyF-MqBJ4J5kF7nfeWOUJ.webp'),(58,243,'uploads/SVVWkhMqqIf9Lt_CdqNIQ.webp'),(59,244,'uploads/YsKmmbbkqBR-IQbg2uQNE.webp'),(60,244,'uploads/rRz3dBYSPOdDx9hcvtLVR.webp'),(61,244,'uploads/2b1ZLwKH3Ze9VOtpJwKQO.webp'),(62,244,'uploads/CpWIBzBgowOJh9NNC7RXB.webp'),(63,245,'uploads/OsZG_wCrKgxNXWE5o7Nut.webp'),(64,245,'uploads/4f0Ezr9XATYpjRq2PFNna.webp'),(65,246,'uploads/8pKtj40gMPoaQmIM6Qacb.webp'),(66,246,'uploads/cmtIGEPbdH4nkh4Vz8hca.webp'),(67,247,'uploads/_b-9cJ6Vd70h_dFIdn7xV.jpeg'),(68,247,'uploads/LPToODl2w76ycWkfXR4zx.jpeg'),(69,247,'uploads/IMtL7i3fNigWp7b59CL3Y.jpeg'),(70,248,'uploads/_b-9cJ6Vd70h_dFIdn7xV.jpeg'),(71,248,'uploads/LPToODl2w76ycWkfXR4zx.jpeg'),(72,248,'uploads/IMtL7i3fNigWp7b59CL3Y.jpeg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `from_who` varchar(255) DEFAULT NULL,
  `to_who` varchar(255) DEFAULT NULL,
  `product` int DEFAULT NULL,
  `isRead` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (171,'Hello','3','2',10,1,'2022-06-11 17:09:22'),(172,'Hey','2','3',10,1,'2022-06-11 17:24:25'),(173,'Yes','3','2',10,1,'2022-06-11 17:24:30'),(174,'Okay','2','3',10,1,'2022-06-11 17:55:10'),(175,'How much is product','3','2',10,1,'2022-06-11 18:31:40'),(176,'2 rupees','2','3',10,1,'2022-06-11 18:32:04'),(177,'nagotiable','2','3',10,1,'2022-06-11 18:32:33'),(178,'haah','3','2',10,1,'2022-06-13 19:15:03'),(179,'I just told her','3','2',10,1,'2022-06-13 19:15:12'),(180,'what did u tell her','2','3',10,1,'2022-06-13 19:15:25'),(181,'I like it loose','3','2',10,1,'2022-06-13 19:23:40'),(182,'y','3','2',10,1,'2022-06-14 07:48:47'),(183,'just felt like it','2','3',10,1,'2022-06-14 07:48:59'),(184,'U savage','3','2',10,1,'2022-06-14 07:49:11'),(185,'Hey','4','2',10,1,'2022-06-15 15:42:14'),(186,'Discount','4','2',10,1,'2022-06-15 16:27:12'),(187,'50%','2','4',10,1,'2022-06-15 16:27:22'),(188,'Nice lets make a deal','4','2',10,1,'2022-06-16 05:00:54'),(189,'Hey','3','2',12,1,'2022-06-19 16:24:10'),(190,'Hahah','2','3',12,1,'2022-06-19 16:24:24'),(191,'hey','4','2',12,1,'2022-06-22 16:48:06'),(192,'what','2','4',10,1,'2022-06-22 16:51:12'),(193,'hah','4','2',10,1,'2022-06-22 16:52:08'),(194,'Hey','2',NULL,10,0,'2022-06-24 22:06:02'),(195,'Hahah','2',NULL,10,0,'2022-06-24 22:07:52'),(196,'Hey','2',NULL,10,0,'2022-06-24 22:09:55'),(197,'Hey','4','2',9,1,'2022-06-24 22:10:19'),(198,'Yow','2',NULL,12,0,'2022-06-24 22:26:37'),(199,'Hey','4',NULL,10,0,'2022-06-24 22:27:03'),(200,'What','2',NULL,9,0,'2022-06-24 22:27:16'),(201,'Work','2',NULL,9,0,'2022-06-24 22:29:24'),(202,'yow','2','4',9,1,'2022-06-25 06:55:51'),(203,'I justed need to sleep to make it work','4','2',9,1,'2022-06-25 06:56:17'),(204,'hey','4','2',9,1,'2022-06-25 07:03:01'),(205,'hahah','2','4',9,1,'2022-06-25 07:04:06'),(206,'nice','4','2',9,1,'2022-06-25 07:07:45'),(207,'okay','2','4',9,1,'2022-06-25 07:08:15'),(208,'thanks','4','2',9,1,'2022-06-25 07:10:34'),(209,'lets see','2','4',9,1,'2022-06-25 08:10:51'),(210,'try again','4','2',9,1,'2022-06-25 08:11:38'),(211,'haha','4','2',9,1,'2022-06-25 08:12:13'),(212,'chill','2','4',9,1,'2022-06-25 08:12:20'),(213,'I am chill','4','2',9,1,'2022-06-25 12:04:39'),(214,'Hey','NhbRhKL3X','2',9,1,'2022-06-26 06:23:50'),(215,'yow','NhbRhKL3X','2',2,1,'2022-06-26 06:48:58'),(216,'whats up','2','NhbRhKL3X',2,1,'2022-06-26 07:08:40'),(217,'am good man','NhbRhKL3X','2',2,1,'2022-06-26 07:09:05'),(218,'nice it working','2','NhbRhKL3X',2,1,'2022-06-26 07:16:44'),(219,'Hey','DCxLI_Nur','2',10,1,'2022-06-26 07:30:53'),(220,'Yow','2','DCxLI_Nur',10,1,'2022-06-26 07:31:02'),(221,'whats up','DCxLI_Nur','2',10,1,'2022-06-27 05:52:47'),(222,'haha','2','DCxLI_Nur',10,1,'2022-06-27 05:52:58'),(223,'hey','3','2',12,1,'2022-07-02 19:09:45'),(224,'my man','2','3',12,1,'2022-07-02 19:10:53'),(225,'what\'s up','3','2',12,1,'2022-07-02 19:11:07'),(226,'haha','3','2',12,1,'2022-07-02 19:17:51'),(227,'u know u are not funny right','2','3',12,0,'2022-07-05 14:55:31'),(228,'hey how much','XxXDoh','2',9,1,'2022-07-06 18:51:50'),(229,'Am good and you','2','XxXDoh',9,1,'2022-07-06 18:58:21'),(230,'tes','XxXDoh','2',9,1,'2022-07-06 18:58:29'),(231,'okay','2','XxXDoh',9,1,'2022-07-06 18:58:50'),(232,'go to hell','XxXDoh','2',9,1,'2022-07-06 18:59:02'),(233,'hi','OXm_h6','2',3,1,'2022-07-07 17:51:16'),(234,'Hello there aish','2','OXm_h6',3,1,'2022-07-08 11:13:18'),(235,'you are testing the system nice','2','OXm_h6',3,1,'2022-07-08 11:13:29'),(236,'Do you want to buy the Stainless steel plate','2','OXm_h6',3,1,'2022-07-08 11:16:46'),(237,'How much is this product','2','OXm_h6',248,1,'2022-07-09 20:26:07'),(238,'There are no specs','2','OXm_h6',248,1,'2022-07-09 20:26:15'),(239,'i want to buy','OXm_h6','2',3,1,'2022-07-10 19:00:21');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderPay`
--

DROP TABLE IF EXISTS `orderPay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderPay` (
  `payerId` varchar(2000) DEFAULT NULL,
  `phoneNumber` varchar(2000) DEFAULT NULL,
  `name` varchar(2000) DEFAULT NULL,
  `email` varchar(2000) DEFAULT NULL,
  `address` varchar(2000) DEFAULT NULL,
  `postalCode` varchar(2000) DEFAULT NULL,
  `status` varchar(2000) DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `orderId` int DEFAULT NULL,
  KEY `orderId` (`orderId`),
  CONSTRAINT `orderPay_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderPay`
--

LOCK TABLES `orderPay` WRITE;
/*!40000 ALTER TABLE `orderPay` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderPay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderSpecs`
--

DROP TABLE IF EXISTS `orderSpecs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderSpecs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thickness` float DEFAULT NULL,
  `t_uom` varchar(255) DEFAULT NULL,
  `width` float DEFAULT NULL,
  `w_uom` varchar(255) DEFAULT NULL,
  `height` float DEFAULT NULL,
  `h_uom` varchar(255) DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `qty` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `orderSpecs_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderSpecs`
--

LOCK TABLES `orderSpecs` WRITE;
/*!40000 ALTER TABLE `orderSpecs` DISABLE KEYS */;
INSERT INTO `orderSpecs` VALUES (1,654,'m',665,'m',0,'m',7,'16',0),(2,4,'m',34,'m',0,'m',7,'24',0),(3,35,'m',50,'m',0,'m',7,'243',0),(4,75,'m',97,'m',0,'m',7,'243',0),(5,654,'m',665,'m',0,'m',8,'16',0),(6,4,'m',34,'m',0,'m',8,'24',0),(7,35,'m',50,'m',0,'m',8,'243',0),(8,75,'m',97,'m',0,'m',8,'243',0),(9,65,'m',654,'m',0,'m',9,'2',0),(10,35,'m',50,'m',0,'m',10,'243',0),(11,75,'m',97,'m',0,'m',10,'243',0),(12,65,'m',654,'m',0,'m',11,'2',0),(13,98,'m',654,'m',0,'m',12,'3',0);
/*!40000 ALTER TABLE `orderSpecs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalPrice` float DEFAULT NULL,
  `shippingPrice` float DEFAULT NULL,
  `state` varchar(2000) DEFAULT NULL,
  `city` varchar(2000) DEFAULT NULL,
  `address` varchar(2000) DEFAULT NULL,
  `name` varchar(2000) NOT NULL,
  `phone` varchar(2000) NOT NULL,
  `email` varchar(2000) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `isPaid` int NOT NULL DEFAULT '0',
  `isDelivered` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (7,9721390,200,'Assam','Tezpur','Section 7 house 7','New user','+94655467465','test@gmail.com','3',0,0),(8,9721390,200,'Assam','Tezpur','Section 7 house 7','New user','+94655467465','test@gmail.com','3',0,0),(9,6565,200,'Delhi','Delhi','Section 7 house 7','El salvacion','+94655467465','elsalvacion2022@gmail.com','2',0,0),(10,19388300,200,'Assam','Tezpur','Section 7 house 7','El salvacion','+94655467465','elsalvacion2022@gmail.com','2',0,0),(11,6565,200,'Assam','Tezpur','Section 7 house 7','Gokulnath Nallaiya','+94655467465','gokulaps1998@gmail.com','5g3zAbCtj',0,0),(12,226275,200,'Uttar Pradesh','Allahabad','Section 7 house 7','aishwary','Section 7 house ','aishwary.tandon1@gmail.com','OXm_h6',0,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSpecs`
--

DROP TABLE IF EXISTS `productSpecs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productSpecs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thickness` float DEFAULT NULL,
  `t_uom` varchar(255) DEFAULT NULL,
  `width` float DEFAULT NULL,
  `w_uom` varchar(255) DEFAULT NULL,
  `height` float DEFAULT NULL,
  `h_uom` varchar(255) DEFAULT NULL,
  `product` int DEFAULT NULL,
  `qty` int NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSpecs`
--

LOCK TABLES `productSpecs` WRITE;
/*!40000 ALTER TABLE `productSpecs` DISABLE KEYS */;
INSERT INTO `productSpecs` VALUES (1,35,'m',50,'m',0,'m',243,23,54511),(3,75,'m',97,'m',0,'m',243,54,9666880),(4,35,'m',12,'m',0,'m',237,6,36543),(5,33,'m',5665,'m',0,'m',50,32,36565),(6,656,'m',65,'m',0,'m',50,32,3565),(7,5,'m',68,'m',0,'m',49,6,86868),(8,98,'m',65,'m',0,'m',48,8,657687),(9,3,'m',68,'m',0,'m',47,5,66898),(10,154,'m',54,'m',0,'m',46,21,41),(11,98,'m',68,'m',0,'m',44,5,98654),(12,987,'m',987,'m',0,'m',42,64,64987),(13,324,'m',465,'m',0,'m',41,321,65463),(14,23,'m',32,'m',0,'m',40,654,6565),(15,321,'m',3211,'m',0,'m',39,321,3321650),(16,3,'m',35,'m',0,'m',38,35,565),(17,35,'m',3521,'m',0,'m',37,332,3),(18,35,'m',654,'m',0,'m',36,65,65),(19,65,'m',6532,'m',0,'m',35,65,65465),(20,532,'m',3212,'m',0,'m',34,32,3565),(21,321,'m',21,'m',0,'m',33,1,1321),(22,33,'m',32,'m',0,'m',31,321,321654),(23,335,'m',4,'m',0,'m',29,32,323),(24,24,'m',21,'m',0,'m',28,21,4),(25,65,'m',31,'m',0,'m',26,8,6865),(26,65,'m',4132,'m',0,'m',25,12,65),(27,4,'m',34,'m',0,'m',24,34,321413),(28,65,'m',34,'m',0,'m',23,34,64),(29,65,'m',98,'m',0,'m',22,6,6535),(30,34,'m',354,'m',0,'m',21,3,34),(31,35,'m',32,'m',0,'m',20,321,3232),(32,6,'m',65,'m',0,'m',19,65,4654),(33,6321,'m',54,'m',0,'m',18,64,4424),(34,657,'m',68,'m',0,'m',17,654,65465),(35,654,'m',665,'m',0,'m',16,654,653532),(36,65,'m',35,'m',0,'m',14,32,65),(37,64,'m',65,'m',0,'m',12,33,5447),(38,65,'m',68,'m',0,'m',11,65,6565),(39,987,'m',9856,'m',0,'m',10,654,656565),(40,654,'m',654,'m',0,'m',9,54,54),(41,68,'m',856,'m',0,'m',7,654,686),(42,654,'m',65,'m',0,'m',5,654,6565),(43,98,'m',654,'m',0,'m',3,654,6465),(44,65,'m',654,'m',0,'m',2,6565,6565),(45,65,'m',65,'m',0,'m',61,8,34321),(46,35,'m',35,'m',0,'m',66,32,65463),(47,68,'m',68,'m',0,'m',67,34,6565),(48,35,'m',35,'m',0,'m',233,65,66568),(49,65,'m',987,'m',0,'m',244,5,746477),(50,25,'m',25,'m',0,'m',245,25,25),(51,25,'m',25,'m',0,'m',246,2,8565);
/*!40000 ALTER TABLE `productSpecs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(10000) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(3000) NOT NULL,
  `details` longtext NOT NULL,
  `detailsText` longtext,
  `rating` float NOT NULL,
  `type` varchar(255) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`title`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'aisi 304 Stainless steel plate','Hot rolled','Steel',3,7,149.99,'https://www.sddlmetal.com/UpLoadFile/20220412/c446a26c-0576-47aa-a133-5bd511a7d6a2.jpg','<p>Delong Metal is group company in the steel manufacture &amp; Trading, founded in the 2000s, 800+ staff, 25, 000+ m2 non-dust workshop, 40+ great large mills and cooperation partners in China, 4000, 000+ MT production per year under ISO management, 40, 000+customers in domestic and overseas market, 10 billion USD of annual turnover, 15+ subsidiary companies all over China, ranking the Top 100 private enterprises in China, 1 hour reach Shanghai/Tianjin /Guangzhou Port, we keep high quality, competitive price, thousands tons of stock, most efficient delivery and reliable cooperation for global valued customers.</p>','',0,'Cold Rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(3,'Stainless Steel Plate','German','Steel',3,20,129.99,'https://www.sddlmetal.com/UpLoadFile/20201130/9baccf04-7c84-4664-9ec6-bd9fe0c0b497.jpg','<p>Delong Metal is group company in the steel manufacture &amp; Trading, founded in the 2000s, 800+ staff, 25, 000+ m2 non-dust workshop, 40+ great large mills and cooperation partners in China, 4000, 000+ MT production per year under ISO management, 40, 000+customers in domestic and overseas market, 10 billion USD of annual turnover, 15+ subsidiary companies all over China, ranking the Top 100 private enterprises in China, 1 hour reach Shanghai/Tianjin /Guangzhou Port, we keep high quality, competitive price, thousands tons of stock, most efficient delivery and reliable cooperation for global valued customers. We have been engaging industry steel for over 20 years, best service and the most competitive price is one of our greatest advantages that make us today!</p>','',2.5,'Cold rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(5,'Stainless Steel Rod','German','Steel',3,20,129.99,'https://www.sddlmetal.com/UpLoadFile/20201201/a5b86298-2b4f-4da6-a3e6-58d271d50b77.jpg','<p>Main products: seamless steel pipe, round steel, welded pipes, spiral pipes, galvanized pipe, alloy pipes, stainless steel, threaded steel, angle grooves, aluminum plates, U-shaped steel and other dozens of products, hundreds of steel grade materials.</p>','',2.5,'Cold rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(7,'Stainless Steel Tube','German','Steel',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/9b6d2f76-48ab-4e84-ac97-488efa067869.jpg','<p>Main products: seamless steel pipe, round steel, welded pipes, spiral pipes, galvanized pipe, alloy pipes, stainless steel, threaded steel, angle grooves, aluminum plates, U-shaped steel and other dozens of products, hundreds of steel grade materials.</p>','',4.5,'Cold rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(9,'Aluminum Block','English','Aluminium',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/48835dee-31f0-49ba-bd76-f9a1a50edcba.jpg','<p>aluminum block 6061 T6 alloy price. High weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(10,'Aluminum Rod','English','Aluminium',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/89cfc634-6c03-48f1-a02e-b4f9462e4b59.jpg','<p>aluminum block 6061 T6 alloy price. High weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(11,'Aluminum Sheet','English','Aluminium',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/1428e048-bb89-482c-957b-ccf48f6f4c95.jpg','<p>aluminum block 6061 T6 alloy price. High weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(12,'Aluminum Tube','English','Aluminium',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/cd36c206-7fdf-4fd6-9b8d-a5fbf4a2397e.jpg','<p>aluminum block 6061 T6 alloy price. High weather resistance anti scratch anticorrosion and good weather resistance subtle edges and elegant appearance and easy processing and installation high brightness and hardness. So it is widely used in aluminum window, door, curtain wall, hand railing, normal aluminum profile, decorative and industrial aluminum profile etc.</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(14,'ASTM a36 ar500 ss400 sa516 hardox 500 450 carbon steel plate/sheet wear resistant steel mild steel','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220330/683200b6-e75d-4f9a-9771-b7c2d4b086ac.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(16,'Galvanized Steel Sheet/plate gi sheet','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220411/b11c5d34-182b-414f-8fcc-48b32a8feaec.jpeg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(17,'ppgi roofing sheet','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220505/1a9ec5c1-d49f-4052-8617-0e65f387c514.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(18,'Spring Steel Plate En42j SAE Strip 1095 Carbon Alloy Steel Sheet','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220513/f34b6b73-00cc-45d7-b6f5-de35d5b2b709.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(19,'Perforated Steel Plate Sheet Galvanized Punched Aluminum/Stainless/Carbon/Copper Panel','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220429/541f3fed-abe3-4aaf-aa25-7617bb59081f.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(20,'Cold rolled low carbon and ultra-low carbon steel plate','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220427/db314fd9-538a-4bd5-bcbc-e65ef96a24e2.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(21,'304 316 430 410 440c Stainless Steel Plate/sheet ss plate','English','Sheets',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220411/2bff3fc8-5a2c-4887-ba3f-c7b188f9c1fc.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(22,'Rebar Steel HRB400 HRB500 HRB235 HRB355 ASTM a36 a516 a572 a514 a588 a285 ss400','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220420/2992041a-21ca-4048-8874-7bdf0d71111a.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(23,'Round Bar Steel ASTM a36 a516 a572 a514 a588 a285 ss400','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210524/ac2d3296-225b-433f-a6ed-244d86aebfcd.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(24,'Rebar','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201130/dd7674c6-845c-4791-82f5-827ed6fbb6b7.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(25,'Round Steel','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201130/6eded182-814c-417f-a599-88d8b27abe5c.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(26,'Flat Bar Steel','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210524/f5359729-51b6-4159-ba74-085cacdb45a0.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(28,'Angle Steel','English','Bars',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210525/a872743b-c502-4864-8b64-1ca6009204b3.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(29,'Steel Coil','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210528/bdf0fb6d-6a59-42ba-a254-f91192e36005.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(31,'PPGI & PPGL steel coil','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210115/8543eede-9037-44c2-93e7-1eaa4b01cd62.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(33,'Galvalume Steel Coil & Sheet','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210115/84bba84a-39c0-42a5-a8c3-8d834c462ffe.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(34,'Coated Steel Coil','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210521/f58d2d20-5dee-4868-8591-b74c6c555fef.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(35,'Cold-rolled steel coil','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210115/114fe09f-1ff0-4fbb-8c89-0595aa4b350b.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(36,'Hot Rolled Steel Coil','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210115/3e882055-8bbb-4995-981b-75e091cc4957.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(37,'Hot Dipped Galvanized Steel Coils','English','Coils',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210115/61444543-681e-4aa9-8913-d175a70a90e5.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(38,'Carbon Steel Pipe sch 40 pipe steel and tube','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201125/846ccd78-f213-415b-9fe9-952f54df6ad9.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(39,'Seamless Steel Pipe metal pipe tube supplier','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201125/a4f22cad-f454-4cb4-bee2-a77aafed4e61.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(40,'sus 316l 304 Stainless Steel Pipe ss tube sst tubing','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201125/35d82653-f190-48fb-8bf1-16029a1bb5a2.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(41,'ERW Steel Pipe rolled tube welded pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220324/c22e192b-fd97-46dc-9786-0033f92f7476.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(42,'black pipe steel and pipe metal pipe seamless pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20220324/8379de27-8151-4914-82f9-fd5ba3bf5575.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(44,'SSAW Steel Pipe Carbon steel pipe welded pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201127/daa69e67-4a97-43c1-a873-24367123e84f.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(46,'Galvanized Steel Pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201127/49fc00c5-2352-47bb-b0fd-b53ed6a41b7a.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(47,'Coated Steel Pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201127/12ea160f-49ef-410f-99ed-251ed224fa08.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(48,'Hollow Section','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20201201/cec31665-fc36-4787-be2f-f9046d3154b7.png','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(49,'Coated Steel Pipe','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210521/067bd307-9e59-44a9-9022-55b3a22e1065.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(50,'STEEL PIPE','English','Pipes',3,50,109.99,'https://www.sddlmetal.com/UpLoadFile/20210520/28486008-9b76-40f2-a2b6-2ac5a74584da.jpg','<p>The steel grade of our products have carbon structural steel, carbon tool steel, carbon spring steel, stainless steel, heat-resistant steel, wear-resistant steel, alloy spring steel, alloy structural steel, bearing steel, alloy tool steel, high alloy tool steel, high-speed tool steel, high temperature alloys, electrical alloy, precision alloy, low temperature steel, electrical steel, ductile iron, grey cast iron, etc.We can provide professional steel, such as bridge steel, ship steel, boiler steel, pressure vessel steel, agricultural machinery steel, etc</p>','',4.5,'hot rolled','2','2022-05-25 11:36:18','2022-05-25 11:36:18'),(61,'JSL Stainless Steel HRAP JT N1 Finish Sheets','American','Sheets',1,0,2563,'uploads/eipk58Oji-LsPq6Pf9mhA.webp','<p>Product information</p><p><br></p><p>Produced in state-of-art facilities, Stainless Steel Hot Rolled products:</p><p><br></p><ul><li>have a high degree of shape &amp; profile correction</li><li>have 2B finish which is at par with international quality</li><li>have fine surface quality</li><li>are rust free and maintain their luster</li></ul>','',0,'Hot Rolled','2','2022-06-01 16:55:06','2022-06-01 16:55:06'),(66,'JSW Steel Wire Rod Coils IS 7887:1992 SAE1008','JSW Steel','Coils',3,0,4244,'uploads/qfQBgQQVSa5f0KnQK9eCh.webp','<p>Product information</p><p><br></p><p>Wire rods are wound up in coils. They\'re long steel semi-finished products, made by hot rolling millets on continuous rolling mills. Its properties are</p><p><br></p><ul><li>Superior re-drawability, strength, and flexibility</li><li>Perfect for ropes, springs, electrodes, barbed wires, steel reinforcement for aluminium conductor and pre-stressed concrete</li><li>Also used for wire mesh, fasteners, and more</li></ul>','',0,'Cold Rolled','2','2022-06-01 17:38:49','2022-06-01 17:38:49'),(67,'JSL Stainless Steel CRAP JT N4 PVC Finish Coils','Jindal Stainless','Coils',6,0,66554,'uploads/rh73t-KHcxJxRuZ8FMV_o.webp','<p>Product information</p><p><br></p><p>Produced in state-of-art facilities, Stainless Steel Cold Rolled products:</p><p><br></p><ul><li>have a high degree of shape &amp; profile correction</li><li>have 2B finish which is at par with international quality</li><li>have fine surface quality</li><li>are rust free and maintain their luster</li></ul><p><strong>Applications</strong></p><p>Medium &amp; deep drawn, drawn &amp; spun utensils. Suitable for deep drawn utensils upto 10 inch deep</p>','',0,'Hot Rolled','2','2022-06-01 18:07:00','2022-06-01 18:07:00'),(233,'Colis bar','German','Coils',10,0,522,'uploads/T1tC09s-eCPB4kxmp5kf7.webp','<ul><li>Thickness</li></ul>','',0,'Cold Rolled','2','2022-06-05 16:33:49','2022-06-05 16:33:49'),(237,'Hot Rolled Coil','Test','Coils',1,0,5442,'uploads/WvzDZZHIhDwaLpal5hZfj.webp','<p>dsddsssd</p>','',0,'Hot Rolled','2','2022-06-05 18:18:26','2022-06-05 18:18:26'),(243,'Hot & Cold Rolled Coil','JSW','Coils',1,0,0,'uploads/DyF-MqBJ4J5kF7nfeWOUJ.webp','<p>Used for</p><ol><li>Construction</li><li>Welding</li><li>Etc</li></ol><p><br></p><p>Materials</p><ul><li>Stainless steel</li><li>Iron</li><li>Alumniium</li></ul>','',0,'Cold Rolled','2','2022-06-18 17:43:03','2022-06-18 17:43:03'),(244,'Hot Rolled Coil','JSW','Coils',1,0,0,'uploads/YsKmmbbkqBR-IQbg2uQNE.webp','<p>Used for</p><ol><li>Construction</li><li>etc</li></ol>','',0,'Hot Rolled','NhbRhKL3X','2022-06-26 06:05:43','2022-06-26 06:05:43'),(245,'Test','JSW','Coils',1,0,0,'uploads/OsZG_wCrKgxNXWE5o7Nut.webp','<p>sasda</p>','',0,'Cold Rolled','3','2022-07-02 19:09:22','2022-07-02 19:09:22'),(247,'TMT ','SAIL','Bars',1,0,0,'uploads/_b-9cJ6Vd70h_dFIdn7xV.jpeg','','',0,'Hot Rolled','OXm_h6','2022-07-07 17:50:32','2022-07-07 17:50:32'),(248,'TMT ','SAIL','Bars',1,0,0,'uploads/_b-9cJ6Vd70h_dFIdn7xV.jpeg','<p>fe 500</p>','',0,'Hot Rolled','OXm_h6','2022-07-07 17:50:48','2022-07-07 17:50:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `state` varchar(4000) NOT NULL DEFAULT 'Assam',
  `city` varchar(4000) NOT NULL DEFAULT 'Tezpur',
  `address` varchar(4000) NOT NULL DEFAULT 'Section 7 house 7',
  `phone` varchar(3000) NOT NULL DEFAULT '+94655467465',
  `isPremium` int NOT NULL DEFAULT '0',
  `isVerified` int NOT NULL DEFAULT '0',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2','elsalvacion2022@gmail.com','El salvacion','$2a$10$u/ab9tMX0Th9W5mTRcyfeORWFwDlWnlDp2vm2PCIi9IAEVbheuJjK','Chhattisgarh','Bhilai Nagar','Section 7 house 7','+94655467465',0,0,'2022-06-03 18:30:00','2022-06-03 18:30:00'),('3','test@gmail.com','New user','$2a$10$XYKdO5FRXnaGfYDNNsmtLuBmWtJ544L1xc7m.rOKJ6yfEtMBqw1D.','Assam','Tezpur','Section 7 house 7','+94655467465',0,0,'2022-06-07 18:30:00','2022-06-07 18:30:00'),('4','qazi@gmail.com','Qzi','$2a$10$VDvFjxnobkDOfjr.9j/wY.mlrmqajnG6qWj9.d0VRaSBfSyV.rJXq','Assam','Tezpur','Section 7 house 7','+94655467465',0,0,'2022-06-09 18:30:00','2022-06-09 18:30:00'),('OXm_h6','aishwary.tandon1@gmail.com','aishwary','$2a$10$ZiD7VAkTdaSj8I0rkwca7u92Up73XYGbkXjuZFHAYa.oOxlqd/i2.','Uttar Pradesh','Allahabad','Section 7 house 7','Section 7 house ',0,0,'2022-07-07 13:34:23','2022-07-07 13:34:23'),('rYj9w2','kskdirectoroffice@gmail.com','Ssssss','$2a$10$t/cGMkAQFcULmiKzrhfjLu3dN0HNWMaRiFPzJks1T4C3gpg0bvFn2','Assam','Tezpur','Section 7 house 7','+94655467465',0,0,'2022-07-07 18:07:03','2022-07-07 18:07:03'),('XxXDoh','new@gmail.com','New','$2a$10$XIE4MfXR8por8vqaH1AXpe2Jw1Ly14ddFNTcQcEteG54GqFGKhpEm','Assam','Tezpur','Section 7 house 7','+94655467465',0,0,'2022-07-06 18:50:31','2022-07-06 18:50:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yourBiz`
--

DROP TABLE IF EXISTS `yourBiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yourBiz` (
  `gstCertificate` varchar(3000) DEFAULT NULL,
  `panCard` varchar(3000) DEFAULT NULL,
  `aadharCard` varchar(3000) DEFAULT NULL,
  `cancelledCheque` varchar(3000) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yourBiz`
--

LOCK TABLES `yourBiz` WRITE;
/*!40000 ALTER TABLE `yourBiz` DISABLE KEYS */;
INSERT INTO `yourBiz` VALUES ('uploads/gstCertificate-2.webp','uploads/panCard-2.png','uploads/aadharCard-2.webp','uploads/cancelledCheque-2.webp','2'),('uploads/gstCertificate-3.webp','uploads/panCard-3.webp','uploads/aadharCard-3.webp','uploads/cancelledCheque-3.png','3'),('uploads/gstCertificate-XxXDoh.webp','uploads/panCard-XxXDoh.jpeg','uploads/aadharCard-XxXDoh.webp','uploads/cancelledCheque-XxXDoh.webp','XxXDoh'),('uploads/gstCertificate-OXm_h6.jpeg','uploads/panCard-OXm_h6.jpeg','uploads/aadharCard-OXm_h6.jpeg','uploads/cancelledCheque-OXm_h6.jpeg','OXm_h6');
/*!40000 ALTER TABLE `yourBiz` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-12 22:15:10
