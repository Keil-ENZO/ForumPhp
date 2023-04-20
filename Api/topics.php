<?php
header('Content-Type: application/json');
session_start();

// Initialisation de la variable $retour
$retour = [];

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

// Vérification de la session de l'utilisateur connecté
if (!empty($_SESSION['id'])) {
    // Vérification des paramètres de la requête
    if (!empty($_GET["tag_id"]) && isset($_GET["topic"])) {
        $tag_id = $_GET["tag_id"];
        $topic = $_GET["topic"];

        // Ajout du topic dans la base de données
        $requete = $pdo->prepare("INSERT INTO `Topics` (`id`, `tag_id`, `topic`) VALUES (NULL, :tag_id,  :topic);");
        $requete->bindParam(":tag_id", $tag_id);
        $requete->bindParam(":topic", $topic);
        $requete->execute();

        $topic_id = $pdo->lastInsertId();

        $retour["success"] = true;
        $retour["message"] = "Topic ajouté avec succès";
        $retour["results"] = array(
            "id" => $topic_id,
            "tag_id" => $tag_id,
            "topic" => $topic
        );
    } else {
        $retour["success"] = false;
        $retour["message"] = "Erreur : Veuillez remplir tous les champs";
    }
} else {
    $retour["success"] = false;
    $retour["message"] = "Erreur : Utilisateur non connecté";
}

// Supprimez toutes les balises HTML du message de réponse
$retour["message"] = strip_tags($retour["message"]);

echo json_encode($retour);