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

    const listJob = [{time:"00 00 * * *", action:1},
                     {time:"00 02 * * *", action:0},
                     {time:"15 02 * * *", action:1},
                     {time:"15 04 * * *", action:0},
                     {time:"30 04 * * *", action:1},
                     {time:"30 06 * * *", action:0},
                     {time:"45 06 * * *", action:1},
                     {time:"45 08 * * *", action:0},
                     {time:"00 09 * * *", action:1},
                     {time:"15 09 * * *", action:0},
                     {time:"30 09 * * *", action:1},
                     {time:"30 11 * * *", action:0},
                     {time:"45 11 * * *", action:1},
                     {time:"45 13 * * *", action:0},
                     {time:"00 14 * * *", action:1},
                     {time:"00 16 * * *", action:0},
                     {time:"15 16 * * *", action:1},
                     {time:"15 18 * * *", action:0},
                     {time:"30 18 * * *", action:1},
                     {time:"30 20 * * *", action:0},
                     {time:"45 20 * * *", action:1},
                     {time:"45 22 * * *", action:0},
                     {time:"00 23 * * *", action:1}]


    for (let job of listJob){

        cron.schedule(job.time, () => {

            if(job.action === 1){
                console.log(job.time, "-> start");
                start()
            }

            if(job.action === 0){
                console.log(job.time, "-> stop");
                stop()
            }
        });
    }
}





app = express();

main();

app.listen(5000);