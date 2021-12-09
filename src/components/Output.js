import React from 'react';
import { useSelector } from 'react-redux';
import { selectFinal } from '../features/FinalSlice';

function Output(props) {
    const output=useSelector(selectFinal);

    const send=(e)=>{
        e.preventDefault()
        props.history.push("/client");
    }
    return (
        <div className="out-div">
            {
             output.matched?
             <p className="text-success">Matched to a order</p>:
             <p className="text-danger">updated order Waiting for a Match</p>   
            }
            <button className="btn btn-success" onClick={send}>New</button>
        </div>
    );
}

export default Output;