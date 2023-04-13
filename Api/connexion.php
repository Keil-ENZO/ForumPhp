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
    $retour["message"] = "Connexion à la base de reussite";
} catch (PDOException $e) {
    $retour["success"] = false;
    $retour["message"] = "Erreur de connexion à la base de données";
}


if (!empty($_GET['pseudo']) && !empty($_GET['mdp'])) {

    $passwordHash = password_hash($_GET["mdp"], PASSWORD_DEFAULT);

    $recupUsers = $pdo->prepare("SELECT * FROM `Users` WHERE `pseudo` = :pseudo");
    $recupUsers->bindParam(":pseudo", $_GET["pseudo"]);
    $recupUsers->execute();

    if($recupUsers->rowCount() > 0) {
        $user = $recupUsers->fetch();
        if (password_verify($_GET["mdp"], $user["mdp"])) {
            // Le mot de passe est correct, connecter l'utilisateur
            $_SESSION['pseudo'] = $user['pseudo'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['id'] = $user['id'];

            $retour["success"] = true;
            $retour["message"] = "Connexion réussie";

        } else {
            $retour["success"] = false;
            $retour["message"] = "Erreur : mot de passe incorrect";
        }
    } else {
        $retour["success"] = false;
        $retour["message"] = "Erreur : cet utilisateur n'existe pas";
    }

} else {
    $retour["success"] = false;
    $retour["message"] = "Erreur : tous les champs doivent être remplis";
}

echo json_encode($retour); // Convertir le message en JSON