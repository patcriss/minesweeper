var newGame = 0;
var difficulty = '1';

// On load
function setGrid(l)
{ 
    var board = getEl("square"); // chercher le span
	board.innerHTML = ""; 
	width = height = 28; 
	
	if(l) {
		difficulty = l;
		if (difficulty == '1') m = 10, p = 9;
		else if (difficulty == '2') m = 35, p = 15;
		else if (difficulty == '3') m = 70, p = 19;
	}
	
	n = p; // dimensions de la grille n*n
    prepareTable();
	display();
    newGame = 0;
}


// bouton jouer
function playBtnOnclick()
{
	setGrid();
	clearMines();
	disableGrid(0);
	plantMines(m);
	SndNew.play();
	getEl("btnJouer").innerHTML = "Recommencer";
	getEl("btnJouer").style.backgroundColor = '';
	chronoStopReset();
	newGame = 1;
}

// definir l'emplacement unique des mines
function plantMines(m)
{ 
	var x = 0, y = 0;
	for (var mineCounter = 0; mineCounter < m; mineCounter++)
	{	
		// cherche à poser la mine ailleurs si déjà présente
		do {
			x = getRand(n,0);
			y = getRand(n,0);
		} while (cell[x][y] == 1);

		// place une mine
		cell[x][y] = 1;
	}
}

// enlever les mines de la grille
function clearMines()
{ 
	for (var x = 0; x < n; x++)
	{
		for (var y = 0; y < n; y++){	cell[x][y] = 0;	}
	}
}

// compteur
function count(vName, vValue)
{ 
	var t = 0;
	var z = 0;
	for (var x = 0; x < n; x++){
		for (var y = 0; y < n; y++){
			z = eval(vName+"["+x+"]["+y+"]");
			if (z == vValue){
				t++;}}}
	return t;
}

// crée la grille n*n
function prepareTable() { 
    cell = new Array(n); 			// cell[x][y]
	rightClick = new Array(n);		// grille click droit
    var square = getEl("square"); 	// html Span
	
	// définie la 2d
	for (var i = 0; i < n; i++) 
    {
   	 cell[i] = new Array(n);rightClick[i] = new Array(n);
   	}  

    for (var x = 0; x < n; x++)
    { 
        for (var y = 0; y < n; y++)
        { 
			cell[x][y] = 0;
			rightClick[x][y] = 4;

            var img = document.createElement("img"); 	// nouvelle image
			img.setAttribute("id", "cellImg"+x+"x"+y); 	// assigne IDs : "cellImg00" - "cellImg99"
			img.setAttribute("class", "cell");			// assigne la classe 
			img.setAttribute("src", img0); 				// assigne image
			img.setAttribute("width", width); 
			img.setAttribute("height", height);

			// assigne les scripts
			img.setAttribute("onClick", "javascript:actionClick(" + x + "," + y + ");");	
			img.setAttribute("ondragstart", "javascript:actionClick(" + x + "," + y + ");");	
			img.setAttribute("onContextmenu", "javascript:actionRightClick(" + x + "," + y + ");");

			// ajouter l'élément au html
            square.appendChild(img); 
		}

		// creer et ajouter un br
  		var br = document.createElement("br"); 
   		square.appendChild(br);

		getEl("btnJouer").innerHTML = "Cliquez pour jouer";
	}
}


// click gauche
function actionClick(x,y)
{
	if (rightClick[x][y] < 1 && (cell[x][y] == 1)){

			chronoStop();
			revealMines(); 
			SndFail.play();
			getEl("cellImg"+x+"x"+y).src = imgMineActive;
			getEl("btnJouer").innerHTML = "Rejouer";
			getEl("btnJouer").style.backgroundColor = '#d22';
			disableGrid(4);}
	else if (rightClick[x][y] < 1){
			mineScan(x,y);
			}

	if(newGame == 1 ){
		newGame = 2;
		chronoStart();
	}
	gameCheck();
}	


// click droit
function actionRightClick(x,y)
{
	if (rightClick[x][y] == 0 && cell[x][y] != 2)
	{
		if (mineCount < m)
		{
			getEl("cellImg"+x+"x"+y).src = imgFlag;
			rightClick[x][y] = 1;
		}
	}
	else if (rightClick[x][y] == 1 && cell[x][y] != 2)
	{
		getEl("cellImg"+x+"x"+y).src = imgMark;
		rightClick[x][y] = 2;
	}
	else if (rightClick[x][y] == 2 && cell[x][y] != 2)
	{
		getEl("cellImg"+x+"x"+y).src = imgOff;
		rightClick[x][y] = 0;
	}
	gameCheck();
}


// détecte les mines adjacentes
function mineScan(x,y)
{ 
	var a = 0;
	if (x != 0){ a += cell[x-1][y];//top exist, add top
		if (y != 0) a += cell[x-1][y-1];}	//top and left exist, add topleft
	if (x != (n-1)){ a += cell[x+1][y];//bot exist, add bot
		if (y != (n-1)) a += cell[x+1][y+1];}	//bot and right exist, add botright
	if (y != 0){ a += cell[x][y-1];//left exist, add left
		if (x != (n-1)) a += cell[x+1][y-1];}	//bot and left exist, add botleft								
	if (y != (n-1)){ a += cell[x][y+1];//right exist, add right
		if (x != 0) a += cell[x-1][y+1];}	//top and right exist, add topright
	switch(a){ // What to do according to number of adjacent MINES
		case 0: getEl("cellImg"+x+"x"+y).src = img0;setTimeout("applyToAdjacent("+x+","+y+",actionClick);", 25);break;
		case 1: getEl("cellImg"+x+"x"+y).src = img1;break;
		case 2: getEl("cellImg"+x+"x"+y).src = img2;break;
		case 3: getEl("cellImg"+x+"x"+y).src = img3;break;
		case 4: getEl("cellImg"+x+"x"+y).src = img4;break;
		case 5: getEl("cellImg"+x+"x"+y).src = img5;break;
		case 6: getEl("cellImg"+x+"x"+y).src = img6;break;
		case 7: getEl("cellImg"+x+"x"+y).src = img7;break;
		case 8: getEl("cellImg"+x+"x"+y).src = img8;break;
		default: alert("switch mineScan a= "+a);break;}
	rightClick[x][y] = 4;
}

// envoyer la fonction sur les cases adjacentes
function applyToAdjacent(x,y,f)
{
	if (x !=   0  )	{f(x-1, y );  	//top exist, send top
	if (y !=   0  )   f(x-1,y-1);} 	//top and left exist, send topleft						
	if (x != (n-1))	{f(x+1, y );  	//bot exist, send bot
	if (y != (n-1))   f(x+1,y+1);} 	//bot and right exist, send botright						
	if (y !=   0	 )	{f( x ,y-1); 	//left exist, send left
	if (x != (n-1))   f(x+1,y-1);} 	//bot and left exist, send botleft						
	if (y != (n-1))	{f(x  ,y+1);	//right exist, send right
	if (x !=   0  )   f(x-1,y+1);}	//top and right exist, add topright
	SndClear.play();
}

// afficher messages HTML
function display()
{
	caseCount = count("rightClick", 4); 	// compte les cases vierges clickés
	mineCount = count("rightClick", 1); 	// compte les drapeaux
	var mc = m - mineCount;
	var c = (n*n) -m;
	var cc = c - caseCount;
	getEl("lblMessage").innerHTML = " x " + m;
}

// vérification victoire
function gameCheck()
{ 
	var emptyCases = count("rightClick",0); 	// compte les cases vierges
	var actualFlags = count("rightClick",1);	// compte les drapeaux

	if (emptyCases == (m - actualFlags)) // si aucune case vierges et tout les drapeaux posés
	{
		SndWin.play();
		revealMines();
		disableGrid(4); 
		getEl("btnJouer").innerHTML = "Rejouer";

		chronoStop();
		newScore();		
	}
}

// dévoiler les mines
function revealMines()
{ 
	for (var x = 0; x < n; x++)
	{
		for (var y = 0; y < n; y++)
		{
			if (cell[x][y] == 1)	getEl("cellImg"+x+"x"+y).src = imgMine;
		}
	}
}

// désactiver la grille
function disableGrid(v)
{
	for (var x = 0; x < n; x++) { 
        for (var y = 0; y < n; y++) { 
			if (v==4)	rightClick[x][y] = v;
			else 
			{
				rightClick[x][y] = v;
				getEl("cellImg"+x+"x"+y).src = imgOff;
			}
		}
	}
}

// inscrire le score au leaderboard
function newScore(){
	var username = prompt(chronoScore + " !\n" + "Félicitations! \nInscrivez votre nom et votre score au Leaderboard : ", "Joueur");
	if( username !== null)
	{
		getEl("g_inscription").value = "true";
		getEl("g_username").value = username;
		getEl("g_score").value = chronoScore;
		getEl("g_level").value = difficulty;
		document.forms["gameForm"].submit();
	}
}