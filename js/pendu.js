$(function() {

    // Fonctions
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Fonction qui crée un mot composé uniquemet de # de meme longueur que le mot à trouver
    function constructWord(mot, caracetere) {
        let newW = '';
        for (let i = 0; i < mot.length; i++) {
            newW += caracetere;
        }
        return newW;
    }

    function affichageMotATrouver(mot) {
        for (let i = 0; i < mot.length; i++) {
            $('.word').append('<span>' + mot[i] + '</span>');
            $('.word>span').addClass('ligne-space');
            //$('.word>span').css('visibility', 'visible');
        }
    }

    function tourDeJeu() {
        // nbr de tour
        compteur++;
        // affichage dans le bouton start du compteur
        btn_compteur.innerText = compteur.toString();
        console.log('nbr de fautes: ' + compteur); // ######################################
        // affichage / chagement de l'image du pendu
        $('#img-pendu').attr('src', 'img/Le-Pendu' + (indiceImg + 1) + '.png');
        indiceImg++;
    }

    function winOrLoose() {
        if (propositionComplete === word) {
            alert('Vous avez gagné !!! \n Le jeu est terminé');
        }
        if (compteur === 8) {
            if (propositionComplete === word) {
                alert('Vous avez gagné !!! \n Le jeu est terminé');
            } else {
                alert('Vous avez perdu. \n Le mot à trouver était: ' + word);
            }
        }
    }

    // NE MARCHE PAS
    /*function lire_fichier() {
        $.ajax({
            type: "GET",
            url: '/liste_francais.txt',
            error: function(msg) {
                // message en cas d'erreur :
                alert("Error !: " + msg);
            },
            success: function(data) {
                // affiche le contenu du fichier dans le conteneur dédié :
                $('.test').text(data.split('\n'));
            }
        });
    }*/

    // Variables
    let words = [];
    let btn = $('.btn-change');
    let compteur;
    let word = '';
    let motAffiche = '';
    let resultat;
    let propositionComplete = '';
    let indiceImg = 0;
    let btn_compteur = document.getElementById('start');

    /**
     * Fonction ajax qui va chercher les données contenus dans le fichier json
     */
    $.getJSON('liste_mots.json', function(data) {
        console.log('1-fichier json: ' + data); // #############################################

        $.each(data, function(index, d) {
            //console.log(index);
            //console.log(d);
            // on remplit le tableau words avec les data du json
            words[index] = d;
        })
    });

    // ---------------------------- Click btn 'changer le mot' ------------------------------------

    // Actions
    $('.btn-change').click(function() {
        // vide le contenu des elements
        $('.word').html('');
        $('#choice-letter').val('');
        $('#reponse').val(''); // ne marche pas
        $('.letter').html('');
        btn_compteur.innerText = "start"
        $('#img-pendu').attr('src', 'img/Le-Pendu0.png');
        compteur = 0;
        indiceImg = 0;


        let nbrRandom = getRandomInt(100);
        // selectionne un mot au hasard dans le tableau
        word = words[nbrRandom];
        console.log('2-mot à trouver: ' + word); // ###############################################

        motAffiche = constructWord(word, '#');
        console.log('2-mot affiché: ' + motAffiche); // ###########################################

        affichageMotATrouver(motAffiche);
    });

    // -------------------------------- Click btn 'start' -----------------------------------------

    $('.btn-start').click(function() {
        compteur = 0;
        $('.btn-change').prop("disabled", false);
        $('.btn-validate').prop("disabled", false);
        $('.btn-reponse').prop("disabled", false);

        alert('Vous avez 8 essais pour trouver le mot');

        // --------------------------- Click btn 'ok' ---------------------------------------------

        $('.btn-validate').click(function(e) {
            e.preventDefault();


            // recuperation de la valeur du input
            let proposition = $('#choice-letter').val().toUpperCase();
            console.log('3-lettre proposée: ' + proposition[0]); // ####################################

            if (proposition[0] != null) {
                // affichage des lettres proposées
                $('.letter').append('<span>' + proposition[0] + '</span>');
            }

            // comparaison entre le mot a trouver et la proposition (un character)
            for (let i = 0; i < word.length; i++) {
                // on récupère la lettre du mot à trouver
                let lettreATrouver = word[i].toUpperCase();
                // On l'a compare à la proposition
                if (proposition[0] === lettreATrouver) {
                    // affichage de la lettre trouvée
                    $('.word>span:eq(' + i + ')').text(lettreATrouver);

                    // on récupère la propostion complète /  le mot proposé
                    // on construit le mot proposé au fure et à mesure
                    propositionComplete = $('.word').text();
                    console.log('4-mot proposée: ' + propositionComplete); // #############
                }
            }

            /*if (propositionComplete.indexOf('#') === -1) {
                console.log('plus de #');
            }*/

            word = word.toUpperCase();
            console.log('-----> word initiale: ' + word);
            console.log('-----> lettre proposée: ' + proposition);
            if (word.indexOf(proposition) === -1) {
                console.log('-----> index: ' + word.indexOf(proposition));
                tourDeJeu();
            }

            winOrLoose();

        });

        // -------------------------- Click btn 'proposer une reponse' -------------------------

        $('.btn-reponse').click(function(e) {
            e.preventDefault();
            let reponse = $('#reponse').val().toUpperCase();
            console.log('reponse: ' + reponse);
            if (reponse === word) {
                alert('Félicitations. Vous avez gagné !!! \n Le jeu est terminé');
            } else {
                tourDeJeu();
            }
            winOrLoose();
        });
    });

});


/*$("form").submit(function() {
    alert("Submitted");
});*/