<?php
	$host = "localhost";	
	$user = "user";
	$pass = "pass";
	$db = 	"db";
	@mysql_connect($host, $user, $pass) or die("Erreur dans vos paramètres de connexion.");
	@mysql_select_db($db) or die("Le nom de la DB est invalide.");
?>