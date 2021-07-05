import five from "johnny-five";


//gambi utilizando porta analogica

// Analog As Digital
// new five.Pin({
//     pin: 14,
//     type: "digital"
// });


function machineStatus(stateValue){

    console.log("========================");
    console.log("statusValue -> ", stateValue);
    console.log("========================");

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

}

export default Machine;