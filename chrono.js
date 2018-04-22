var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
var chronoScore = 0;

function chrono(){
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	if (min < 10){
		min = "0" + min;
	}
	else if( min == 59){
		if( sec == 59) chronoStop;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	chronoScore = min + ":" + sec;
	document.getElementById("chronotime").innerHTML = chronoScore;
	timerID = setTimeout("chrono()", 100);
}


function chronoStart(){
	//document.chronoForm.startstop.value = "stop!";
	//document.chronoForm.startstop.onclick = chronoStop;
	//document.chronoForm.reset.onclick = chronoReset;
	start = new Date();
	chrono();
}


function chronoContinue(){
	//document.chronoForm.startstop.value = "stop!";
	//document.chronoForm.startstop.onclick = chronoStop;
	//document.chronoForm.reset.onclick = chronoReset;
	start = new Date()-diff;
	start = new Date(start);
	chrono();
}


function chronoReset(){
	document.getElementById("chronotime").innerHTML = "00:00";
	start = new Date()
}


function chronoStopReset(){
	document.getElementById("chronotime").innerHTML = "00:00";
	clearTimeout(timerID);
	//document.chronoForm.startstop.onclick = chronoStart;
}


function chronoStop(){
	//document.chronoForm.startstop.value = "start!";
	//document.chronoForm.startstop.onclick = chronoContinue;
	//document.chronoForm.reset.onclick = chronoStopReset;
	clearTimeout(timerID);
}