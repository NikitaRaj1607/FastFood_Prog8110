const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHOICE:   Symbol("choice"),
    SANDWICH:   Symbol("sandwich"),
    TYPE:   Symbol("type"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class TimHortonsOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSandwich = "";
        this.sDrinks = "";
        this.sType = "";
        this.sChoice= "";
        this.sOnside="";
    }

    totalprice(){
        var price=0;
        if (this.sSandwich) {
            price = price + 5;
        }
        if (this.sOnside) {
            price = price + 2;
        }
        if (this.sDrinks) {
            price = price + 2;
        }
        price = price * 1.3;

        return price;
    }

    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CHOICE
                aReturn.push("Welcome to Nikita's Tim Hortons.");
                aReturn.push("What meal would you like to order - breakfast or lunch?");
                break;
            case OrderState.CHOICE:
                this.sChoice = sInput;
                this.stateCur = OrderState.SANDWICH
                aReturn.push("Which Sandwich would you like");
                break;
            case OrderState.SANDWICH:
                this.stateCur = OrderState.TYPE
                this.sSandwich = sInput;
                aReturn.push(`What kind of bun on ${this.sSandwich} you would like`);
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.ONSIDE
                this.sType= sInput;
                aReturn.push("What would you like to have on side - Donut or Muffins?");
                break;
            case OrderState.ONSIDE:
                this.stateCur = OrderState.DRINKS
                this.sOnside= sInput;
                aReturn.push("What would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push(`Total price is $ ${this.totalprice().toFixed(2)} including taxes`);
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSandwich} on ${this.sType} bun with ${this.sOnside} `);
                if(this.sDrinks){
                    aReturn.push(`with the drink of ${this.sDrinks}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}