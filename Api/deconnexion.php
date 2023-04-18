<?php
header('Content-Type: application/json');
session_start();

$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'ForumPhp';
$port = '8889';

try {
    $pdo = new PDO('mysql:host=' . $db_host . ';port=' . $port . ';dbname=' . $db_db, $db_user, $db_password);
    $retour["success"] = true;
    $retour["message"] = "Connexion à la base de données réussie";
} catch (PDOException $e) {
    $retour["success"] = false;
    $retour["message"] = "Erreur de connexion à la base de données";
}

$_SESSION = array();
session_destroy();

$retour["success"] = true;
$retour["message"] = "Deconnexion reussie";


echo json_encode($retour); // Convertir le message en JSON