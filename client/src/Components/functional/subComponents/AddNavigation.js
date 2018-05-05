import React from 'react';
import '../../../css/calc.css';
import {setOutput, numbersClickHandler, calculation} from './CalcApi';
const arr = [0,1,2,3,4,5,6,7,8,9];

const AddNavigation = ({navigation}) => {
    return(
        <div className="calcOuter">
            <div className="calcOutput">
                <input type="text" id="output" />
            </div>
            <div className="calcButtonArea" onClick={numbersClickHandler}>
                <div className="calcNumButtonArea" id="numbers">
                    {arr.map(data=>{
                        return <Button value={data} />
                    })}
                    <button className="calcButton" id="clear" onClick={setOutput.bind(this,"", true)}>Clear</button>
                </div>
                <div className="calcCommandButtonArea" id="commands" >
                    <button className="commandButton" id="add" onClick={calculation.add.bind(calculation)}>+</button>
                    <button className="commandButton" id="subtract" onClick={calculation.sub.bind(calculation)}>-</button>
                    <button className="commandButton" id="multiply" onClick={calculation.mul.bind(calculation)}>*</button>
                    <button className="commandButton" id="divide" onClick={calculation.div.bind(calculation)}>/</button>
                    <button className="commandButton" id="equal" onClick={calculation.equal.bind(calculation)}>=</button>
                    <button className="commandButton" id="undo" onClick={calculation.undo.bind(calculation)}>^</button>
                </div>
            </div>
            
        </div>
    );
}

const Button = ({value})=>{
    return (
        <button className="calcButton">{value}</button>
    )
}
export {AddNavigation};