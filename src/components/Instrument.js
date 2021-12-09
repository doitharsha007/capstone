import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InstrumentServices from '../services/InstrumentServices';
import {onsend} from '../features/InstrumentSlice'

function Instrument(props) {
    const [id,setId]=useState('');
    const [instrument,setInstrument]=useState([]);
    const [errmsg,setErrmsg]=useState('');

    const dispatch=useDispatch();

    const idChangeHandler=(event)=>{
        let id=String(event.target.value);
        setId(id)
        if(id.length===4){
            InstrumentServices.findInstrument(id).then((res)=>{
               setInstrument(res.data);
               setId(id);
            })
            .catch((exc)=>{
                setErrmsg("Instrument not found");
            })
        }
        else{
            setInstrument([]);
            setErrmsg("")
        }
    }
    const next=(e)=>{
        e.preventDefault();
        if(id.length===4){
            setErrmsg("");
            dispatch(onsend({
                instrument:instrument
            }))
            props.history.push("/exchange");    
        }
        else{
            setErrmsg("Invalid instrument");
        }
    }
    return (
        <div>
            <form onSubmit={next}>       
                <div className="container">
                    <div className="row">
                        <div className="col card align-self-start">
                        <h2 className="text-dark text-center">INSTRUMENT DETAILS</h2>
                            <h3 className="text-danger text-center">{errmsg}</h3>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Instrument ID</label>
                                    <div className="col-sm-6">
                                        <input type="text"
                                         className="form-control" 
                                         placeholder="Enter Instrument ID" 
                                         onChange={idChangeHandler} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Instrument Name :</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{instrument.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Face Value :</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{instrument.facevalue}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Expiry Date :</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{instrument.expiry_date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Minimum quantity :</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{instrument.min_quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center"><button className="btn btn-success" type="submit">next</button></div>
                        </div>
                        <div className="col align-self-start">
                            <img src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGlnZ3klMjBiYW5rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="img!"
                                className="rounded w-75"/>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default Instrument;