import five from 'johnny-five';
import cron from "node-cron";
// import dns from 'dns';

import isOnline  from "is-online";

const time = "*/1 * * * *";



class Board{

    constructor(portName, machineList) {

        this.board = new five.Board({
            port: portName
        });

        this.machineList = machineList;
        this.monitoringInternet();
    }

    monitoringInternet(){

        cron.schedule(time, async() => {

            console.log("verifidanco conexão com internet");

            let isConnected = await isOnline({ timeout: 1000 });

            if(!isConnected){

                console.log("sem conexão");
                for (let machine of this.machineList){

                    console.log("desligando maquina: " , machine.name);

                    //verificar se realmente maquina está ligada. sensor
                    this.turnOff(machine);
                }
            }
        });
    }

    getMachine(name){

        let machineFound =  this.machineList.find((machine) => {
          return machine.name === name;
        })

        console.log("maquina encontrada: ", machineFound);

        return machineFound;
    }

    turnOn(machine){

        let pin = new five.Pin(machine.pinAction);
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 3000);
    }

    turnOff(machine){

        console.log("Machine ", JSON.stringify(machine));

        let pin = new five.Pin(machine.pinAction);

        pin.high()

        setTimeout(function(){
            pin.low()

        }, 5000);
    }

    async status(machine){

        let pin = new five.Pin(machine.pinAction);

        let myValue = 0;

        await pin.read((error, value) => {
            myValue = value;
        });

        return myValue;
    }


    async sensor(machine){

        let sensor = new five.Sensor(machine.pinSense);
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