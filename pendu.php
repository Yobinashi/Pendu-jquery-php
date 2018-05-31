<?php
    require("php/dico-fr.php");
?>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Le jeu du pendu</title>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Calligraffitti|Roboto+Mono" rel="stylesheet">
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
    </head>

    <body>
        <div class="container">
            <div class="intro">
                <h1>Le jeu du Pendu</h1>
                <button class="btn-change" disabled="true">Afficher / changer le mot</button>
                <button class="btn-start" id="start">Start</button>
            </div>
            <div class="screen-game">
                <div class="word-content">
                    <p class="word"></p>
                    <p class="word-bar"></p>
                </div>
                <div class="pendu-content">
                    <img id="img-pendu" src="img/Le-Pendu0.png" alt="le jeu du pendu">
                </div>
            </div>
            <div class="letter"></div>
            <div class="choice">
                <input id="choice-letter" type="text" required>
                <button class="btn-validate" disabled="true">OK</button>
                <input type="text" name="reponse" id="reponse">
                <button class="btn-reponse" disabled="true">Proposer une réponse</button>
            </div>
            <!--<form action="">
            First name: <input type="text" name="FirstName" value="Mickey"><br> Last name:
            <input type="text" name="LastName" value="Mouse"><br>
            <input type="submit" value="Submit">
        </form>-->
        </div>

        <script src="js/pendu.js"></script>
    </body>

    </html>