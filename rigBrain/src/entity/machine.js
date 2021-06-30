import five from "johnny-five";


//gambi utilizando porta analogica
function machineStatus(stateValue){

    console.log(stateValue);
    if(stateValue >= 900 && stateValue <= 950  ){
        return "ligada";
    }

    return "desligada";
}


class Machine{

    constructor(name, pinAction, pinSense) {

        this.name = name;
        this.pinAction = pinAction;
        this.pinSense = pinSense;
    }

    turnOn(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});
        pin.high()

        setTimeout(function(){
            pin.low()

        }, 3000);
    }

    turnOff(){

        let pin = new five.Pin({pin: this.pinAction,
                                     type: "digital"});

        pin.high()

        setTimeout(function(){
            pin.low()

        }, 5000);
    }

    mySense(){
        let pin = new five.Pin({pin: this.pinSense});

        //query dont use promise,
        return new Promise((resolve, reject) =>{

            pin.query( (state) => {
                resolve(machineStatus(state.value));
            });
        })
    }

    // mySense(){
    //     let sensor = new five.Sensor(this.pinSense);
    //
    //     // Scale the sensor's data from 0-1023 to 0-10 and log changes
    //     return new Promise((resolve, reject) =>{
    //
    //
    //
    //         sensor.on("change", () => {
    //             let value = sensor.scaleTo(0, 10);
    //             resolve(value);
    //         });
    //     });
    // }
}

export default Machine;