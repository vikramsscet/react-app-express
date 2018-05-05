function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function div(x,y){
    return x/y;
}
function multiply(x,y){
    return x*y;
}

function Command(execute, undo, value){
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

function AddHandler(value){
    return new Command(add, subtract, value);
}
function SubtractHandler(value){
    return new Command(subtract, add, value);
}
function DivHandler(value){
    return new Command(div, multiply, value);
}
function MulHandler(value){
    return new Command(multiply, div, value);
}

function Calculator(){
    let commands = [];
    let current = 0;
    return {
        execute : function(command){
            commands.push(command);
            current = command.execute(current, command.value);
            console.log(current);
            return current;
        },
        undo : function(){
            let command = commands.pop();
            current = command.undo(command.value, current);
            return current;
        },
        getCurrentVal : function(){
            return current;
        }
    }
}
let calculator = Calculator();
let calculation = {
    getOutPutVal : function(event){
        return event.target.parentElement.parentElement.previousElementSibling.firstElementChild.value;
    },
    add : function(event){
        let opVal = ~~(this.getOutPutVal(event));
        calculator.execute(new AddHandler(opVal));
        setOutput("",true);
    },
    sub : function(event){
        let opVal = ~~(this.getOutPutVal(event));
        calculator.execute(new SubtractHandler(opVal));
        setOutput("",true);
    },
    div : function(event){
        let opVal = ~~(this.getOutPutVal(event));
        calculator.execute(new DivHandler(opVal))
        setOutput("",true);
    },
    mul : function(event){
        let opVal = ~~(this.getOutPutVal(event));
        calculator.execute(new MulHandler(opVal))
        setOutput("",true);
    },
    equal : function(event){
        console.log(event.target);
        //Calculator.execute(new AddHandler(event.target))
    },
    undo : function(event){
        console.log(event.target);
        //Calculator.execute(new AddHandler(event.target))
    }
}
const setOutput = function(val, clear){
    let output = document.getElementById("output");
    if(clear){
        output.value = "";
    }else{
        output.value = output.value+val;
    }
}

const numbersClickHandler = function(event){
    if(event.target.nodeName==="BUTTON" && event.target.parentElement.id==="numbers" && event.target.id !== "clear"){
        let number = event.target.innerText; 
        setOutput(number);
    }
}

 export {Calculator, setOutput, numbersClickHandler, calculation};