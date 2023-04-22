<?php
session_start();
if(!$_SESSION['pseudo']) {
    header('Location: connexion.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet">
    <title>Forum</title>
    <link rel="stylesheet" href="../Assets/style/style.css">
</head>

<body>

    <nav>
        <div class="topbar" data-aos="fade-down" data-aos-delay="400">
            <div>
                <h2 id="compte" class="compte"><?php echo ucfirst($_SESSION['pseudo'][0])?></h2>
            </div>
            <div id="cardInfo" class="card-info">
                <div class="parametre">
                    <a href="#"><img class="close" src="../Assets/img/closeWhite.svg" alt="btn close">
                    </a>
                    <a href="#" class="mode"><img id="moon" src="../Assets/img/moon.svg" alt=""></a>
                </div>

                <p><strong>Email:</strong> <br><?php echo $_SESSION['email']?></p>
                <p><strong>Pseudo:</strong> <br><?php echo $_SESSION['pseudo']?></p>
                <input type="submit" id="deconnexion" class="btn" value="Se Deconnecter">
            </div>

            <div><a href="../index.html"><img class="logo2" src="../Assets/img/logo.png" alt="Logo Forum"></a></div>

            <div class="search">
                <input id="search" type="search" class="input" placeholder="Recherche">
                <img id="iconSearch" onclick="searchHandler()" class="icon" src="../Assets/img/search.svg" alt="">
            </div>

        </div>
    </nav>

    <main>
        <div class="container">

            <div class="menuTag" data-aos="fade-up-left" data-aos-delay="300">
                <ul id="tags">
                    <li>
                        <h3>#Tags</h3>
                        <img src="../Assets/img/add.svg" onclick="AddTags()" class="add" id="addTags" alt="">
                        <ul id="tagList"></ul>
                    </li>
                </ul>
            </div>



            <div class="content">
                <div class="share" data-aos="flip-right" data-aos-offset="200" data-aos-delay="50"
                    data-aos-duration="1000" data-aos-easing="ease-in-out">
                    <textarea placeholder="Que voulez vous dire ?" class="inputShare" id="textArea"></textarea>
                    <!-- Btn de partage -->
                    <input type="submit" value="Partager" id="shareBtn" class="btn">
                </div>
                <div class="message" id="message"></div>
            </div>


            <div class="menuTopic" data-aos="fade-up-right" data-aos-delay="300">
                <ul id="topic">
                    <li>
                        <h3>Topics</h3><img src="../Assets/img/add.svg" onclick="AddTopics()" class="add" id="addTopics"
                            alt="">
                    </li>
                </ul>
            </div>

        </div>

    </main>

    <script src="../js/main.js"></script>
    <script src="../js/topBar.js"></script>
    <script src="../js/partage.js"></script>
    <script src="../js/ajoutTags.js"></script>
    <script src="../js/ajoutTopics.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
    AOS.init();
    </script>

    <script>

    </script>

</body>

</html>