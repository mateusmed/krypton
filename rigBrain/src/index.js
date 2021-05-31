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


const listMachine = [new Machine("vermelha", 7, "A0"),
                     new Machine("azul", 3, "A1")]

const internetModem = new InternetModem("modemNET", 2);

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

    let value;

    if(machineFound){
         value = await arduinoUno.status(machineFound);
    }

    res.json({ message: value});
});


app.get("/:machineName/on", async (req,
                                                 res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    arduinoUno.turnOn(machineFound);

    res.json({ message: "ok"});
});

app.get("/:machineName/off", (req, res) => {

    let machineName = req.params.machineName;
    let machineFound = arduinoUno.getMachine(machineName);

    arduinoUno.turnOff(machineFound);

    res.json({ message: "ok"});
});




function startServer() {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

// verificar todas as placas
arduinoUno.board.on('ready', startServer);





