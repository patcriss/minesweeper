var n = 3;
var m = 0;
var p = 0;
var cell;
var rightClick;
var width = 28;
var height = 28;
var mineCount = 10;
var caseCount = 10;

// ../img
var img0="media/img/actif.png";
var img1="media/img/1.png";
var img2="media/img/2.png";
var img3="media/img/3.png";
var img4="media/img/4.png";
var img5="media/img/5.png";
var img6="media/img/6.png";
var img7="media/img/7.png";
var img9="media/img/8.png";
var imgMineActive="media/img/mine2.png";
var imgMine = "media/img/mine.png";
var imgOff = "media/img/inactif1.png";
var imgFlag = "media/img/flag1.png";
var imgMark = "media/img/mark1.png";
var gameOn = 0;
//RAND Number//
function getRand(nb,start){var r = Math.floor(Math.random()* nb + start); return r;}
// getElementById //
function getEl(id){return document.getElementById(id);}
// change background
function backgroundColor(){
	var s = getEl("selectColor").value;
	document.body.style.backgroundColor = '#' + s;}
// Sound Preload
var SndClear = new Audio("media/sound/clear.mp3");
var SndFail = new Audio("media/sound/fail.mp3");
var SndNew = new Audio("media/sound/new.mp3");
var SndWin = new Audio("media/sound/victory.wav");
//Image preload

Image1= new Image(28,28);
Image1.src = "media/img/inactif1.png";
Image4= new Image(28,28);
Image4.src = "media/img/mark1.png";
Image7= new Image(28,28);
Image7.src = "media/img/flag1.png";
Image10= new Image(28,28);
Image10.src = "media/img/mine.png";
Image11= new Image(28,28);
Image11.src = "media/img/mine2.png";
Image12= new Image(28,28);
Image12.src = "media/img/actif.png";
Image13= new Image(28,28);
Image13.src = "media/img/1.png";
Image14= new Image(28,28);
Image14.src = "media/img/2.png";
Image15= new Image(28,28);
Image15.src = "media/img/3.png";
Image16= new Image(28,28);
Image16.src = "media/img/4.png";
Image17= new Image(28,28);
Image17.src = "media/img/5.png";
Image18= new Image(28,28);
Image18.src = "media/img/6.png";
Image19= new Image(28,28);
Image19.src = "media/img/7.png";
Image20= new Image(28,28);
Image20.src = "media/img/8.png";