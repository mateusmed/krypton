import express from 'express';
import bodyParser from 'body-parser';


import Board from './entity/board.js';
import Machine from './entity/machine.js';
import InternetModem from './entity/internetModem.js'


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const key = "myHash";


const listMachine = [new Machine("amarela", 2, "A0"),
                     new Machine("azul", 4, "A1"),
                     new Machine("verde01", 7, "A2"),
                     new Machine("verde02", 8, "A3")]


const internetModem = new InternetModem("modemNET", 13);

const arduinoUno = new Board("COM4", listMachine, internetModem);
// const board2 = new Board("COM3");



// TODO FAZER UM ENVIO DE EMAIL PARA MANDAR UM RELATORIO DIARIO



app.get("/internetModem/reboot", async (req,
                                       res) => {

    arduinoUno.internetModem.reboot();
    res.json({ message: "try reboot"});
});


app.get("/:machineName/status", async (req,
                                       res) => {

    let machineName = req.params.machineName;

    let machineFound = arduinoUno.getMachine(machineName);

    let value = 0;

    if(machineFound){
         console.log(`${machineFound.name} obtendo valor`);
         value = await machineFound.status();
    }

    console.log(`${machineFound.name} tem status: ${value}`);


    setTimeout(function(){
        res.json({ message: value});

    }, 1000);
});



app.get("/:machineName/pinOn", async (req,
                                   res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    machineFound.turnOnPin();

    res.json({ message: "ok"});
});

app.get("/:machineName/pinOff", async (req,
                                      res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    machineFound.turnOffPin();

    res.json({ message: "ok"});
});



app.get("/:machineName/on", async (req,
                                                  res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    machineFound.turnOn();

    res.json({ message: "ok"});
});

app.get("/:machineName/off", (req, res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    machineFound.turnOff();

    res.json({ message: "ok"});
});



function startServer() {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

// verificar todas as placas
arduinoUno.board.on('ready', startServer);





