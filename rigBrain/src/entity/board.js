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


        //todo pensar em habilitar monitoramento por endpoint
        //this.monitoringInternet();


        //todo pensar em deshabilitar monitoramento por endpoint - encerrar cron
    }

    monitoringInternet(){

        cron.schedule(time, async() => {

            console.log("verifidanco conexão com internet");

            let online = await isOnline({ timeout: 1000 });

            let offline = !online;

            if(offline){

                console.log("sem conexão");
                console.log(`rebootNumber ${this.internetModem.rebootNumber}`);

                if(this.internetModem.rebootNumber === 2){

                    this.internetModem.rebootNumber = 0;

                    for (let machine of this.machineList){

                        let statusMachine = await machine.mySense();

                        if(statusMachine === "ligada"){

                            console.log("desligando maquina: " , machine.name);
                            machine.turnOff();
                        }
                    }

                    // mandar email
                }

                this.internetModem.reboot();
            }

            if(online){

                console.log("Com conexão");

                for (let machine of this.machineList){

                    let statusMachine = await machine.mySense();

                    if(statusMachine === "desligada"){

                        console.log(`Maquina: ${machine.name} esta desligada`);
                        console.log("Ligando maquina: " , machine.name);
                        machine.turnOn();
                    }
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



}

export default Board;