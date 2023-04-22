<?php
header('Content-Type: application/json');

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
}


$requete = $pdo->prepare("SELECT * FROM `Tags`");
$requete->execute();


$result = $requete->fetchAll();

$retour["success"] = true;
$retour["message"] = "Voici les données";
$retour["Nb lignes"] = count($result);
$retour["Tags"] = $result;

echo json_encode($retour);