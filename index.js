const moment = window.moment
const screenshot = require('screenshot-desktop')


// gobal current second 
let currentSecond = 10//0 * 60
const startSecond = currentSecond

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
      document.getElementById('countdownText').innerHTML = "[Finish " + secondConvertHHMMSS(startSecond) +"]"
      // absolute paths work too. so do pngs
      screenshot({ filename: 'C:\\Users\\user\\Desktop\\folder\\'+
      moment(new Date()).format('YYYY-MM-DD HH-mm-ss') 
      +'.png' })
    }
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



