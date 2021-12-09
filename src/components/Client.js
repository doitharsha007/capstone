import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import ClientServices from '../services/ClientServices';
import {onsend} from '../features/ClientSlice'

function Client(props) {
    const [id,setId]=useState('');
    const [client,setClient]=useState([]);
    const [errmsg,setErrmsg]=useState('');

    const idChangeHandler=(event)=>{
        let id=String(event.target.value);
        setId(id)
        if(id.length===6){
            
            ClientServices.findClient(id).then((res)=>{
               setClient(res.data);
               setId(id);
            })
            .catch((exc)=>{
                setErrmsg("client not found");
            })
        }
        else{
            setClient([]);
            setErrmsg("")
        }
    }

    const dispatch=useDispatch();

    const next=(e)=>{
        e.preventDefault()
        if(id.length===6){
            setErrmsg("");
            dispatch(onsend({
                client:client
            }))
            props.history.push("/instrument");    
        }
        else{
            setErrmsg("Invalid client");
        }
    }

    return (
        <div>
            <form onSubmit={next}>       
                <div className="container">
                    <div className="row">
                        <div className="col card align-self-start mt-3">
                        <h2 className="text-dark text-center">CLIENT DETAILS</h2>
                            <h3 className="text-danger text-center">{errmsg}</h3>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Client ID</label>
                                    <div className="col-sm-6">
                                        <input type="text"
                                         className="form-control" 
                                         placeholder="Enter Client ID" 
                                         onChange={idChangeHandler} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Client Name</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{client.client_name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Custodian Name</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{client.custodian_name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Transaction limit</label>
                                    <div className="col-sm-6">
                                        <span className="form-control">{client.transaction_limit}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center"><button className="btn btn-success" type="submit">next</button></div>
                       <br/> </div>
                        <div className="col align-self-start">
                            <img src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2xpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="img!"
                                className="rounded "/>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default Client;