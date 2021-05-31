import five from "johnny-five";

class Machine{

    constructor(name, pinAction, pinSense) {

        this.name = name;
        this.pinAction = pinAction;
        this.pinSense = pinSense;
    }

    turnOn(){

        let pin = new five.Pin(this.pinAction);
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 3000);
    }

    turnOff(){

        let pin = new five.Pin(this.pinAction);

        pin.high()

        setTimeout(function(){
            pin.low()

        }, 5000);
    }

    async status(){

        let pin = new five.Pin(this.pinAction);

        let myValue = 0;

        await pin.read((error, value) => {
            myValue = value;
        });

        return myValue;
    }

    async sensor(machine){

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