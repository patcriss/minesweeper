<!doctype html>
<html lang="fr">
<head>
	<title>Le démineur</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
	<meta name="keywords" content="Démineur, Minesweeper, multimédia, création, jeux, jeu, javascript, html, css" >
	<meta name="author" content="Patrick Lamontagne" >
	<link rel="stylesheet" type="text/css" href="styles.css">
	<link rel="shortcut icon" type="image/x-icon" href="media/img/favicon.ico">
	<link rel="icon" type="image/x-icon" href="media/img/favicon.ico">
</head>
<body bgColor=#ffffff onload="setGrid()"  ondragstart="return false;">
	<script src="preload.js"></script>
	<script src="chrono.js"></script>
	<script src="jquery-1.11.2.min.js"></script>
	<!-- Google analytics -->   
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-69581148-1', 'auto');
	  ga('send', 'pageview');

	</script>

		<?php
		include('connexion.php');

		@$level = $_POST["level"];
		@$gUsername = $_POST["g_username"];
		@$gScore = $_POST["g_score"];
		@$gLevel = $_POST["g_level"];
		@$gInscription = $_POST["g_inscription"];

		if(!empty($gUsername) and !empty($gScore) and !empty($gLevel) and $gInscription == "true")
		{
			// inscription des données
			$inscription = "INSERT INTO leaderboard (id, difficulty, username, score) VALUES (NULL, '$gLevel', '$gUsername', '$gScore');";
			$entree = mysql_query($inscription) or die(mysql_error());

			echo "<script> window.location.replace('index.php'); </script>";
		}

		function displayLeaderboard($level){
			// requete du leaderboard
			$query = 
			"SELECT DISTINCT username, MIN( score )  `Record`
				FROM leaderboard
				WHERE difficulty = $level
				GROUP BY username
				ORDER BY  `Record` ASC 
				LIMIT 0 , 30
			";	
			$resultat = mysql_query($query) or die(mysql_error());
			$numrow = mysql_num_rows($resultat);

			if($numrow > 0){

				// affichage du leaderboard
				echo "<table class='leaderboard' id='lead$level'><caption>Classement : ";
				if( $level == 1) echo "Facile";
				else if ($level == 2) echo "Normal";
				else echo "Difficile";
				echo "</caption>";

				$count = 0;
				while($valeur = mysql_fetch_array($resultat) and $count < 50)
				{
					echo utf8_encode(
						"<tr><td>".($count+1).". $valeur[username]</td>
						<td>$valeur[Record]</td></tr>");
					$count++;
				}
				echo "</table>";
			}
		}
		?>

		<div id="game">	
			<h1>Le démineur</h1>
			<form class="Radio" id="gameForm" action="index.php" method="post">
				<input type="hidden" name="g_inscription" id="g_inscription" value="">
				<input type="hidden" name="g_username" id="g_username" value="">
				<input type="hidden" name="g_score" id="g_score" value="">
				<input type="hidden" name="g_level" id="g_level" value="">

					<ul>
						<h2>Difficulté</h2>
						<li id="level1" class="level" value="1" onclick="setGrid('1')" >Facile</li>
						<li id="level2" class="level" value="2" onclick="setGrid('2')" >Normal</li>
						<li id="level3" class="level" value="3" onclick="setGrid('3')" >Difficile</li>
						<div class="nofloat"></div>
					</ul>
			</form>
			
			<div id="grid"  oncontextmenu="return false;" >
			<span id="btnJouer" class="bouton" name="btnJouer" onclick="playBtnOnclick()">Cliquez pour jouer</span>
			<div id="chronotime">00:00</div>	
				<span id="square" class="board"></span>
				<div id="options">
					<span id="messageGauche" >
						<img src="media/img/mine.png" id="imgGauche" width="20px" alt="Mines à trouver">
						<span id="lblMessage">x 10</span>
					</span>
					<div class='nofloat'></div>
				</div>
				
			</div><br>
			<?php
				displayLeaderboard(1);
				displayLeaderboard(2);
				displayLeaderboard(3);
			?>
		</div>

	<script src="jeu.js"></script>

	<script>

	$("document").ready( function(){
		setGrid(1);
		$('.leaderboard').hide();
		$('.leaderboard').eq(0).show();

		// clic sur onglet
		$('li.level').click(function(){
			var selection = '#lead' + $(this).attr('value');
			$('.leaderboard').hide();
			$(selection).show();
		});
	});
	
</script>
	

</body>
</html>