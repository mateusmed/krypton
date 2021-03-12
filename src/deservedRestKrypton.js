const execSync = require('child_process').execSync;
const cron = require("node-cron");
const express = require("express");


/**
 *    *    *    *    *    *
 ┬    ┬    ┬    ┬    ┬    ┬
 │    │    │    │    │    │
 │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 │    │    │    │    └───── month (1 - 12)
 │    │    │    └────────── day of month (1 - 31)
 │    │    └─────────────── hour (0 - 23)
 │    └──────────────────── minute (0 - 59)
 └───────────────────────── second (0 - 59, OPTIONAL)
 **/


async function execCommandSync(command){
    execSync(command,{stdio: 'inherit'})
}


async function start(){
    let command = "miner start";
    await execCommandSync(command)
}

async function stop(){
    let command = "miner stop";
    await execCommandSync(command)
}


async function main(){

    console.log("[system is boot] -  init miner automatically ")

    const listTime = ["00 00 * * *",
                      "00 02 * * *",
                      "15 02 * * *",
                      "15 04 * * *",
                      "30 04 * * *",
                      "30 06 * * *",
                      "45 06 * * *",
                      "45 08 * * *",
                      "00 09 * * *",
                      "15 09 * * *",
                      "30 09 * * *",
                      "30 11 * * *",
                      "45 11 * * *",
                      "45 13 * * *",
                      "00 14 * * *",
                      "00 16 * * *",
                      "15 16 * * *",
                      "15 18 * * *",
                      "30 18 * * *",
                      "30 20 * * *",
                      "45 20 * * *",
                      "45 22 * * *",
                      "00 23 * * *"]

    let run = 1;


    const listTest = ["33 12 * * *",
                      "34 12 * * *"];


    for (let time of listTest){

        cron.schedule(time, () => {

            if(run){
                console.log(time, "-> start");
              //  start()
                run = 0
            }else{
                console.log(time, "-> stop");
                //stop()
            }
        });

    }
}



app = express();

main();

app.listen(3000);