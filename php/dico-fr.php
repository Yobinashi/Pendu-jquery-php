<?php

/**
 *  Lecture du fichier txt / traitement du contenu du fichier
*/


// Declaration des variables
$dico = [];
$words = [];

// Les fonctions
/**
 * Supprimer les accents
 * 
 * @param string $str chaîne de caractères avec caractères accentués
 * @param string $encoding encodage du texte (exemple : utf-8, ISO-8859-1 ...)
 */
function suppr_accents($str, $encoding='utf-8')
{
    // transformer les caractères accentués en entités HTML
    $str = htmlentities($str, ENT_NOQUOTES, $encoding);
 
    // remplacer les entités HTML pour avoir juste le premier caractères non accentués
    // Exemple : "&ecute;" => "e", "&Ecute;" => "E", "à" => "a" ...
    $str = preg_replace('#&([A-za-z])(?:acute|grave|cedil|circ|orn|ring|slash|th|tilde|uml);#', '\1', $str);
 
    // Remplacer les ligatures tel que : , Æ ...
    // Exemple "œ" => "oe"
    $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str);
    // Supprimer tout le reste
    $str = preg_replace('#&[^;]+;#', '', $str);
 
    return $str;
}

function trim_value(&$value)
{
    $value = trim($value);
}

// 1 : on ouvre le fichier
$myfile = fopen('liste_francais.txt', 'r+'); 
//r+ permet d'ouvrir le fichier en lecture et en ecriture

// 2 : on fera ici nos opérations sur le fichier
while(!feof($myfile)){
    // on lit chaque ligne du fichier
    $ligne = fgets($myfile);
    
    // On modifie les mot avec accents en mots sans accents
    $mot = suppr_accents($ligne);
    $mot = strtoupper($mot);

    // on place ces lignes dans un tableau
    array_push($dico, $mot);
    //$dico = preg_split("/[\s,]+/", $ligne);
}

// 3 : quand on a fini de l'utiliser, on ferme le fichier
fclose($myfile);

// Nombre de valeurs contenus dans le tableau
//print_r(count($dico) . '<br/>');

// On obtient un tableau avec 3 keys selectionner au hasrd dans le tableau $dico
$rand_keys = array_rand($dico, 100);

// affichage pour vérifier
for ($i = 0; $i < 100; $i++) {
    $word = $dico[$rand_keys[$i]];
    //echo "resultat: " . $word . "<br/>"; 
    
    // On met les valeurs correspondantes au keys dans un tableau
    array_push($words, $word);
}

// Permet de supprimer les espaces (sauts de ligne) présent à la fin de chaque mot present dans le tableau
array_walk($words, 'trim_value');

// On transforme le tableau avec nos deux mots selectionnés au hasard en objet json
$words_json = json_encode($words);

//print_r($words);
//print_r($words_json);

/**
 * CREATION DU FICHIER JSON
 */

// Nom du fichier à créer
$fichier_json = 'liste_mots.json';

// Ouverture du fichier
$fichier = fopen($fichier_json, 'w+');

// Ecriture dans le fichier
fwrite($fichier, $words_json);

// Fermeture du fichier
fclose($fichier);


