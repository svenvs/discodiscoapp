let port;
let lineReader;
const askButton = document.querySelector('#lightconnect');
const redButton = document.querySelector('#red');
const blackoutButton = document.querySelector('#blackout');
const greenButton = document.querySelector('#green');
const blueButton = document.querySelector('#blue');
const rainbowButton = document.querySelector('#rainbow');

blackoutButton.addEventListener('click', ()=>writetoSerial('blackout'));
redButton.addEventListener('click', ()=>writetoSerial('red'));
greenButton.addEventListener('click', ()=>writetoSerial("green"));
blueButton.addEventListener('click', ()=>writetoSerial("blue"));
rainbowButton.addEventListener('click', ()=>writetoSerial("rainbow"));

// window.onbeforeunload = async function(event){
//   event.preventDefault();
//     if(port){
//       await port.forget();
//     }
// }

// request port and make it open for business
askButton.addEventListener('click', async ()=> {
  setLightstatus('portRequested');
  port = await navigator.serial.requestPort();
  setLightstatus('opening port');
  await port.open({ baudRate: 9600 });
  setLightstatus('ready for data');
})

// A known device is connected lets make it open for business
navigator.serial.addEventListener('connect', async (e) => {
    console.log('A KNOWN serial device is connected');
    port = await getports();
    port = port[0];
    await port.open({ baudRate: 9600 });
    setLightstatus('ready for data');
});

navigator.serial.addEventListener('disconnect', (e) => {
  console.log('Serial device is disconnected');
  setLightstatus('discconected');
});

//read messages from the serial device
async function readNewMessage(){
    lineReader = await getLineReader();
    data = await lineReader.read()
    console.log(data);
}


// send a message to a serial device
async function writetoSerial(data){
  const encoder = new TextEncoder();
  const writer = port.writable.getWriter();
  await writer.write(encoder.encode(data));
  writer.releaseLock();
}

async function getLineReader(){
  return port.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TransformStream(new LineBreakTransformer()))
      .getReader();
}

class LineBreakTransformer {
  constructor() {
    this.container = '';
  }
  transform(chunk, controller) {
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach(line => controller.enqueue(line));
  }
  flush(controller) {
    controller.enqueue(this.container);
  }
}

function setLightstatus(text){
  console.log(text);
  document.querySelector('#statusLights').innerText = text;
}

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}