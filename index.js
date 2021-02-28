const moment = window.moment
const screenshot = require('screenshot-desktop')

// gobal current second 
let currentSecond = 50*60
const startSecond = currentSecond

const button = document.getElementById('startBtn');

// helper function 
function takeScreenshot(){
  let takeShot = setTimeout(() => {
    var fs = require('fs');
    var dir = './screenshot'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    screenshot({ filename: '.\\screenshot\\'+"countdown-"+
    moment(new Date()).format('YYYY-MM-DD HH-mm-ss') 
    +'.png' })
  }, 1000)
 
}

function secondConvertHHMMSS(sec) {
  return moment("1900-01-01 00:00:00").add(sec, 'seconds').format("HH:mm:ss")
}

function updateScreenTime(sec) {
  document.getElementById('time').innerHTML = secondConvertHHMMSS(sec)
}

function countdownTimer() {
  let timer = setInterval(() => {
    // remove one second
    currentSecond = currentSecond - 1
    // refresh screen
    updateScreenTime(currentSecond)

    // 10 minutes fetal
    if(currentSecond == 10*60){
      fetal()
      takeScreenshot()

     
    }

    // when time reaching 0
    if (currentSecond <= 0) {
      clearInterval(timer)
      document.getElementById('countdownText').innerHTML = "[Finish " + secondConvertHHMMSS(startSecond) +"]"
      // absolute paths work too. so do pngs
      complete()
      takeScreenshot()
    }
  }, 1000)
}

// main

updateScreenTime(currentSecond) // init time screen

// event setting
document.getElementById('startBtn').addEventListener("click", () => {
  countdownTimer()
  document.getElementById('startBtn').style.display = "none"
  document.getElementById('countdownText').style.display = "inline"
})

// document.getElementById('settings').addEventListener("click", () => {

//   createBrowserWindow()
// })



function createBrowserWindow() {

  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 300,
    frame: false,
    transparent:true,
    alwaysOnTop:true,
    width: 280
  });
  win.loadFile('settings.html')
  
  // prevent max window
  win.setMaximizable(false)

 // win.webContents.openDevTools()
}


function complete() {

  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 250,
    frame: false,
    transparent:true,
    alwaysOnTop:true,
    width: 1200
  });
  win.loadFile('complete.html')
  
  // prevent max window
  win.setMaximizable(false)
  win.setIgnoreMouseEvents(true)

  let timer = setTimeout(() => {
    win.close()
  }, 8000)

 //win.webContents.openDevTools()
}


function fetal() {

  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 300,
    frame: false,
    transparent:true,
    alwaysOnTop:true,
    width: 1200
  });
  win.loadFile('fetal.html')
  
  // prevent max window
  win.setMaximizable(false)
  win.setIgnoreMouseEvents(true)
  let timer = setTimeout(() => {
    win.close()
  }, 8000)

 //win.webContents.openDevTools()
}
