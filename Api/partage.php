<?php
header('Content-Type: application/json');
session_start();


// Connexion à la base de données
$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'ForumPhp';
$port = '8889';
try {
    $pdo = new PDO('mysql:host='.$db_host.';port='.$port.';dbname='.$db_db, $db_user, $db_password);
    $retour["success"] = true;
    $retour["message"] = "Connexion réussie à la base de données";
} catch(PDOException $e) {
    $retour["success"] = false;
    $retour["message"] = "Erreur de connexion à la base de données";
}

// Vérification du message et du pseudo de l'utilisateur connecté
// Vérification du message et du pseudo de l'utilisateur connecté
if (!empty($_GET["message"]) && !empty($_SESSION['pseudo'])) {
  
    $requete = $pdo->prepare("INSERT INTO `Messages` (`id`,`message`,`user_id`,`pseudo`) VALUES (NULL, :message, :user_id, :pseudo);");
    $requete->bindParam(":message", $_GET["message"]);
    $requete->bindParam(":user_id", $_SESSION['id']);
    $pseudo = strtoupper(substr($_SESSION['pseudo'], 0, 1));
    $requete->bindParam(":pseudo", $pseudo);

    $requete->execute();

    $message_id = $pdo->lastInsertId(); 

    $message = array(
        "id" => $message_id,
        "message" => $_GET["message"],
        "user_id" => $_SESSION['id'],
        "pseudo" => $pseudo,
        "created_at" => date('Y-m-d H:i:s') 
    );

    $retour["success"] = true;
    $retour["message"] = "Message envoyé";
    $retour["results"] = $message;
} else {
    $retour["success"] = false;
    $retour["message"] = "Erreur : Veuillez remplir tous les champs";
}

echo json_encode($retour);