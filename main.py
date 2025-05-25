def on_button_pressed_a():
    global logging
    logging = not (logging)
    if logging:
        basic.show_icon(IconNames.YES)
    else:
        pass
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global logging
    if True:
        datalogger.delete_log()
    else:
        logging = False
    datalogger.set_column_titles("RTC", "sound level")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

nível_de_som = 0
logging = False
timeanddate.set_time(12, 30, 0, timeanddate.MornNight.AM)
timeanddate.set_date(1, 20, 2025)
timeanddate.advance_by(timeanddate.seconds_since_reset(),
    timeanddate.TimeUnit.SECONDS)
basic.show_icon(IconNames.YES)
logging = False
datalogger.set_column_titles("RTC", "sound level")

def on_every_interval():
    if logging:
        datalogger.log(datalogger.create_cv("RTC", timeanddate.date(timeanddate.DateFormat.YYYY_MM_DD)),
            datalogger.create_cv("sound level", input.sound_level()))
loops.every_interval(500, on_every_interval)

def on_forever():
    global nível_de_som
    limiar_som_alto = 0
    sound_level = 0
    nível_de_som = pins.analog_read_pin(AnalogPin.P0)
    if sound_level > limiar_som_alto:
        basic.show_icon(IconNames.CONFUSED)
    else:
        basic.show_icon(IconNames.ASLEEP)
    basic.pause(100)
    serial.write_numbers([input.sound_level(), 255])
basic.forever(on_forever)


