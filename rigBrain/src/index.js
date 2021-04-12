import express from 'express';
import bodyParser from 'body-parser';


import Board from './entity/board.js';
import Machine from './entity/machine.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const key = "myHash";


const listMachine = [new Machine("vermelha", 2, "A0"),
                     new Machine("azul", 3, "A1")]

const board1 = new Board("COM4", listMachine);
// const board2 = new Board("COM3");


app.get("/{machine}/status", (req, res) => {
    res.json({ message: 'success!'});
});


app.get("/{board}/{pin}/off", (req, res) => {
    res.json({ message: 'success!'})
});

app.get("/{board}/{pin}/off", (req, res) => {
    res.json({ message: 'success!'})
});





function startServer() {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

// verificar todas as placas
board1.on('ready', startServer);





