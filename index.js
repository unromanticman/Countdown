const moment = window.moment
const { ipcRenderer } = require('electron')

// gobal current second 
let currentSecond = 50 * 60

const button = document.getElementById('startBtn');

// helper function 
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

    // when time reaching 0
    if (currentSecond <= 0) {
      clearInterval(timer)
    }
    ipcRenderer.send('resize-me-please')

  }, 1000)
}

// main

updateScreenTime(currentSecond) // init time screen

// event setting
document.getElementById('startBtn').addEventListener("click", () => {
  countdownTimer()
  document.getElementById('startBtn').style.display = "none"
  document.getElementById('countdownText').style.display = "block"
})



