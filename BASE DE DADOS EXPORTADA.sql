CREATE DATABASE  IF NOT EXISTS `recrutamento_cfm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `recrutamento_cfm`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: recrutamento_cfm
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidade` (
  `idCidade` int NOT NULL AUTO_INCREMENT,
  `idProvincia` int NOT NULL,
  `nomeCidade` varchar(45) DEFAULT NULL,
  `data_criada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCidade`),
  UNIQUE KEY `nomeCidade_UNIQUE` (`nomeCidade`),
  KEY `fk_cidade_provincia1_idx` (`idProvincia`),
  CONSTRAINT `fk_cidade_provincia1` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`idProvincia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade` VALUES (1,1,'Beira','2025-04-09 13:07:27');
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `idProvincia` int NOT NULL AUTO_INCREMENT,
  `idRegiao` int NOT NULL,
  `nomeProvincia` varchar(45) DEFAULT NULL,
  `data_criada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idProvincia`),
  KEY `fk_provincia_pais1_idx` (`idRegiao`),
  CONSTRAINT `fk_provincia_pais1` FOREIGN KEY (`idRegiao`) REFERENCES `regiao` (`idRegiao`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,1,'Sofala','2025-04-09 13:07:01');
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regiao`
--

DROP TABLE IF EXISTS `regiao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regiao` (
  `idRegiao` int NOT NULL AUTO_INCREMENT,
  `nomeRegiao` varchar(45) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `data_criada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRegiao`),
  UNIQUE KEY `pais_UNIQUE` (`nomeRegiao`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regiao`
--

LOCK TABLES `regiao` WRITE;
/*!40000 ALTER TABLE `regiao` DISABLE KEYS */;
INSERT INTO `regiao` VALUES (1,'Centro',1,'2025-04-09 12:51:39'),(3,'Norte',1,'2025-04-09 13:03:37');
/*!40000 ALTER TABLE `regiao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_alteracao`
--

DROP TABLE IF EXISTS `tb_alteracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_alteracao` (
  `id_alteracao` int NOT NULL AUTO_INCREMENT,
  `dataModificada` datetime DEFAULT CURRENT_TIMESTAMP,
  `senha` text,
  `tb_idUsuario` bigint NOT NULL,
  PRIMARY KEY (`id_alteracao`),
  KEY `fk_tb_recuperacao_tb_usuario1_idx` (`tb_idUsuario`),
  CONSTRAINT `fk_tb_recuperacao_tb_usuario10` FOREIGN KEY (`tb_idUsuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_alteracao`
--

LOCK TABLES `tb_alteracao` WRITE;
/*!40000 ALTER TABLE `tb_alteracao` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_alteracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_avaliacao`
--

DROP TABLE IF EXISTS `tb_avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_avaliacao` (
  `idAvaliacao` int NOT NULL AUTO_INCREMENT,
  `classificacao` varchar(45) DEFAULT 'Nao definido',
  `descricao` text,
  `dataAdd` datetime DEFAULT NULL,
  `tb_relatorios_id_Relatorio` int NOT NULL,
  `tb_avaliacaocol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idAvaliacao`,`tb_relatorios_id_Relatorio`),
  KEY `fk_tb_avaliacao_tb_relatorios1_idx` (`tb_relatorios_id_Relatorio`),
  CONSTRAINT `fk_tb_avaliacao_tb_relatorios1` FOREIGN KEY (`tb_relatorios_id_Relatorio`) REFERENCES `tb_relatorios` (`id_Relatorio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_avaliacao`
--

LOCK TABLES `tb_avaliacao` WRITE;
/*!40000 ALTER TABLE `tb_avaliacao` DISABLE KEYS */;
INSERT INTO `tb_avaliacao` VALUES (1,'Aprovado','Avaliação excelente do relatório.','2025-04-09 14:02:37',1,NULL),(2,'Aprovado','Avaliação excelente do relatório.','2025-04-09 14:03:27',3,NULL),(3,'Aprovado','Avaliação excelente do relatório.','2025-04-09 14:03:32',1,NULL),(4,'Aprovado','Avaliação excelente do relatório.','2025-04-09 14:04:24',1,NULL),(5,'Aprovado','Relatório muito bem elaborado, todos os pontos foram atendidos.','2025-04-09 14:05:28',1,NULL),(6,'Aprovado','Relatório muito bem elaborado, todos os pontos foram atendidos.','2025-04-09 14:06:39',1,NULL);
/*!40000 ALTER TABLE `tb_avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_candidato`
--

DROP TABLE IF EXISTS `tb_candidato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_candidato` (
  `tb_usuario_id_usuario` bigint NOT NULL,
  `area` varchar(500) DEFAULT NULL,
  `estado` enum('Aprovado','Reprovado','Pendente') DEFAULT 'Pendente',
  `eliminado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`tb_usuario_id_usuario`),
  CONSTRAINT `fk_tb_candidato_tb_usuario` FOREIGN KEY (`tb_usuario_id_usuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_candidato`
--

LOCK TABLES `tb_candidato` WRITE;
/*!40000 ALTER TABLE `tb_candidato` DISABLE KEYS */;
INSERT INTO `tb_candidato` VALUES (7,'Eng Mecanica','Pendente',0),(21,'TI','Pendente',0),(16031,'Eng Civil','Pendente',0);
/*!40000 ALTER TABLE `tb_candidato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_codigo`
--

DROP TABLE IF EXISTS `tb_codigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_codigo` (
  `idCodigo` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `codigo` text,
  `dataCriada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_codigo`
--

LOCK TABLES `tb_codigo` WRITE;
/*!40000 ALTER TABLE `tb_codigo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_codigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_curriculo`
--

DROP TABLE IF EXISTS `tb_curriculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_curriculo` (
  `idCurriculo` int NOT NULL AUTO_INCREMENT,
  `tb_candidato_usuario` bigint NOT NULL,
  `Titulo` varchar(45) DEFAULT NULL,
  `anexo` varchar(45) DEFAULT NULL,
  `dataAdd` datetime DEFAULT NULL,
  `dataEdit` datetime DEFAULT NULL,
  `idVaga` int NOT NULL,
  PRIMARY KEY (`idCurriculo`),
  KEY `fk_tb_curriculo_tb_candidato1_idx` (`tb_candidato_usuario`),
  KEY `fk_tb_curriculo_tb_vaga1_idx` (`idVaga`),
  CONSTRAINT `fk_tb_curriculo_tb_candidato1` FOREIGN KEY (`tb_candidato_usuario`) REFERENCES `tb_candidato` (`tb_usuario_id_usuario`),
  CONSTRAINT `fk_tb_curriculo_tb_vaga1` FOREIGN KEY (`idVaga`) REFERENCES `tb_vaga` (`idVaga`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_curriculo`
--

LOCK TABLES `tb_curriculo` WRITE;
/*!40000 ALTER TABLE `tb_curriculo` DISABLE KEYS */;
INSERT INTO `tb_curriculo` VALUES (4,7,'Currículo Desenvolvedor Frontend','curriculo_1.pdf','2025-04-09 14:48:22','2025-04-09 14:48:22',4),(5,7,'Currículo Desenvolvedor Frontend','curriculo_3.pdf','2025-04-09 14:48:47','2025-04-09 14:48:47',4),(6,7,'Currículo Desenvolvedor Frontend','curriculo_1.pdf','2025-04-09 14:49:08','2025-04-09 14:49:08',5),(7,21,'Currículo Desenvolvedor Web','curriculo_1.pdf','2025-04-09 14:49:26','2025-04-09 14:49:26',4),(8,21,'Currículo de Maquinista especializado','curriculo_2.pdf','2025-04-09 14:49:50','2025-04-09 14:49:50',5),(10,16031,'Curriculo de Tecnico de Informatica','IT.pdf','2025-04-09 14:49:50',NULL,5);
/*!40000 ALTER TABLE `tb_curriculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_estagiario`
--

DROP TABLE IF EXISTS `tb_estagiario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_estagiario` (
  `tb_id_usuario` bigint NOT NULL,
  `periodo` varchar(45) DEFAULT NULL,
  `tb_supervisor_tb_id_usuario` bigint NOT NULL,
  `estado` enum('Em estagio','Concluido') DEFAULT 'Em estagio',
  `Remunerado` enum('Sim','Nao') DEFAULT 'Nao',
  PRIMARY KEY (`tb_id_usuario`),
  KEY `fk_tb_estagiario_tb_usuario1_idx` (`tb_id_usuario`),
  KEY `fk_tb_estagiario_tb_supervisor1_idx` (`tb_supervisor_tb_id_usuario`),
  CONSTRAINT `fk_tb_estagiario_tb_supervisor1` FOREIGN KEY (`tb_supervisor_tb_id_usuario`) REFERENCES `tb_supervisor` (`tb_id_usuario`),
  CONSTRAINT `fk_tb_estagiario_tb_usuario1` FOREIGN KEY (`tb_id_usuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_estagiario`
--

LOCK TABLES `tb_estagiario` WRITE;
/*!40000 ALTER TABLE `tb_estagiario` DISABLE KEYS */;
INSERT INTO `tb_estagiario` VALUES (3,'Jan 2025 - Jun 2025',10,'Em estagio','Sim'),(31,'Jan 2025 - Jun 2025',10,'Em estagio','Sim');
/*!40000 ALTER TABLE `tb_estagiario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_media_final`
--

DROP TABLE IF EXISTS `tb_media_final`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_media_final` (
  `tb_estagiario_tb_id_usuario` bigint NOT NULL,
  `nota_final` varchar(45) DEFAULT NULL,
  `comentario` text,
  PRIMARY KEY (`tb_estagiario_tb_id_usuario`),
  KEY `fk_tb_media_final_tb_estagiario1_idx` (`tb_estagiario_tb_id_usuario`),
  CONSTRAINT `fk_tb_media_final_tb_estagiario1` FOREIGN KEY (`tb_estagiario_tb_id_usuario`) REFERENCES `tb_estagiario` (`tb_id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_media_final`
--

LOCK TABLES `tb_media_final` WRITE;
/*!40000 ALTER TABLE `tb_media_final` DISABLE KEYS */;
INSERT INTO `tb_media_final` VALUES (3,'Pendente','Sem comentario'),(31,'Pendente','Sem comentario');
/*!40000 ALTER TABLE `tb_media_final` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_recuperacao`
--

DROP TABLE IF EXISTS `tb_recuperacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_recuperacao` (
  `id_recuperacao` int NOT NULL AUTO_INCREMENT,
  `dataGerada` datetime DEFAULT CURRENT_TIMESTAMP,
  `senha` text,
  `tb_idUsuario` bigint NOT NULL,
  `token` text,
  `usado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_recuperacao`),
  KEY `fk_tb_recuperacao_tb_usuario1_idx` (`tb_idUsuario`),
  CONSTRAINT `fk_tb_recuperacao_tb_usuario1` FOREIGN KEY (`tb_idUsuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_recuperacao`
--

LOCK TABLES `tb_recuperacao` WRITE;
/*!40000 ALTER TABLE `tb_recuperacao` DISABLE KEYS */;
INSERT INTO `tb_recuperacao` VALUES (12,'2025-04-09 13:24:03','nov@Senha#123',10,'xyz789token',1),(13,'2025-04-09 13:24:12','nov@Senha#123',10,'xyz789token',1);
/*!40000 ALTER TABLE `tb_recuperacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_relatorios`
--

DROP TABLE IF EXISTS `tb_relatorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_relatorios` (
  `id_Relatorio` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(500) DEFAULT NULL,
  `anexo` varchar(45) DEFAULT NULL,
  `dataAdd` datetime DEFAULT NULL,
  `tb_estagiario_tb_id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_Relatorio`),
  KEY `fk_tb_relatorios_tb_estagiario1_idx` (`tb_estagiario_tb_id_usuario`),
  CONSTRAINT `fk_tb_relatorios_tb_estagiario1` FOREIGN KEY (`tb_estagiario_tb_id_usuario`) REFERENCES `tb_estagiario` (`tb_id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_relatorios`
--

LOCK TABLES `tb_relatorios` WRITE;
/*!40000 ALTER TABLE `tb_relatorios` DISABLE KEYS */;
INSERT INTO `tb_relatorios` VALUES (1,'Relatório Semanal do Estagiário','relatorio_semanal.pdf','2025-04-09 13:48:29',3),(3,'Relatório de Progresso - Abril','relatorio_abril.pdf','2025-04-09 13:49:01',31);
/*!40000 ALTER TABLE `tb_relatorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_roles`
--

DROP TABLE IF EXISTS `tb_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_roles` (
  `id_roles` int NOT NULL AUTO_INCREMENT,
  `roles` varchar(20) NOT NULL,
  `data_criada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_roles`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_roles`
--

LOCK TABLES `tb_roles` WRITE;
/*!40000 ALTER TABLE `tb_roles` DISABLE KEYS */;
INSERT INTO `tb_roles` VALUES (1,'admin','2025-04-09 13:17:57'),(2,'supervisor','2025-04-09 13:17:57'),(3,'estagiario','2025-04-09 13:17:57'),(4,'gestor','2025-04-09 13:17:57');
/*!40000 ALTER TABLE `tb_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_supervisor`
--

DROP TABLE IF EXISTS `tb_supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_supervisor` (
  `tb_id_usuario` bigint NOT NULL,
  `area` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tb_id_usuario`),
  KEY `fk_tb_supervisor_tb_usuario1_idx` (`tb_id_usuario`),
  CONSTRAINT `fk_tb_supervisor_tb_usuario1` FOREIGN KEY (`tb_id_usuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_supervisor`
--

LOCK TABLES `tb_supervisor` WRITE;
/*!40000 ALTER TABLE `tb_supervisor` DISABLE KEYS */;
INSERT INTO `tb_supervisor` VALUES (10,'Tecnologia');
/*!40000 ALTER TABLE `tb_supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario` (
  `id_usuario` bigint NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `apelido` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `senha` text,
  `ano_de_nascimento` date NOT NULL,
  `idCidade` int NOT NULL,
  `contato1` varchar(20) DEFAULT NULL,
  `contato2` varchar(20) DEFAULT NULL,
  `urlImage` text,
  `estadoUsuario` tinyint(1) DEFAULT '1',
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `eliminado` tinyint(1) DEFAULT '0',
  `dataEliminado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_tb_usuario_cidade1_idx` (`idCidade`),
  CONSTRAINT `fk_tb_usuario_cidade1` FOREIGN KEY (`idCidade`) REFERENCES `cidade` (`idCidade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES (1,'Juliana','Souza','julis','juliana@email.com','senha987','1994-09-30',1,'845678901','855678901','https://link-da-imagem.com/juliana',0,'2025-04-09 13:36:46',0,NULL),(3,'Maria','Fernandes','mariaf','maria@email.com','senha456','1998-08-20',1,'841234567','851234567','https://link-da-imagem.com/maria',0,'2025-04-09 13:36:46',0,NULL),(7,'Ana','Costa','anacosta','ana@email.com','senha321','2000-12-05',1,'843456789','853456789','https://link-da-imagem.com/ana',0,'2025-04-09 13:36:46',0,NULL),(10,'Joãozinho','Silva','joaozinho','joao@email.com','nov@Senha#123','1994-04-10',1,'841234567','851234567','https://nova-imagem.com',1,'2025-04-09 13:10:28',1,'2025-06-16 16:51:12'),(21,'Carlos','Mendes','cmendes','carlos@email.com','senha789','1992-03-10',1,'842345678','852345678','https://link-da-imagem.com/carlos',0,'2025-04-09 13:36:46',0,NULL),(31,'Pedro','Lima','pedrol','pedro@email.com','senha654','1997-07-25',1,'844567890','854567890','https://link-da-imagem.com/pedro',0,'2025-04-09 13:36:46',0,NULL),(16031,'Jardel','Madeira','JJ','jardel@gmail.com','$2b$10$qVtt656KmMCmRba52kYNgeheyldm0Sb6/JWYp6Cre0A6BaKckIcka','1994-09-29',1,'845678901','855678901','https://link-da-imagem.com/juliana',1,'2025-06-10 23:56:53',0,NULL),(28676,'Maria','Silva','MariaSilva','mariasilva@gmail.com','$2b$10$aTgxbKmt3qCpyrifox8rzu3FVZ9IDmbnPpGpOIPZAPNHIHWCiUPbi','1998-03-18',1,'+258842536888','+258822536800','',1,'2025-06-20 12:34:57',0,NULL),(52145,'Jacinto','Bernardo','username','jacintopatricio2@gmail.com','$2b$10$20p.cUXeP9pAZPXW4qMrBOfwDi80F3GcP9C6MBpktErrpMQByXQAK','2012-06-15',1,'825912318','850091212','img/image-1750343799173-365405890.jpg',1,'2025-06-19 16:36:39',0,NULL),(58783,'Abel','Machado','AbelMachado','abelmachado@gmail.com','$2b$10$Ou.01nV7x.9NAAYc.MhA2euGFwqtc/mW5F8UyrrQwjdD16xFrKVkW','1994-06-18',1,'+258842536888','+258822536800','',1,'2025-06-18 23:41:10',0,NULL),(94745194,'Isabel','Alberto','IsaabelAlberto','isabel@gmail.com','$2b$10$IrGNsbURpLEyJTMw2P10CuQEQ4bqabEfjjXWoiCyTs3raEJw03KYG','1996-06-26',1,'+258842536888','+258822536800','/img/photos/image-1750417484788-339052536.jpg',1,'2025-06-20 13:05:21',0,NULL);
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario_roles`
--

DROP TABLE IF EXISTS `tb_usuario_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario_roles` (
  `tb_usuario_roles` int NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `id_roles` int NOT NULL,
  `data_criada` datetime DEFAULT CURRENT_TIMESTAMP,
  `ativa` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`tb_usuario_roles`,`id_usuario`,`id_roles`),
  KEY `fk_tb_usuario_roles_tb_usuario1_idx` (`id_usuario`),
  KEY `fk_tb_usuario_roles_tb_roles1_idx` (`id_roles`),
  CONSTRAINT `fk_tb_usuario_roles_tb_roles1` FOREIGN KEY (`id_roles`) REFERENCES `tb_roles` (`id_roles`),
  CONSTRAINT `fk_tb_usuario_roles_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario_roles`
--

LOCK TABLES `tb_usuario_roles` WRITE;
/*!40000 ALTER TABLE `tb_usuario_roles` DISABLE KEYS */;
INSERT INTO `tb_usuario_roles` VALUES (98,10,1,'2025-04-09 13:19:54',0),(99,3,2,'2025-04-09 13:36:46',1),(100,21,2,'2025-04-09 13:36:46',1),(101,7,2,'2025-04-09 13:36:46',1),(102,31,2,'2025-04-09 13:36:46',1),(103,1,2,'2025-04-09 13:36:46',1),(104,16031,2,'2025-06-10 23:56:53',1),(105,16031,1,'2025-06-12 12:53:44',1),(106,16031,3,'2025-06-13 23:02:38',1),(107,58783,2,'2025-06-18 23:41:10',1),(108,52145,2,'2025-06-19 16:36:39',0),(109,28676,2,'2025-06-20 12:34:57',1),(110,94745194,3,'2025-06-20 13:05:21',1),(111,52145,1,'2025-06-20 16:27:46',1);
/*!40000 ALTER TABLE `tb_usuario_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_vaga`
--

DROP TABLE IF EXISTS `tb_vaga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_vaga` (
  `idVaga` int NOT NULL AUTO_INCREMENT,
  `area_vaga` varchar(500) DEFAULT NULL,
  `Requisitos` text,
  `dataAdd` date DEFAULT NULL,
  `prazo` int DEFAULT NULL,
  `cidade_idCidade` int NOT NULL,
  `estado` enum('Aberto','Fechado') DEFAULT 'Aberto',
  PRIMARY KEY (`idVaga`),
  KEY `fk_tb_vaga_cidade1_idx` (`cidade_idCidade`),
  CONSTRAINT `fk_tb_vaga_cidade1` FOREIGN KEY (`cidade_idCidade`) REFERENCES `cidade` (`idCidade`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_vaga`
--

LOCK TABLES `tb_vaga` WRITE;
/*!40000 ALTER TABLE `tb_vaga` DISABLE KEYS */;
INSERT INTO `tb_vaga` VALUES (4,'Desenvolvedor Backend','Requisitos: Experiência com Node.js e MySQL','2025-04-09',30,1,'Aberto'),(5,'Maquinista','Requisitos: Experiência com manuseito ','2025-04-09',15,1,'Aberto');
/*!40000 ALTER TABLE `tb_vaga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'recrutamento_cfm'
--

--
-- Dumping routines for database 'recrutamento_cfm'
--
/*!50003 DROP PROCEDURE IF EXISTS `avaliarDesemepenho` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `avaliarDesemepenho`(IN p_idFuncionario VARCHAR(20))
BEGIN
    SELECT 
        f.tb_id_usuario AS numero,
        u.username AS nome,
        c.nome_cargo AS cargo,
        md.mes,
        cr.descricao AS criterio,
        cr.peso,
        md.media
    FROM tb_media_desempenho md
    JOIN tb_usuario u ON u.id_usuario = md.tb_id_funcionario
    JOIN tb_funcionario f ON f.tb_id_usuario = u.id_usuario
    JOIN tb_cargo c ON f.tb_cargo_id_cargo = c.id_cargo
    JOIN tb_cargo_criterio cr ON cr.id_criterios = md.tb_id_criterios
    WHERE f.tb_id_usuario = p_idFuncionario AND cr.ativo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `avaliarRelatorio` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `avaliarRelatorio`(
    IN acao VARCHAR(50),
    IN idAva INT,
    IN classificacao VARCHAR(45),
    IN idRel INT,
    IN descricao TEXT
)
BEGIN
    -- Inserir avaliação
    IF acao = 'inserir' THEN
        INSERT INTO tb_avaliacao (classificacao, dataAdd, tb_relatorios_id_Relatorio, descricao)
        VALUES (classificacao, now(), tb_relatorios_id_Relatorio, descricao);

        -- Retornar o último registro inserido
        SELECT * FROM tb_avaliacao WHERE idAvaliacao = LAST_INSERT_ID();
    END IF;

    -- Listar todas as avaliações
    IF acao = 'listar' THEN
        SELECT * FROM tb_avaliacao;
    END IF;

    -- Buscar avaliação por ID
    IF acao = 'buscarPorId' THEN
        SELECT * FROM tb_avaliacao WHERE idAvaliacao = idAva;
    END IF;

    -- Buscar avaliações por ID do relatório
    IF acao = 'buscarPorRelatorio' THEN
        SELECT * FROM tb_avaliacao WHERE tb_relatorios_id_Relatorio = idRel;
    END IF;

    -- Atualizar avaliação
    IF acao = 'atualizar' THEN
        UPDATE tb_avaliacao
        SET classificacao = classificacao, dataAdd = now(), descricao = descricao
        WHERE idAvaliacao = idAvaliacao;

        -- Retornar a avaliação atualizada
        SELECT * FROM tb_avaliacao WHERE idAvaliacao = idAvaliacao;
    END IF;

    -- Excluir avaliação
    IF acao = 'eliminar' THEN
        DELETE FROM tb_avaliacao WHERE idAvaliacao = idAvaliacao;
        SELECT 1 AS sucesso; -- Retorno de sucesso
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirAreaUsuario` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirAreaUsuario`(
    IN acao VARCHAR(30),
    IN p_tb_id_usuario BIGINT,
    IN p_area VARCHAR(45)
)
BEGIN
    -- Inserir nova área para o usuário
    IF acao = 'inserir' THEN
        INSERT INTO tb_supervisor (tb_id_usuario, area)
        VALUES (p_tb_id_usuario, p_area);

    -- Listar todas as áreas
    ELSEIF acao = 'listarTodos' THEN
        SELECT * FROM tb_supervisor;

    -- Listar área de um usuário específico
    ELSEIF acao = 'listarPorUsuario' THEN
        SELECT * FROM tb_supervisor
        WHERE tb_id_usuario = p_tb_id_usuario;

    -- Atualizar área de um usuário
    ELSEIF acao = 'atualizar' THEN
        UPDATE tb_supervisor
        SET area = p_area
        WHERE tb_id_usuario = p_tb_id_usuario;

    -- Remover a área de um usuário
    ELSEIF acao = 'remover' THEN
        DELETE FROM tb_supervisor
        WHERE tb_id_usuario = p_tb_id_usuario;

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acao inválida fornecida.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirCandidatos` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirCandidatos`(
    IN acao VARCHAR(50),
    IN tb_usuario_id_usuario BIGINT,
    IN p_idVaga INT,
    IN p_area VARCHAR(500),
    IN p_estado ENUM('Aprovado', 'Reprovado', 'Pendente')
)
BEGIN
    -- Inserir ou atualizar o status e a área do usuário
    IF acao = 'inserir' THEN
        INSERT INTO tb_candidato (tb_usuario_id_usuario, area)
        VALUES (tb_usuario_id_usuario, p_area);
        
        -- Retornar o registro inserido
        SELECT * FROM tb_candidato WHERE tb_usuario_id_usuario = LAST_INSERT_ID();
    END IF;

    -- Listar todos os status dos usuários
    IF acao = 'listar' THEN
       		SELECT idCurriculo,tb_candidato_usuario,nome,apelido,email,contato1,contato2,urlImage,tb_vaga.idVaga,tb_vaga.area_vaga,Requisitos,prazo,tb_curriculo.Titulo,tb_curriculo.anexo,tb_candidato.estado from tb_curriculo
		inner join tb_usuario on tb_curriculo.tb_candidato_usuario = tb_usuario.id_usuario
        inner join tb_candidato on tb_curriculo.tb_candidato_usuario = tb_candidato.tb_usuario_id_usuario
		inner join cidade on tb_usuario.idCidade = cidade.idCidade
		inner join tb_vaga on tb_curriculo.idVaga = tb_vaga.idVaga WHERE tb_candidato.estado = 'Pendente';
    END IF;

    -- Buscar o status do usuário por ID
    IF acao = 'buscarPorId' THEN
	SELECT idCurriculo,tb_candidato_usuario,nome,apelido,email,contato1,contato2,urlImage,tb_vaga.idVaga,tb_vaga.area_vaga,Requisitos,prazo,tb_curriculo.Titulo,tb_curriculo.anexo,tb_candidato.estado from tb_curriculo
		inner join tb_usuario on tb_curriculo.tb_candidato_usuario = tb_usuario.id_usuario
        inner join tb_candidato on tb_curriculo.tb_candidato_usuario = tb_candidato.tb_usuario_id_usuario
		inner join cidade on tb_usuario.idCidade = cidade.idCidade
		inner join tb_vaga on tb_curriculo.idVaga = tb_vaga.idVaga WHERE tb_usuario_id_usuario = tb_usuario_id_usuario AND tb_candidato.estado = 'Pendente';
    END IF;

    -- Atualizar status e área do usuário
    IF acao = 'atualizar' THEN
        UPDATE tb_candidato
        SET area = p_area, estado = p_estado
        WHERE tb_usuario_id_usuario = tb_usuario_id_usuario;
        
        -- Retornar o registro atualizado
        SELECT * FROM tb_candidato WHERE tb_usuario_id_usuario = tb_usuario_id_usuario;
    END IF;
    
        -- Atualizar status e área do usuário
    IF acao = 'AprovarCandidato' THEN
        UPDATE tb_candidato
        SET  estado = 'Aprovado'
        WHERE tb_usuario_id_usuario = tb_usuario_id_usuario;
        
        UPDATE tb_vaga
        SET estado = 'Fechado'
        WHERE idVaga = idV;
        
        -- Retornar o registro atualizado
        SELECT * FROM tb_curriculo WHERE tb_candidato_usuario = tb_usuario_id_usuario;
    END IF;
    
        -- Atualizar status e área do usuário
    IF acao = 'ReprovarCandidato' THEN
		UPDATE tb_candidato
        SET  estado = 'Reprovado'
        WHERE tb_usuario_id_usuario = tb_usuario_id_usuario;
        
        -- Retornar o registro atualizado
        SELECT * FROM tb_curriculo WHERE tb_candidato_usuario = tb_usuario_id_usuario;
    END IF;

    -- Excluir o status de um usuário
    IF acao = 'eliminar' THEN
        DELETE FROM tb_candidato WHERE tb_usuario_id_usuario = tb_usuario_id_usuario;
        SELECT 1 AS sucesso; -- Retorno de sucesso
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirCurriculo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirCurriculo`(
    IN acao VARCHAR(50),
    IN idCurr INT,
    IN tb_candidato BIGINT,
    IN p_Titulo VARCHAR(45),
    IN p_anexo VARCHAR(45),
    IN idVa INT
)
BEGIN
    -- Inserir novo currículo
    IF acao = 'inserir' THEN
        INSERT INTO tb_curriculo (tb_candidato_usuario, Titulo, anexo, dataAdd, dataEdit, idVaga)
        VALUES (tb_candidato, p_Titulo, p_anexo, now(), now(), idVa);
        
        -- Retornar o currículo inserido
        SELECT * FROM tb_curriculo WHERE idCurriculo = LAST_INSERT_ID();
    END IF;

    -- Listar todos os currículos
    IF acao = 'listar' THEN
        SELECT * FROM tb_curriculo;
    END IF;

    -- Buscar currículo por ID
    IF acao = 'buscarPorIdCandidato' THEN
    select idCurriculo,tb_candidato_usuario,Titulo,anexo,tb_curriculo.dataAdd,tb_vaga.idVaga,area_vaga,Requisitos,prazo,nomeCidade,estado from tb_curriculo 
		inner join tb_vaga on tb_curriculo.idVaga=tb_vaga.idVaga 
			inner join cidade on tb_vaga.cidade_idCidade =cidade.idCidade 
			where tb_candidato_usuario = tb_candidato;
    END IF;

    -- Atualizar currículo
    IF acao = 'atualizar' THEN
        UPDATE tb_curriculo
        SET Titulo = p_Titulo, anexo = p_anexo, dataEdit = now(), idVaga = idVa
        WHERE idCurriculo = idCurr;

        -- Retornar o currículo atualizado
        SELECT * FROM tb_curriculo WHERE idCurriculo = idCurr;
    END IF;

    -- Excluir currículo
    IF acao = 'eliminar' THEN
        DELETE FROM tb_curriculo WHERE idCurriculo = idCurr;
        SELECT 1 AS sucesso; -- Retorno de sucesso
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirEstagiario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirEstagiario`(
    IN acao VARCHAR(30),
    IN p_tb_id_usuario BIGINT,
    IN p_periodo VARCHAR(45),
    IN p_tb_supervisor_tb_id_usuario BIGINT,
    IN p_estado ENUM('Em estagio','Concluido'),
    IN p_remunerado ENUM('Sim','Nao')
)
BEGIN
    -- Inserir novo estagiário
    IF acao = 'inserir' THEN
        INSERT INTO tb_estagiario (
            tb_id_usuario,
            periodo,
            tb_supervisor_tb_id_usuario,
            estado,
            Remunerado
        )
        VALUES (
            p_tb_id_usuario,
            p_periodo,
            p_tb_supervisor_tb_id_usuario,
            p_estado,
            p_remunerado
        );
        
		INSERT INTO tb_media_final(`tb_estagiario_tb_id_usuario`,`nota_final`,`comentario`)
			VALUES
			(p_tb_id_usuario,'Pendente','Sem comentario');

    -- Listar todos os estagiários
    ELSEIF acao = 'listarTodos' THEN
        SELECT id_usuario,nome,apelido,email,nomeCidade,periodo,remunerado,estado,contato1,contato2,nota_final,comentario FROM tb_estagiario
        inner join tb_usuario on tb_estagiario.tb_id_usuario = tb_usuario.id_usuario
       inner join tb_media_final on tb_media_final.tb_estagiario_tb_id_usuario = tb_usuario.id_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade;
		
    -- Listar estagiário por usuário
    ELSEIF acao = 'listarPorUsuario' THEN
        SELECT id_usuario,nome,apelido,email,nomeCidade,periodo,remunerado,estado,contato1,contato2,nota_final,comentario FROM tb_estagiario
        inner join tb_usuario on tb_estagiario.tb_id_usuario = tb_usuario.id_usuario
       inner join tb_media_final on tb_media_final.tb_estagiario_tb_id_usuario = tb_usuario.id_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade
        WHERE tb_id_usuario = p_tb_id_usuario;
        
	ELSEIF acao = 'listarSupervisorEstagiario' THEN
        -- Primeiro obtém o ID do supervisor do estagiário
    SET @id_supervisor := (SELECT tb_supervisor_tb_id_usuario FROM tb_estagiario WHERE tb_id_usuario = p_tb_id_usuario);
    
    -- Depois busca os dados do supervisor usando o ID obtido
    SELECT area,nome,apelido,tb_id_usuario FROM tb_supervisor 
    INNER JOIN tb_usuario ON tb_supervisor.tb_id_usuario = tb_usuario.id_usuario
    WHERE tb_supervisor.tb_id_usuario = @id_supervisor;
        
    -- Listar estagiário por supervisor
    ELSEIF acao = 'listarEstagiarioSupervisor' THEN
        SELECT id_usuario,nome,apelido,email,nomeCidade,periodo,remunerado,estado,contato1,contato2,nota_final,comentario FROM tb_estagiario
        inner join tb_usuario on tb_estagiario.tb_id_usuario = tb_usuario.id_usuario
       inner join tb_media_final on tb_media_final.tb_estagiario_tb_id_usuario = tb_usuario.id_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade
        WHERE tb_supervisor_tb_id_usuario = p_tb_supervisor_tb_id_usuario;

    -- Atualizar dados do estagiário
    ELSEIF acao = 'atualizar' THEN
        UPDATE tb_estagiario
        SET
            periodo = p_periodo,
            tb_supervisor_tb_id_usuario = p_tb_supervisor_tb_id_usuario,
            estado = p_estado,
            Remunerado = p_remunerado
        WHERE tb_id_usuario = p_tb_id_usuario;

    -- Remover estagiário
    ELSEIF acao = 'remover' THEN
        DELETE FROM tb_estagiario
        WHERE tb_id_usuario = p_tb_id_usuario;

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acao inválida fornecida.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirLocalizacao` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirLocalizacao`(
    IN p_acao VARCHAR(50),
    IN p_idRegiao INT,
    IN p_nomeRegiao VARCHAR(100),
    IN p_idProvincia INT,
    IN p_nomeProvincia VARCHAR(100),
    IN p_idCidade INT,
    IN p_nomeCidade VARCHAR(100)
)
BEGIN
    IF p_acao = 'listarCidades' THEN
        SELECT 
            c.idCidade,
            c.nomeCidade,
            pr.idProvincia,
            pr.nomeProvincia,
            ps.idRegiao,
            ps.nomeRegiao
        FROM cidade c
        INNER JOIN provincia pr ON c.idProvincia = pr.idProvincia
        INNER JOIN regiao ps ON pr.idRegiao = ps.idRegiao;

    ELSEIF p_acao = 'adicionarRegiao' THEN
        INSERT INTO regiao(nomeRegiao) VALUES (p_nomeRegiao);

    ELSEIF p_acao = 'adicionarProvincia' THEN
        INSERT INTO provincia(nomeProvincia, idRegiao)
        VALUES (p_nomeProvincia, p_idRegiao);

    ELSEIF p_acao = 'adicionarCidade' THEN
        INSERT INTO cidade(nomeCidade, idProvincia)
        VALUES (p_nomeCidade, p_idProvincia);

    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ação inválida especificada para p_acao.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirPermissoes` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirPermissoes`(
    IN _operacao VARCHAR(30), 
    IN _idUsuario BIGINT, 
    IN _idRoles INT, 
    IN _roles VARCHAR(20)
)
BEGIN
    -- Retorna o ID de uma Role específica
    IF _operacao = "Roles" THEN 
        SELECT id_roles 
        FROM tb_roles 
        WHERE roles = _roles; 
    END IF;

    -- Lista todas as Roles ativas de todos os usuários
    IF _operacao = "listarRolesUsuario" THEN 
        SELECT ur.*, r.roles 
        FROM tb_usuario_roles ur
        JOIN tb_roles r ON ur.id_roles = r.id_roles
        WHERE ur.tb_usuario_roles > 0; -- Filtro genérico para listar todas as entradas
    END IF;

    -- Lista as Roles ativas de um usuário específico
    IF _operacao = "listarRolesUsuarioporId" THEN 
        SELECT ur.*, r.roles 
        FROM tb_usuario_roles ur
        JOIN tb_roles r ON ur.id_roles = r.id_roles
        WHERE ur.id_usuario = _idUsuario;
    END IF;

    -- Adiciona uma nova Role a um usuário
    IF _operacao = "adicionarRoles" THEN 
        INSERT INTO tb_usuario_roles (
            id_usuario, 
            id_roles, 
            data_criada
        )
        VALUES (
            _idUsuario, 
            _idRoles, 
            NOW()
        );

        -- Retorna as Roles do usuário após a inserção
        SELECT ur.*, r.roles 
        FROM tb_usuario_roles ur
        JOIN tb_roles r ON ur.id_roles = r.id_roles
        WHERE ur.id_usuario = _idUsuario;
    END IF;

    -- Desativa uma Role de um usuário
    IF _operacao = "desativarRoles" THEN 
        UPDATE tb_usuario_roles SET ativa = 0
        WHERE id_usuario = _idUsuario AND id_roles = _idRoles;

        -- Retorna as Roles do usuário após a alteração
        SELECT ur.*, r.roles 
        FROM tb_usuario_roles ur
        JOIN tb_roles r ON ur.id_roles = r.id_roles
        WHERE ur.id_usuario = _idUsuario;
    END IF;

    -- Reativa uma Role de um usuário
    -- Adiciona a mesma Role novamente caso tenha sido excluída anteriormente
    IF _operacao = "ativarRoles" THEN 
        UPDATE tb_usuario_roles SET ativa = 1
        WHERE id_usuario = _idUsuario AND id_roles = _idRoles;
        
        -- Retorna as Roles do usuário após a alteração
        SELECT ur.*, r.roles 
        FROM tb_usuario_roles ur
        JOIN tb_roles r ON ur.id_roles = r.id_roles
        WHERE ur.id_usuario = _idUsuario;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirRelatorio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirRelatorio`(
    IN operacao VARCHAR(20),
    IN _idRelatorio INT,
    IN _titulo VARCHAR(500),
    IN _anexo VARCHAR(45),
    IN _dataAdd DATETIME,
    IN _idEstagiario BIGINT
)
BEGIN
    -- Inserir novo relatório
    IF operacao = 'inserir' THEN
        INSERT INTO tb_relatorios (
            Titulo,
            anexo,
            dataAdd,
            tb_estagiario_tb_id_usuario
        ) VALUES (
            _titulo,
            _anexo,
            _dataAdd,
            _idEstagiario
        );

    -- Listar todos os relatórios
    ELSEIF operacao = 'listar' THEN
        SELECT * FROM tb_relatorios inner join tb_avaliacao on tb_relatorios.id_Relatorio=tb_avaliacao.tb_relatorios_id_Relatorio;

    -- Listar por ID do relatório
    ELSEIF operacao = 'buscarPorId' THEN
        SELECT * FROM tb_relatorios 
        inner join tb_avaliacao on tb_relatorios.id_Relatorio=tb_avaliacao.tb_relatorios_id_Relatorio 
        WHERE id_Relatorio = _idRelatorio;

    -- Listar relatórios por estagiário
    ELSEIF operacao = 'buscarPorEstagiario' THEN
        SELECT * FROM tb_relatorios 
        inner join tb_avaliacao on tb_relatorios.id_Relatorio=tb_avaliacao.tb_relatorios_id_Relatorio 
        WHERE tb_estagiario_tb_id_usuario = _idEstagiario;

    -- Atualizar relatório
    ELSEIF operacao = 'atualizar' THEN
        UPDATE tb_relatorios
        SET 
            Titulo = _titulo,
            anexo = _anexo,
            dataAdd = _dataAdd
        WHERE id_Relatorio = _idRelatorio;

    -- Excluir relatório
    ELSEIF operacao = 'eliminar' THEN
        DELETE FROM tb_relatorios WHERE id_Relatorio = _idRelatorio;

    -- Operação inválida
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Operação inválida fornecida ao procedimento.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirSenhaUsuario` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirSenhaUsuario`(
    IN opcao VARCHAR(50),
    IN idU BIGINT,
    IN em VARCHAR(50),
    IN tok TEXT,
    IN NSenha TEXT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Reverter alterações em caso de erro
        ROLLBACK; 
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ocorreu um erro ao executar o procedimento.';
    END;

    -- Iniciar transação
    START TRANSACTION;

    -- Operação para buscar usuário por email
    IF opcao = 'user_procedure' THEN
        SELECT * 
        FROM tb_usuario 
        WHERE email = em;

    -- Operação para obter token específico
    ELSEIF opcao = 'obterToken' THEN
        SELECT * 
        FROM tb_recuperacao 
        WHERE token = tok 
        ORDER BY dataGerada DESC 
        LIMIT 1;

    -- Operação para gerar um novo token
    ELSEIF opcao = 'GerarToken' THEN
        INSERT INTO tb_recuperacao (tb_idUsuario, token, dataGerada) 
        VALUES (idU, tok, CURRENT_TIMESTAMP());
		
        SELECT tb_idUsuario, token 
        FROM tb_recuperacao 
        WHERE tb_idUsuario = idU 
        ORDER BY dataGerada DESC 
        LIMIT 1;
        
	ELSEIF opcao = 'GerarCodigo' THEN
        INSERT INTO tb_codigo (email, codigo) 
        VALUES (em, tok);
		
        SELECT email, codigo 
        FROM tb_codigo 
        WHERE email = em 
        ORDER BY dataCriada DESC 
        LIMIT 1;
        
	ELSEIF opcao = 'ObterCodigo' THEN	
        SELECT email, codigo 
        FROM tb_codigo 
        WHERE email = em 
        ORDER BY dataCriada DESC 
        LIMIT 1;

    -- Operação para obter o último token de um usuário
    ELSEIF opcao = 'ObterTokenUsuario' THEN
        SELECT * 
        FROM tb_recuperacao 
        WHERE tb_idUsuario = idU 
        ORDER BY dataGerada DESC 
        LIMIT 1;

    -- Operação para obter a última senha do usuário
    ELSEIF opcao = 'obterUltimaSenha' THEN
        SELECT senha 
        FROM tb_usuario 
        WHERE id_usuario = idU;

    -- Operação para alterar a senha do usuário
    ELSEIF opcao = 'AlterarSenha' THEN
        UPDATE tb_recuperacao 
        SET senha = NSenha 
        WHERE token = tok;

        UPDATE tb_usuario 
        SET senha = NSenha 
        WHERE id_usuario = idU;

        SELECT * 
        FROM tb_usuario 
        WHERE id_usuario = idU;
        
-- Operação para mudar a senha do usuário
    ELSEIF opcao = 'MudarSenha' THEN

        UPDATE tb_usuario 
        SET senha = NSenha 
        WHERE id_usuario = idU;

        SELECT * FROM tb_usuario 
        WHERE id_usuario = idU;

    -- Operação para atualizar o estado de recuperação para "não usado"
    ELSEIF opcao = 'AtualizarEstadoRecuperacao' THEN
        UPDATE tb_recuperacao 
        SET usado = 0 
        WHERE token = tok;

        SELECT * 
        FROM tb_recuperacao 
        WHERE token = tok;

    -- Operação para marcar o token como "usado"
    ELSEIF opcao = 'UsarToken' THEN
        UPDATE tb_recuperacao 
        SET usado = 1 
        WHERE token = tok;

        SELECT * 
        FROM tb_recuperacao 
        WHERE token = tok;

    -- Caso a opção fornecida seja inválida
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Opção inválida fornecida.';
    END IF;

    -- Confirmar alterações
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirSupervisor` */;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirSupervisor`(
    IN acao VARCHAR(30),
    IN p_tb_id_usuario BIGINT,
    IN p_area VARCHAR(45)
)
BEGIN
    -- Inserir nova área para o usuário
    IF acao = 'inserir' THEN
        INSERT INTO tb_supervisor (tb_id_usuario, area)
        VALUES (p_tb_id_usuario, p_area);

    -- Listar todas as áreas
    ELSEIF acao = 'listarTodos' THEN
      SELECT id_usuario,nome,apelido, nomeCidade, email,area FROM tb_supervisor
        inner join tb_usuario on tb_supervisor.tb_id_usuario = tb_usuario.id_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade;

    -- Listar área de um usuário específico
    ELSEIF acao = 'listarPorUsuario' THEN
        SELECT id_usuario,nome,apelido, nomeCidade, email,area FROM tb_supervisor
        inner join tb_usuario on tb_supervisor.tb_id_usuario = tb_usuario.id_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade
        WHERE tb_id_usuario = p_tb_id_usuario;

    -- Atualizar área de um usuário
    ELSEIF acao = 'atualizar' THEN
        UPDATE tb_supervisor
        SET area = p_area
        WHERE tb_id_usuario = p_tb_id_usuario;

    -- Remover a área de um usuário
    ELSEIF acao = 'remover' THEN
        DELETE FROM tb_supervisor
        WHERE tb_id_usuario = p_tb_id_usuario;

    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Acao inválida fornecida.';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `recrutamento_cfm` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirUsuarios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirUsuarios`(
    IN acao VARCHAR(50),
    IN p_nome VARCHAR(255),
    IN p_apelido VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_senha VARCHAR(255),
    IN p_contato1 VARCHAR(255),
    IN p_contato2 VARCHAR(255),
    IN p_ano_de_nascimento DATE,
    IN p_idCidade INT,
    IN p_urlImage VARCHAR(255),
    IN p_estadoUsuario TINYINT,
    IN p_idUsuario INT
)
BEGIN
    -- Inserir novo usuário
    IF acao = 'inserir' THEN
        SET @existe = (SELECT COUNT(*) FROM tb_usuario WHERE email = p_email);

        IF @existe > 0 THEN 
            SELECT 2 AS inserido; -- E-mail já existe
        ELSE
            -- Inserir o novo usuário com ID fornecido
            INSERT INTO tb_usuario (
                id_usuario, nome, apelido, username, email, senha, ano_de_nascimento, 
                idCidade, contato1, contato2, urlImage, estadoUsuario
            )
            VALUES (
                p_idUsuario, p_nome, p_apelido, p_username, p_email, p_senha, p_ano_de_nascimento, 
                p_idCidade, p_contato1, p_contato2, p_urlImage, 1
            );

            -- Inserir na tabela de papéis (roles)
            INSERT INTO tb_usuario_roles (id_usuario, id_roles) VALUES (p_idUsuario, 3);

            -- Retornar o novo usuário inserido
            SELECT *, 1 AS inserido FROM tb_usuario WHERE id_usuario = p_idUsuario;
        END IF;
    END IF;

    -- Listar todos os usuários
    IF acao = 'listarTodos' THEN
		SELECT id_usuario, nome, apelido, username, email, ano_de_nascimento, 
        cidade.idCidade, cidade.nomeCidade, contato1, contato2, urlImage, estadoUsuario FROM tb_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade
        where eliminado = 0;
    END IF;
    
	IF acao = 'AtualizarEstado' THEN
		UPDATE tb_usuario SET estadoUsuario = 1 WHERE email = p_email;
    END IF;

    -- Listar usuário por ID
    IF acao = 'listarPorId' THEN
        IF EXISTS (SELECT 1 FROM tb_usuario WHERE id_usuario = p_idUsuario) THEN
		SELECT id_usuario, nome, apelido, username, email, ano_de_nascimento, 
        cidade.idCidade, cidade.nomeCidade, contato1, contato2, urlImage, estadoUsuario FROM tb_usuario
        inner join cidade on tb_usuario.idCidade = cidade.idCidade
        where id_usuario = p_idUsuario and eliminado = 0;
        ELSE
            SELECT 3 AS naoEncontrado; -- Usuário não encontrado
        END IF;
    END IF;

    -- Editar usuário
    IF acao = 'editar' THEN
        IF EXISTS (SELECT 1 FROM tb_usuario WHERE id_usuario = p_idUsuario) THEN
            UPDATE tb_usuario
            SET 
                nome = p_nome,
                apelido = p_apelido,
                username = p_username,
                email = p_email,
                contato1 = p_contato1,
                contato2 = p_contato2,
                ano_de_nascimento = p_ano_de_nascimento,
                idCidade = p_idCidade,
                urlImage = p_urlImage,
                estadoUsuario = p_estadoUsuario
            WHERE id_usuario = p_idUsuario;

            SELECT * FROM tb_usuario WHERE id_usuario = p_idUsuario;
        ELSE
            SELECT 3 AS naoEncontrado; -- Usuário não encontrado
        END IF;
    END IF;

    -- Excluir usuário
    IF acao = 'excluir' THEN
            UPDATE tb_usuario_roles set ativa = 0 WHERE id_usuario = p_idUsuario;
            UPDATE tb_usuario SET eliminado = 1 WHERE id_usuario = p_idUsuario;
			UPDATE tb_usuario SET dataEliminado = current_timestamp() WHERE id_usuario = p_idUsuario;
			SELECT 1 from tb_usuario where id_usuario = p_idUsuario;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `gerirVagas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirVagas`(
    IN acao VARCHAR(50),
    IN idV INT,
    IN p_area_vaga VARCHAR(500),
    IN p_requisitos TEXT,
    IN p_prazo INT,
    IN p_idCidade INT,
    IN p_estado ENUM('Aberto', 'Fechado')
)
BEGIN
    -- Inserir nova vaga
    IF acao = 'inserir' THEN
        INSERT INTO tb_vaga (area_vaga, requisitos, dataAdd, prazo, cidade_idCidade, estado)
        VALUES (p_area_vaga, p_requisitos, now(), p_prazo, p_idCidade, p_estado);
        
        -- Retornar confirmação de inserção
        SELECT 1 AS Inserido; 
    END IF;

    -- Listar todas as vagas
    IF acao = 'listar' THEN
        SELECT idVaga,area_vaga,Requisitos,dataAdd,prazo,idCidade,estado,nomeCidade FROM tb_vaga 
		inner join cidade on tb_vaga.cidade_idCidade=cidade.idCidade;
    END IF;

    -- Buscar vaga por ID
    IF acao = 'buscarPorId' THEN
        SELECT * FROM tb_vaga WHERE idVaga = idV;
    END IF;
    
        -- Buscar vaga por ID
    IF acao = 'buscarPorCidade' THEN
        SELECT * FROM tb_vaga WHERE cidade_idCidade = p_idCidade;
    END IF;

    -- Atualizar vaga
    IF acao = 'atualizar' THEN
        UPDATE tb_vaga
        SET area_vaga = p_area_vaga, requisitos = p_requisitos, dataAdd = now(), prazo = p_prazo, cidade_idCidade = p_idCidade, estado = p_estado
        WHERE idVaga = idV;

        -- Retornar o registro atualizado
        SELECT * FROM tb_vaga WHERE idVaga = idV;
    END IF;

    -- Excluir vaga
    IF acao = 'eliminar' THEN
        DELETE FROM tb_vaga WHERE idVaga = idV;
        SELECT 1 AS sucesso; -- Retorno de sucesso
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-26 12:00:23
