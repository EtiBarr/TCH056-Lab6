let grille = [];
const bombe = "💣";

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


function remplirGrille(grille){
    let nbLignes = grille.length;
    let nbColonnes = grille[0].length;

    //parcourir grille
    for(let i =0; i < nbLignes; i++){
        for(let j = 0; j < nbColonnes; j++){
            
         let compteurBombes = 0;
            if(grille[i][j] !== bombe){ //si la cellule ne contient pas de bombe
                //compter le nombre de bombes
                for(let k= -1; k<= 1; k++){ //parcours les lignes voisines -1 0 +1
                    for(let l= -1; l<= 1; l++){ //parcours les colonnes voisines -1 0 +1
                        let ni = i + k //pour avancer ou reculer les lignes
                        let nj = j + l //pour avancer ou reculer les colonnes
                    
                        if(ni >=0 && ni < nbLignes && nj >= 0 && nj < nbColonnes){ //verifier que les cellules ne depassent pas la grille
                            if(grille[ni][nj] === bombe){ //si les cellules voisines seulement ont une bombe
                                compteurBombes++;
                            }
                        }

                    }
                

                grille[i][j]= compteurBombes;
                }
            }
            
        }

    }
    afficherGrille(grille);
}


 
function afficherGrille(grille) {
    
    const gameContainer = document.getElementById('mine-box');
    gameContainer.innerHTML = ''; 
  
    for (let i = 0; i <= grille.length; i++) {
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


        cell.textContent = grille[i][j];
        gameContainer.appendChild(cell);
      }
    }
  }