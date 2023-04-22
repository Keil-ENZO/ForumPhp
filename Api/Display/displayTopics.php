<?php
header('Content-Type: application/json');
session_start();

// Connexion à la base de données
$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'ForumPhp';
$port = '8889';

$retour = array();

try {
    $pdo = new PDO('mysql:host='.$db_host.';port='.$port.';dbname='.$db_db, $db_user, $db_password);
    $retour["success"] = true;
    $retour["message"] = "Connexion réussie à la base de données";
} catch(PDOException $e) {
    $retour["success"] = false;
    $retour["message"] = "Erreur de connexion à la base de données";
    echo json_encode($retour);
    exit(); // Terminer le script pour éviter des erreurs supplémentaires
}

if(isset($_GET['tag_id'])) {
    $tag_id = $_GET['tag_id'];
    $requete = $pdo->prepare("SELECT * FROM `Topics` WHERE tag_id = ?");
    $requete->execute([$tag_id]);
} else {
    $requete = $pdo->prepare("SELECT * FROM `Topics`");
    $requete->execute();
}

$result = $requete->fetchAll();



$retour["success"] = true;
$retour["message"] = "Voici les données";
$retour["Nb lignes"] = count($result);
$retour["results"] = $result;

echo json_encode($retour);