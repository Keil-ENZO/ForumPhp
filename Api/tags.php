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


// Vérification de la session de l'utilisateur connecté
if (!empty($_SESSION['id'])) {
    // Vérification du tag et ajout dans la base de données
    if (!empty($_GET["tag"])) {
        $requete = $pdo->prepare("INSERT INTO `Tags` (`id`, `tag`) VALUES (NULL, :tag);");
        $requete->bindParam(":tag", $_GET["tag"]);
        $requete->execute();

        $tag_id = $pdo->lastInsertId(); 

        $tag = array(
            "id" => $tag_id,
            "tag" => $_GET["tag"]
        );

        $retour["success"] = true;
        $retour["message"] = "Tag ajouté avec succès";
        $retour["results"] = $tag;
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