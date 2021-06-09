import five from 'johnny-five';
import cron from "node-cron";

import isOnline  from "is-online";

const time = "*/1 * * * *";



class Board{

    constructor(portName, machineList, internetModem) {

        this.board = new five.Board({
            port: portName
        });

        this.machineList = machineList;
        this.internetModem = internetModem;

        this.monitoringInternet();
    }

    monitoringInternet(){

        cron.schedule(time, async() => {

            console.log("verifidanco conexão com internet");

            let online = await isOnline({ timeout: 1000 });

            let offline = !online;

            if(offline){

                console.log("sem conexão");
                console.log(`rebootNumber ${this.internetModem.rebootNumber}`);

                if(this.internetModem.rebootNumber === 5){

                    console.log("Deslitando todas as maquinas");

                    this.internetModem.rebootNumber = 0;

                    for (let machine of this.machineList){

                        console.log("desligando maquina: " , machine.name);

                        //verificar se realmente maquina está ligada. sensor
                        machine.turnOff();
                    }

                }

                this.internetModem.reboot();
            }

            if(online){

                console.log("Com conexão");

                // for (let machine of this.machineList){
                //
                //     console.log("Ligando maquina: " , machine.name);
                //     machine.turnOn();
                // }
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



}

export default Board;