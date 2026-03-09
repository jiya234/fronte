/* CAMERA */

let cameraStream = null;
let cameraOn = false;

async function toggleCamera(){

const button = document.getElementById("cameraBtn");
const video = document.getElementById("video");
const badge = document.getElementById("liveBadge");

try{

if(!cameraOn){

cameraStream = await navigator.mediaDevices.getUserMedia({video:true});

video.srcObject = cameraStream;

button.innerText = "Stop Camera";

badge.style.display = "block";

cameraOn = true;

}else{

cameraStream.getTracks().forEach(track => track.stop());

video.srcObject = null;

button.innerText = "Start Camera";

badge.style.display = "none";

cameraOn = false;

}

}catch(err){

if(err.name === "NotAllowedError"){
alert("Camera permission denied");
}

else if(err.name === "NotFoundError"){
alert("No camera device found");
}

else{
alert("Camera error: " + err.message);
}

}

}



/* VOICE RECOGNITION */

let recognition;
let listening = false;

if ('webkitSpeechRecognition' in window){

recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.onresult = function(event){

let transcript = "";

for (let i = event.resultIndex; i < event.results.length; i++){

transcript += event.results[i][0].transcript;

}

document.getElementById("speechOutput").innerText = transcript;

}

recognition.onend = function(){

if(listening){
recognition.start();
}

}

}else{

alert("Speech Recognition not supported in this browser");

}



function toggleVoice(){

const button = document.getElementById("voiceBtn");
const status = document.getElementById("status");

if(!listening){

recognition.start();

button.innerText = "Stop Listening";

status.innerText = "Status: Listening...";

listening = true;

}else{

recognition.stop();

button.innerText = "Start Listening";

status.innerText = "Status: Idle";

listening = false;

}

}



/* BLUETOOTH */

async function connectBluetooth(){

const status = document.getElementById("btStatus");
const deviceText = document.getElementById("deviceName");

try{

status.innerText = "Scanning devices...";

const device = await navigator.bluetooth.requestDevice({
acceptAllDevices:true
});

deviceText.innerText = "Selected: " + (device.name || "Unknown Device");

status.innerText = "Connecting...";

const server = await device.gatt.connect();

if(server.connected){

status.innerText = "Connected successfully";

}else{

status.innerText = "Connection failed";

}

}catch(error){

status.innerText = "Connection cancelled or failed";

}

}
window.onload = function(){

setTimeout(function(){

document.getElementById("bootScreen").style.display="none";

const dash = document.getElementById("dashboard");
dash.style.display="grid";

setTimeout(()=>{
dash.classList.add("show");
},50);

},2500);

}