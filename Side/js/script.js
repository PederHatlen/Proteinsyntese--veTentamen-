let videoEl = document.getElementById("video");
let playPauseEl = document.getElementById("playPause");
let playPauseImgEl = document.getElementById("playPauseImg");
let playPauseTextEl = document.getElementById("playPauseText");

let molekylTextEl = document.getElementById("molekylText");
let atomCountEl = document.getElementById("atomCount");
let atomRessEl = document.getElementById("atomRess");
let atomName = null;

let dnaTextEl = document.getElementById("dnaText");
let dnaErrorEl = document.getElementById("dnaError");
let dnaOutTbl = document.getElementById("dnaOutTbl");


playPauseEl.addEventListener("click", (e)=>{
	if (videoEl.paused) {
		videoEl.play();
		playPauseImgEl.alt = "Pause";
		playPauseImgEl.src = "media/pause.svg";
		playPauseTextEl.innerHTML = "Pause";
	}else {
		videoEl.pause();
		playPauseImgEl.alt = "Play";
		playPauseImgEl.src = "media/play.svg";
		playPauseTextEl.innerHTML = "Play";
	}
});

Array.from(document.getElementsByClassName("molekylIMG")).map(e=>{
	e.addEventListener("click", molekylClick);
});

function molekylClick(e){
	e.preventDefault();
	atomName = e.target.alt;
	console.log(e);
	molekylTextEl.innerHTML = atomName;
	calcAtom();
}

atomCountEl.addEventListener("input", calcAtom);

function calcAtom() {
	if (atomName == null) {atomRessEl.innerHTML = "Velg et atom/molekyl først"; return;}
	if (atomCountEl.value > 50) {atomRessEl.innerHTML = "Det er et for stort tall."; return;}
	if (atomCountEl.value == 0) {atomRessEl.innerHTML = "Velg en atom mengde."; return;}
	if (atomCountEl.value % 1) {atomRessEl.innerHTML = "Tallet må være heltall."; return;}

	let ress = "Den kjemiske formelen blir ";
	switch (atomName) {
		case "Oksygen":
			ress += `O<sub>${atomCountEl.value}</sub>H<sub>2</sub>`;
			break;
		case "Nitrogen":
			ress += `N<sub>${atomCountEl.value}</sub>H<sub>${Number(atomCountEl.value)+2}</sub>`;
			break;
		case "Karbon":
			ress += `K<sub>${atomCountEl.value}</sub>H<sub>${2 * Number(atomCountEl.value) + 2}</sub>`;
			break;
	}
	atomRessEl.innerHTML = ress;
}


let aminoSyrer = {"GCU":"Alanin", "GCC":"Alanin", "GCA":"Alanin", "GCG":"Alanin", "UGU":"Cystein", "UGC":"Cystein", "UUU":"Fenylalanin", "UUC":"Fenylalanin", "CAA":"Glutamin", "CAG":"Glutamin", "UGG":"Tryptofan"};
let aminoArr = {"Alanin":0, "Cystein":0, "Fenylalanin":0, "Glutamin":0, "Tryptofan":0};

dnaTextEl.addEventListener("input", checkDna);
function checkDna(){
	let text = dnaTextEl.value.toUpperCase();
	dnaOutTbl.innerHTML = "";
	dnaErrorEl.innerHTML = "";
	if (text == "") {return;}

	if(text.match(/[^ACTG]/gi) || text.length % 3 != 0){dnaErrorEl.innerHTML = "Det er ikke en gyldig DNA-streng."; return;}
	text = text.replace(/[T]/gi, "U");
	
	text.match(/.{1,3}/g).map(s=>{aminoArr[aminoSyrer[s]] += 1;});

	dnaOutTbl.innerHTML = `<tr><th>Aminosyre</th><th>Mengde</th></tr>`;
	for (const o in aminoArr){dnaOutTbl.innerHTML += `<tr><td>${o}</td><td>${aminoArr[o]}</td><tr>`;}
}
checkDna();

// Alanin, Cystein, Fenylalanin, Glutamin og Tryptofan