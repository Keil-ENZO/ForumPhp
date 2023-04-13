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

header("Access-Control-Allow-Origin: *");

$method = $_SERVER['REQUEST_METHOD'];

$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if ($method == 'GET') {
    switch ($endpoint) {
        case 'users':
            $requete = $pdo->prepare("SELECT * FROM `Users`");
            $requete->execute();

            $result = $requete->fetchAll();

            $retour["success"] = true;
            $retour["message"] = "Voici les données";
            $retour["Nb lignes"] = count($result);
            $retour["results"] ["Personne"] = $result;

            echo json_encode($retour);
            break;



        default:
            http_response_code(404); 
            echo json_encode(array("message" => "Endpoint non trouvé"));
            break;
    }
} else {
    http_response_code(405); 
    echo json_encode(array("message" => "Méthode non autorisée"));
}
?>