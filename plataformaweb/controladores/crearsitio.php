<?php

include 'configuracion.php';

$sql = 'CREATE TABLE u275204779_anuncios.' .$empresa. '_ajustes (
  id int(11) NOT NULL,
  idproducto int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  fechamovimiento date NOT NULL,
  tipomovimientonombrecorto varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE u275204779_anuncios.' .$empresa .'_ajustes ADD PRIMARY KEY (id);
ALTER TABLE u275204779_anuncios.' .$empresa .'_ajustes MODIFY id int(11) NOT NULL AUTO_INCREMENT';


$sql = 'CREATE TABLE `u275204779_anuncios`.`templay_bonus` (
  `id` int(11) NOT NULL,
  `bonusestablecido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_bonus` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_bonus` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_anuncios` (
  `descripcion` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` float(6,0) NOT NULL,
  `precioanterior` float NOT NULL,
  `idrubro` int(6) NOT NULL,
  `esnovedad` tinyint(1) NOT NULL,
  `esoferta` tinyint(1) NOT NULL,
  `bonus` int(6) NOT NULL,
  `costo` float NOT NULL,
  `costoanterior` float NOT NULL,
  `inactivo` tinyint(1) NOT NULL,
  `nopublicar` tinyint(4) NOT NULL,
  `observaciones` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comentarios` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechastockinicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`lab_anuncios` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`lab_anuncios` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_clientes` (
  `idcliente` int(11) NOT NULL,
  `nombrecliente` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bonus` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_clientes` ADD PRIMARY KEY (`idcliente`);
ALTER TABLE `u275204779_anuncios`.`templay_clientes` MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_compras` (
  `id` int(11) NOT NULL,
  `idproveedor` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` float NOT NULL,
  `idproducto` int(11) NOT NULL,
  `fechacompra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_compras` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_compras` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql='
CREATE TABLE `u275204779_anuncios`.`templay_proveedores` (
  `idproveedor` int(11) NOT NULL,
  `nombreproveedor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_proveedores` ADD PRIMARY KEY (`idproveedor`);
ALTER TABLE `u275204779_anuncios`.`templay_proveedores` MODIFY `idproveedor` int(11) NOT NULL AUTO_INCREMENT';


$sql = 'CREATE TABLE `u275204779_anuncios`.`templay_proveedoresanuncios` (
  `id` int(11) NOT NULL,
  `idproveedor` int(11) NOT NULL,
  `idanuncio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_proveedoresanuncios` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_proveedoresanuncios` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_rubros` (
  `idrubro` int(11) NOT NULL,
  `nombrerubro` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_rubros` ADD PRIMARY KEY (`idrubro`);
ALTER TABLE `u275204779_anuncios`.`templay_rubros` MODIFY `idrubro` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_ventas` (
  `id` int(11) NOT NULL,
  `idproducto` int(10) NOT NULL,
  `precio` int(6) NOT NULL,
  `costo` float NOT NULL,
  `idrubro` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(6) NOT NULL,
  `idcliente` int(11) NOT NULL,
  `bonus` int(6) NOT NULL,
  `tipopago` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_ventas` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_ventas` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql='CREATE TABLE `u275204779_anuncios`.`templay_tiposmovimientostock` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombrecorto` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_tiposmovimientostock` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_tiposmovimientostock` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

$sql1 = 'SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO'';

$sql2 = 'INSERT INTO `u275204779_anuncios`.`templay_tiposmovimientostock`(`id`, `nombre`, `nombrecorto`) SELECT `id`, `nombre`, `nombrecorto` FROM `u275204779_anuncios`.`laboratorio_tiposmovimientostock';


$sql = 'CREATE TABLE `u275204779_anuncios`.`templay_tiposdepago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombrecorto` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `u275204779_anuncios`.`templay_tiposdepago` ADD PRIMARY KEY (`id`);
ALTER TABLE `u275204779_anuncios`.`templay_tiposdepago` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT';

$sql1 = 'SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO'';

$sql2 =INSERT INTO `u275204779_anuncios`.`templay_tiposdepago`(`id`, `nombre`, `nombrecorto`) SELECT `id`, `nombre`, `nombrecorto` FROM `u275204779_anuncios`.`laboratorio_tiposdepago`;



?>