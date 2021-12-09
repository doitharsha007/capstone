import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClient } from '../features/ClientSlice';
import { selectinstrument } from '../features/InstrumentSlice';
import {onsend} from '../features/ExchangeSlice';

function Exchange(props){
    const [price,setPrice]=useState(null);
    const [quantity,setQuantity]=useState(null);
    const [direction,setDirection]=useState('');
    const [errmsg,setErrmsg]=useState('');
    const client=useSelector(selectClient);
    const instrument=useSelector(selectinstrument);

    const priceChangeHandler=(event)=>{
        let p=Number(event.target.value);
        let limit=Number(instrument.instrument.facevalue);
        if (limit!==0){
        if(p>=(limit-(0.12*limit)) && p<=(limit+(0.12*limit))){
            setPrice(p);
            setErrmsg('');
        }
        else{
            setErrmsg("Invalid price must be 12%high or low")
        }
    }
    else{
    if(p>0 && p<=limit+0.12*limit){
        setPrice(p);
        setErrmsg('');
    }
    else{
        setErrmsg("Must be 12% high or low to Face Value")
    }
    }
}

    const quantityChangeHandler=(event)=>{
        setQuantity(Number(event.target.value));
        setErrmsg("");
    }

    const directionChangeHandler=(event)=>{
        setDirection(String(event.target.value));
        setErrmsg("");
    }

    const dispatch=useDispatch();
    const next=(e)=>{
        e.preventDefault();
        if(quantity){
            if(direction!=="Select"){
                dispatch(onsend({
                    exchange:{
                        id:client.client.client_id,
                        name:client.client.client_name,
                        custodian_id:client.client.custodian_id,
                        instrumentname:instrument.instrument.name,
                        quantity:quantity,
                        price:price,
                        direction:direction
                    }
                }))
                props.history.push("/final");
            }
            else
            {
                setErrmsg("Select Direction");
            }
        }
        else{
            setErrmsg("Select Quantity");
        }
    }

        return (
            <div>

            <form onSubmit={next}>       
                <div className="container">
                    <div className="row">
                        <br/><br/>
                        <div className="col card align-self-start">
                        <h2 className="text-dark text-center">Exchange DETAILS</h2>
                            <h3 className="text-danger text-center">{errmsg}</h3>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Price :</label>
                                    <div className="col-sm-6">
                                        <input type="text" 
                                        className="form-control" 
                                        placeholder="Enter price"
                                        onChange={priceChangeHandler} required/>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            <div className="inputfields">            
                                <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Enter Quantity :</label>
                                    <div className="col-sm-6">
                                        <select className="form-select" aria-label="Default select example" onChange={quantityChangeHandler} required>
                                            <option defaultValue={null}>Select Quantity</option>
                                            <option>25</option>
                                            <option>50</option>
                                            <option>75</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Direction:</label>
                                    <div className="col-sm-6">
                                        <select className="form-select" aria-label="Default select example" onChange={directionChangeHandler} required>
                                            <option defaultValue={null}>Select </option>
                                            <option >Buy</option>
                                            <option >Sell</option>
                                        </select>
                                    </div>
                                </div>
                            </div><br/>
                            <div className="text-center"><button className="btn btn-success" type="submit">next</button></div>
                        <br/>
                        </div>
                        <div className="col align-self-start">
                            <img src="https://media.istockphoto.com/photos/finance-and-economy-chart-for-dollar-gold-euro-currencies-trading-picture-id1288703928?b=1&k=20&m=1288703928&s=170667a&w=0&h=8u1I5OcP2Cn-_DhNgpQ3M6aw-HebKuMQLj6SpXXb82s="
                                alt="img!"
                                className="rounded w-75"/>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
   
    );
}

export default Exchange;