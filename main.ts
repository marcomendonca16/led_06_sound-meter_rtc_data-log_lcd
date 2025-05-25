input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Yes)
    } else {
    	
    }
    lcd1602.setAddress(
    lcd1602.I2C_ADDR.addr1
    )
    lcd1602.putString(
    "SOUND LEVEL",
    3,
    0
    )
    lcd1602.set_LCD_Show(lcd1602.visibled.visible)
    lcd1602.set_backlight(lcd1602.on_off.on)
})
input.onButtonPressed(Button.AB, function () {
    if (true) {
        datalogger.deleteLog()
    } else {
        logging = false
    }
    datalogger.setColumnTitles(
    "RTC",
    "sound level"
    )
})
let nível_de_som = 0
let logging = false
timeanddate.setTime(13, 16, 0, timeanddate.MornNight.AM)
timeanddate.setDate(1, 25, 2025)
timeanddate.advanceBy(timeanddate.secondsSinceReset(), timeanddate.TimeUnit.Seconds)
basic.showIcon(IconNames.Yes)
logging = false
datalogger.setColumnTitles(
"RTC",
"sound level"
)
loops.everyInterval(1000, function () {
    if (logging) {
        datalogger.log(
        datalogger.createCV("RTC", timeanddate.time(timeanddate.TimeFormat.HMMSSAMPM)),
        datalogger.createCV("sound level", input.soundLevel())
        )
    }
})
basic.forever(function () {
    let limiar_som_alto = 0
    let sound_level = 0
    nível_de_som = pins.analogReadPin(AnalogPin.P0)
    if (sound_level > limiar_som_alto) {
        basic.showIcon(IconNames.Confused)
    } else {
        basic.showNumber(input.soundLevel())
    }
    basic.pause(100)
    serial.writeNumbers([input.soundLevel(), 255])
    lcd1602.putNumber(
    input.soundLevel(),
    7,
    1
    )
    basic.pause(1000)
})
