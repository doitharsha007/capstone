import React, { useState } from 'react';
import ClientServices from '../services/ClientServices';
import CustodianServices from '../services/CustodianServices';

function Settlement(props) {
    const [buycustodian,setBuycustodian]=useState('');
    const [sellcustodian,setSellcustodian]=useState('');
    const [client,setClient]=useState([]);
    const [buyclient,setBuyclient]=useState('');
    const [sellclient,setSellclient]=useState('');

    const custodianChangeHandler=(event)=>{
        let id=String(event.target.value);
        CustodianServices.findBuyercustodian(id).then((res)=>{
            let data=res.data;
            let sum=0;
            for(let i=0;i<data.length;i++)
            sum+=data[i].totalamount;
            setBuycustodian(Number(sum));
        });
        CustodianServices.findSellCustodian(id).then((res)=>{
            let data=res.data;
            let sum=0;
            for(let i=0;i<data.length;i++)
            sum+=data[i].totalamount;
            setSellcustodian(Number(sum));
        })
    }
    const idChangeHandler=(event)=>{
        let id=String(event.target.value);
        if(id.length===6){
            ClientServices.findClient(id).then((res)=>{
               setClient(res.data);
            })
            CustodianServices.findBuyClient(client.client_name).then((res)=>{
                let data=res.data;
                let sum=0;
                for(let i=0;i<data.length;i++)
                sum+=data[i].totalamount;
                setBuyclient(Number(sum));
            })
            CustodianServices.findSellClient(client.client_name).then((res)=>{
                let data=res.data;
                let sum=0;
                for(let i=0;i<data.length;i++)
                sum+=data[i].totalamount;
                setSellclient(Number(sum));
            })
        }
        else{
            setBuyclient(0);
            setSellclient(0);
        }
    }
    return (
        <div>
            <div className="container">
                    <div className="row">
                        <br/><br/>
                        <div className="col card align-self-start">
                        <h2 className="text-dark text-center">CUSTODIAN SETTLEMENT</h2>
                            
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Custodian Id :</label>
                                    <div className="col-sm-6">
                                        <select className="form-select" aria-label="Default select example" onChange={custodianChangeHandler} required>
                                            <option defaultValue={null}>Select</option>
                                            <option>CS001</option>
                                            <option>CS002</option>
                                            <option>CS003</option>
                                            <option>CS004</option>
                                            <option>CS005</option>
                                            <option>CS006</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Buy Value :</label>
                                    <div className="col-sm-6">
                                        <span>{buycustodian}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Sell Value :</label>
                                    <div className="col-sm-6">
                                        <span>{sellcustodian}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Total Portfolio :</label>
                                    <div className="col-sm-6">
                                        <span>{Number(sellcustodian-buycustodian)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col card align-self-start">
                        <h2 className="text-dark text-center">CLIENT SETTLEMENT</h2>
                            
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Client Id :</label>
                                    <div className="col-sm-6">
                                        <input type="text"
                                        placeholder="Enter customer id"
                                        className="form-control"
                                        onChange={idChangeHandler}
                                        required/>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Buy Value :</label>
                                    <div className="col-sm-6">
                                        <span>{buyclient}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Sell Value :</label>
                                    <div className="col-sm-6">
                                        <span>{sellclient}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="inputfields">            
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Total Portfolio :</label>
                                    <div className="col-sm-6">
                                        <span>{Number(sellclient)-Number(buyclient)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Settlement;