<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet">
    <title>Inscrivez-vous</title>
    <link rel="stylesheet" href="../Assets/style/style.css">
    <link rel="shortcut icon" href="../Assets/img/logo2.png" type="image/x-icon">
</head>

<body>
    <div class="contentCompte" id="contentCompte">
        <div class="champInfo" id="champInfo">

            <h2>Inscrivez-vous</h2>
            <form id="inscription-form">
                <input class="input" type="text" placeholder="Pseudo" id="pseudo" name="pseudo">
                <input class="input" type="email" placeholder="Email" id="email" name="email">
                <input class="input" type="password" placeholder="Mot de passe" id="mdp" name="mdp">
                <button class="btn" type="submit">S'inscrire</button>
            </form>
            <div id="message"></div>

            <p>Vous avez deja un compte ? <a href="./connexion.php" class="inscriptions">Connectez-vous</a>
            </p>
            <a href=" #">
                <img class="open" src="../Assets/img/info.svg" alt="btnOpen">
            </a>
        </div>
        <?php require './Components/modal.php'; ?>

    </div>

    <!-- <script src="../js/modal.js"></script> -->
    <script src="../js/inscription.js"></script>

</body>

</html>