import five from "johnny-five";

class Machine{

    constructor(name, pinAction, pinSense) {

        this.name = name;
        this.pinAction = pinAction;
        this.pinSense = pinSense;
    }

    turnOn(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 3000);
    }

    turnOnPin(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});

        pin.high()
    }

    turnOffPin(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});

        pin.low();
    }

    turnOff(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});

        pin.high()

        setTimeout(function(){
            pin.low()

        }, 5000);
    }

    status(){

        //query dont use promise,
        return new Promise((resolve, reject) =>{

            let pin = new five.Pin({pin: this.pinAction,
                                         type: "digital"});

            pin.query( (state) => {
                resolve(state);
            });
        })
    }

    async sensor(){

        let sensor = new five.Sensor(this.pinSense);
        let value = 0;

        // Scale the sensor's data from 0-1023 to 0-10 and log changes
        await sensor.on("change", () => {
            value = this.scaleTo(0, 10);
        });

        //colocar um valor 'enum'
        return value;
    }
}

export default Machine;