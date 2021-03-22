const moment = window.moment
const screenshot = require('screenshot-desktop')
const fs = require('fs')
const path = require('path')

// 設定檔
let CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')))

const app = new Vue({
    el: "#app",
    data: {
        currentSecond: CONFIG.countDownSecond,
        isRunning: false,
        status: ''
    },
    computed: {
        time: function () {
            return this.timeFormat(this.currentSecond)
        }
    },
    methods: {
        start: function () {
            this.isRunning = true
            this.status = 'Running...'
            this.startCountDown()
        },
        startCountDown: function () {
            this.timer = window.setInterval(() => {
                // 減一秒
                this.currentSecond = this.currentSecond - 1

                // 剩餘10分鐘時
                if (this.currentSecond === 600) {
                    // 顯示Fetal訊息
                    this.showFetalDialog()
                    // 螢幕截圖紀錄
                    this.takeScreenshot()
                }

                // 倒數計時完成
                if (this.currentSecond <= 0) {
                    // 清除倒數計時
                    this.stopCountDown()
                    // 顯示完成訊息
                    this.showCompleteDialog()
                    // 螢幕截圖紀錄
                    this.takeScreenshot()
                    // 更新狀態
                    this.status = '[Finish ' + this.timeFormat(CONFIG.countDownSecond) + ']'
                }
            }, 1000)
        },
        stopCountDown: function () {
            window.clearInterval(this.timer);
        },
        // 時間轉換格式
        timeFormat: function (sec) {
            return moment("1900-01-01 00:00:00").add(sec, 'seconds').format("HH:mm:ss")
        },
        // 螢幕截圖
        takeScreenshot: function () {
            let takeShot = setTimeout(() => {
                var fs = require('fs');
                var dir = './screenshot'
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                screenshot({
                    filename: '.\\screenshot\\' + "countdown-" +
                        moment(new Date()).format('YYYY-MM-DD HH-mm-ss')
                        + '.png'
                })
            }, 1000)
        },
        // 顯示完成的訊息
        showCompleteDialog: function () {
            const remote = require('electron').remote;
            const BrowserWindow = remote.BrowserWindow;
            const win = new BrowserWindow({
                height: 250,
                frame: false,
                transparent: true,
                alwaysOnTop: true,
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
        },
        // 顯示Fetal的訊息
        showFetalDialog: function () {
            const remote = require('electron').remote;
            const BrowserWindow = remote.BrowserWindow;
            const win = new BrowserWindow({
                height: 300,
                frame: false,
                transparent: true,
                alwaysOnTop: true,
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
    }
})