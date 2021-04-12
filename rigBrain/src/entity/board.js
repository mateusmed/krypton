import five from 'johnny-five';
import cron from "node-cron";
import dns from 'dns';


const googleUrl = 'www.google.com';

const time = ""


function monitoringInternet(machine){

    cron.schedule(time, () => {

        dns.resolve(googleUrl, async (err) => {

            if (err) {
                console.log("No connection");
                let statusPin = await this.sensor(machine.pinSense);

                if(statusPin === 0){
                    this.turnOff(machine.pinAction);
                }
            }
        });

    });
}

class Board{

    constructor(portName, machineList) {

        this.board = new five.Board({
            port: portName
        });

        this.machineList = machineList;

        for(let machine of this.machineList){
            monitoringInternet(machine)
        }
    }

    turnOn(pinNumber){
        let pin = new five.Pin(pinNumber);
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 3000);
    }

    turnOff(pinNumber){
        let pin = new five.Pin(pinNumber);
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 5000);
    }

    async sensor(pinNumber){

        let sensor = new five.Sensor(pinNumber);
        let value = 0;

        // Scale the sensor's data from 0-1023 to 0-10 and log changes
        await sensor.on("change", () => {
            value = this.scaleTo(0, 10);
        });

        //colocar um valor 'enum'
        return value;
    }
}

export default Board;