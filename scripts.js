
let grille = [];
const bombe = "💣";
let candidatA = [];
let retenuesB = [];
let borduresC = [];

function genererGrille(nbLignes, nbColonnes) {
    grille = [];
    let tailleGrille = nbColonnes * nbLignes;
    let gridWidth = nbColonnes;

    if (tailleGrille === 25) {
        difficulte = 'facile';
    } else if (tailleGrille === 100) {
        difficulte = 'moyen';
    } else if (tailleGrille === 400) {
        difficulte = 'difficile';
    }

  $('html').css('--gridWidth', gridWidth);

      for(let i = 0; i < nbLignes; i++){
        const row = [];
        for(let j = 0; j< nbColonnes; j++){
            row.push(0);
        }
        grille.push(row);
      }

  ajouterBombes(grille, difficulte);

}  

function ajouterBombes(grille, difficulte) {

    let nbBombe;

    if (difficulte === 'facile') {
        nbBombe = 5;
      } else if (difficulte === 'moyen') {
        nbBombe = 30;
      } else if (difficulte === 'difficile') {
        nbBombe = 140;
      } 
 
    let bombCount = 0; 
    while(bombCount < nbBombe ){
   
        let i = Math.floor(Math.random() * grille.length);
        let j = Math.floor(Math.random() * grille[0].length);

        if (grille[i][j] === bombe) {
        } else {
            grille[i][j] = bombe;
        bombCount++;
        }
  } 
 
  let nbLignes = grille.length;
  let nbColonnes = grille[0].length;
  remplirGrille(grille);

}


function remplirGrille(grille) {
    const nbLignes = grille.length;
    const nbColonnes = grille[0].length;

    for (let i = 0; i < nbLignes; i++) {
        for (let j = 0; j < nbColonnes; j++) {
            if (grille[i][j] !== bombe) {
                const compteurBombes = compterBombesVoisines(i, j, grille, nbLignes, nbColonnes);
                grille[i][j] = compteurBombes;
            }
        }
    }
    afficherGrille(grille);
}


function obtenirVoisins(i, j, nbLignes, nbColonnes) {
    const voisins = [];
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            const ni = i + k;
            const nj = j + l;
            if (ni >= 0 && ni < nbLignes && nj >= 0 && nj < nbColonnes) {
                voisins.push([ni, nj]);
            }
        }
    }
    return voisins;
}
 
function compterBombesVoisines(i, j, grille, nbLignes, nbColonnes) {
    let compteurBombes = 0;
    const voisins = obtenirVoisins(i, j, nbLignes, nbColonnes);

    for (const [ni, nj] of voisins) {
        if (grille[ni][nj] === bombe) {
            compteurBombes++;
        }
    }
    return compteurBombes;
}


function afficherGrille(grille) {
    
    const gameContainer = document.getElementById('mine-box');
    gameContainer.innerHTML = ''; 
  
    for (let i = 0; i < grille.length; i++) {
      for (let j = 0; j < grille[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        let valeurCellule = grille[i][j];


        switch(valeurCellule) {
            case 0:
                cell.style.color = "lightgray";
                break;
            case 1:
                cell.style.color = "blue";
                break;
            case 2:
                cell.style.color = "green";
                break;
            case 3:
                cell.style.color = "red";
                break;
            case 4:
                cell.style.color = "purple";
                break;
            case 5:
                cell.style.color = "maroon";
                break;
            case 6:
                cell.style.color = "turquoise";
                break;
            case 7:
                cell.style.color = "black";
                break;
            case 8:
                cell.style.color = "darkgreen";
                break;
        }

        //remove this so we don't show the value
        //cell.textContent = grille[i][j];



        // Code pour gérer le clic
        cell.addEventListener('click', function () {
            const ligne = $(this).data('ligne');
            const colonne = $(this).data('colonne');
            const zoneDiffusion = obtenirCoordonneesZoneDiffusion(grille, ligne, colonne);
            alert(grille[i][j]);

            if (zoneDiffusion === null) {
                alert('Game over! You clicked on a bomb.');
            } else {
                updateView(zoneDiffusion);
            }

            alert(grille[i][j]);
   
});
  
        gameContainer.appendChild(cell);
      }
    }
  }

  function updateView(zoneDiffusion) {
    for (const [i, j] of zoneDiffusion) {
        const cell = document.querySelector(`[data-ligne="${i}"][data-colonne="${j}"]`);
        cell.style.backgroundColor = "white";
    }
}


function obtenirCoordonneesZoneDiffusion(grille) {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[0].length; j++) {

            if(grille[i][j] === bombe){
                return null;

            }else if(grille[i][j] !== 0){
                return [[i,j]];

            }else{
                candidatA = [[i, j]];
            }
            retenuesB = [...candidatA];
            borduresC = [];
            
            while(candidatA.length > 0){
                let candidatCourant = candidatA.pop();
                if(candidatCourant === 0 && !estVoisinDejaPresent(candidatA,[i,j])){
                    candidatA.push([i,j]);
                }else if(candidatCourant != 0 && candidatCourant != bombe && !estVoisinDejaPresent(borduresC, [i,j])){
                    retenuesB.push([i,j]);
                }
            }
                return retenuesB.concat(borduresC);
            }
        }
    }


function estVoisinDejaPresent(listeCoordonnees, voisin){
    //parcourir la liste de coordonnes
    for(let i= 0; i< listeCoordonnees.length; i++){
        if(listeCoordonnees[i][0] === voisin[0] && listeCoordonnees[i][1] === voisin[1]){
            return true;
        }
        return false;
    }

}
const maGille = [[1, 0, 0], [2, 3, 4], [5, 6, 7]];
let res = obtenirCoordonneesZoneDiffusion(grille, 0, 2);
console.log(res);

