import five from "johnny-five";


class InternetModem{

    constructor(name, pinAction) {
        this.name = name;
        this.pinAction = pinAction;
        this.rebootNumber = 0;
    }


    reboot(){

        //normalmente aberto

        let pin = new five.Pin(this.pinAction);
        pin.high()

        //desligando por 10 segundos
        setTimeout(function(){
            pin.low()

        }, 10000);

        this.rebootNumber = this.rebootNumber + 1;
    }

}


export default InternetModem;