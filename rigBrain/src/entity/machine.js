import five from "johnny-five";


// Analog As Digital
// new five.Pin({
//     pin: 14,
//     type: "digital"
// });
function machineStatus(stateValue){

    console.log("========================");
    console.log("statusValue -> ", stateValue);
    console.log("========================");

    if(stateValue){
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



    // Mode	Value	Constant
    // INPUT	0	Pin.INPUT
    // OUTPUT	1	Pin.OUTPUT
    // ANALOG	2	Pin.ANALOG
    // PWM	3	Pin.PWM
    // SERVO	4	Pin.SERVO

    mySense(){
        let pin = new five.Pin({pin: this.pinSense,
                                     mode: 0,
                                     type: "digital"});

        //query dont use promise,
        return new Promise((resolve, reject) =>{

            pin.query( (state) => {

                console.log(state);
                resolve(machineStatus(state.value));
            });
        })
    }

}

export default Machine;