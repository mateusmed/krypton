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


const listMachine = [new Machine("amarela", 2, 14),
                     new Machine("azul", 3, 15),
                     new Machine("verde01", 4, 16),
                     new Machine("verde02", 5, 17),
                     new Machine("branca", 6, 18),
                     new Machine("vermelha", 7, 19)]


const internetModem = new InternetModem("modemNET", 12);

const arduinoUno = new Board("/dev/ttyACM0", listMachine, internetModem);

// const arduinoMEGA = new Board("COM4", listMachine, internetModem);
// const arduinoUno = new Board("COM4", listMachine, internetModem);
// const arduinoUno = new Board("COM8", listMachine, internetModem);

// TODO FAZER UM ENVIO DE EMAIL PARA MANDAR UM RELATORIO DIARIO


app.get("/healthcheck", async (req,
                               res) => {

    res.json({ message: "system is up"});
});


app.get("/internetModem/reboot", async (req,
                                        res) => {

    arduinoUno.internetModem.reboot();
    res.json({ message: "try reboot"});
});


app.get("/machines", async (req,
                            res) => {

    res.json({ message: arduinoUno.machineList});
});


app.get("/:machineName/on", async (req,
                                   res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    if(machineFound) {
        machineFound.turnOn();

        res.status(200);
        res.json({message: "ok"});
        return;
    }

    res.status(404);
    res.json({message: "machine not found"});
});

app.get("/:machineName/off", (req,
                              res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    if(machineFound) {
        machineFound.turnOff();

        res.status(200);
        res.json({message: "ok"});
        return;
    }

    res.status(404);
    res.json({message: "machine not found"});
});



app.get("/:machineName/status", async (req,
                                       res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    if(machineFound) {
        let response = await machineFound.mySense();

        res.status(200);
        res.json({message: response});
        return;
    }

    res.status(404);
    res.json({message: "machine not found"});
});


function startServer() {

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

// verificar todas as placas
arduinoUno.board.on('ready', startServer);





