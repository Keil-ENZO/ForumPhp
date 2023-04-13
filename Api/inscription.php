<?php
header('Content-Type: application/json');

session_start();
$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'ForumPhp';
$port = '8889';

try {
    $pdo = new PDO('mysql:host='.$db_host.';port='.$port.';dbname='.$db_db, $db_user, $db_password);
    $retour["success"] = true;
	$retour["message"] = "Erreur de connexion à la base de reussite";

} catch(PDOException $e) {
	$retour["success"] = false;
	$retour["message"] = "Erreur de connexion à la base de données";
}
if (!empty($_GET['pseudo']) && !empty($_GET['email']) && !empty($_GET['mdp'])) {
    // Vérifier si l'email et le pseudo existent déjà dans la base de données
    $checkUser = $pdo->prepare("SELECT * FROM `Users` WHERE `pseudo` = :pseudo OR `email` = :email;");
    $checkUser->bindParam(":pseudo", $_GET["pseudo"]);
    $checkUser->bindParam(":email", $_GET["email"]);
    $checkUser->execute();

    if ($checkUser->rowCount() > 0) {
        // L'utilisateur existe déjà, renvoyer un message d'erreur
        $retour["success"] = false;
        $retour["message"] = "Erreur : cet utilisateur existe déjà";
        echo json_encode($retour); // Convertir le message en JSON
    } else {
        // Hacher le mot de passe avant de l'insérer dans la base de données
        $passwordHash = password_hash($_GET["mdp"], PASSWORD_DEFAULT);
        
        // Insérer l'utilisateur dans la base de données
        $insertUser = $pdo->prepare("INSERT INTO `Users` (`id`, `pseudo`, `email`, `mdp`) VALUES (NULL, :pseudo, :email, :mdp);");
        $insertUser->bindParam(":pseudo", $_GET["pseudo"]);
        $insertUser->bindParam(":email", $_GET["email"]);
        $insertUser->bindParam(":mdp", $passwordHash );

        $insertUser->execute();

        // Connexion réussie
        $selectUser = $pdo->prepare("SELECT * FROM `Users` WHERE `pseudo` = :pseudo && `email` = :email;");
        $selectUser->bindParam(":pseudo", $_GET["pseudo"]);
        $selectUser->bindParam(":email", $_GET["email"]);
        $selectUser->execute();

        if ($selectUser->rowCount() > 0) {
            $user = $selectUser->fetch();
            if (password_verify($_GET["mdp"], $user["mdp"])) {
                // Le mot de passe est correct, connecter l'utilisateur
                $_SESSION['pseudo'] = $user['pseudo'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['id'] = $user['id'];

                $retour["success"] = true;
                $retour["message"] = "Création du compte réussie";
                $retour["results"] = array();
                echo json_encode($retour); // Convertir le message en JSON
            } else {
                $retour["success"] = false;
                $retour["message"] = "Erreur : Impossible de créer le compte";
                echo json_encode($retour); // Convertir le message en JSON
            }
        } else {
            $retour["success"] = false;
            $retour["message"] = "Erreur : Impossible de créer le compte";
            echo json_encode($retour); // Convertir le message en JSON
        }
    }

} else {
    $retour["success"] = false;
    $retour["message"] = "Veuillez remplir tous les champs";

    echo json_encode($retour); // Convertir le message
}