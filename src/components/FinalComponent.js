import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectexchange } from '../features/ExchangeSlice';
import ExchangeServices from '../services/ExchangeServices';
import {onConfirm} from '../features/FinalSlice';

function FinalComponent(props) {
    const exchange=useSelector(selectexchange);
    const [errmsg,setErrmsg]=useState('');

    let buyer={
        buyer_id:String(exchange.exchange.id),
        buyer_name:String(exchange.exchange.name),
        custodian_id:String(exchange.exchange.custodian_id),
        instrumentname:String(exchange.exchange.instrumentname),
        price:String(exchange.exchange.price),
        quantity:String(exchange.exchange.quantity)
    };
    let buyercustodian={
        buyer:exchange.exchange.name,
        buyercustodian:exchange.exchange.custodian_id,
        seller:'',
        sellercustodian:'',
        instrument:exchange.exchange.instrumentname,
        quantity:exchange.exchange.quantity,
        price:exchange.exchange.price,
        totalamount:exchange.exchange.quantity*exchange.exchange.price
    }
    let seller={
        seller_id:String(exchange.exchange.id),
        seller_name:String(exchange.exchange.name),
        custodian_id:String(exchange.exchange.custodian_id),
        instrumentname:String(exchange.exchange.instrumentname),
        price:String(exchange.exchange.price),
        quantity:String(exchange.exchange.quantity)
    };
    let sellercustodian={
        seller:exchange.exchange.name,
        sellercustodian:exchange.exchange.custodian_id,
        buyer:'',
        buyercustodian:'',
        instrument:exchange.exchange.instrumentname,
        quantity:exchange.exchange.quantity,
        price:exchange.exchange.price,
        totalamount:exchange.exchange.quantity*exchange.exchange.price
    }
    const dispatch=useDispatch();

    const next=(e)=>{
        e.preventDefault();
        if(exchange.exchange.direction==="Buy"){
        ExchangeServices.findSeller(buyer).then((res)=>{
            console.log(res.data);
            let s=res.data;
            if(s.length>0){
            buyercustodian.seller=String(s[0].seller_name);
            buyercustodian.sellercustodian=String(s[0].custodian_id);
            ExchangeServices.addCustodian(buyercustodian);
            ExchangeServices.deleteSeller(s[0].id);
            dispatch(onConfirm({
                matching:true
            }));
            props.history.push("/output");
            }
            else{
                ExchangeServices.findPartialSeller(buyer).then((res)=>{
                    let s=res.data;
                    if(s.length>0){
                        for(let i=0;i<s.length;i++){
                            if(buyer.quantity===0)
                            break;
                            if(s[i].quantity>buyer.quantity){
                                s[i].quantity-=Number(buyer.quantity);
                                ExchangeServices.updateSeller(s[i]);
                                buyercustodian.seller=String(s[i].seller_name);
                                buyercustodian.sellercustodian=String(s[i].custodian_id);
                                buyercustodian.totalamount=Number(s[i].quantity)*Number(s[i].price);
                                ExchangeServices.addCustodian(buyercustodian);
                                buyer.quantity=Number(0);
                                dispatch(onConfirm({
                                    matched:true
                                }));
                                props.history.push("/output");
                            }
                            else{
                                buyer.quantity=Number(buyer.quantity)-s[i].quantity;
                                buyercustodian.quantity=Number(s[i].quantity);
                                buyercustodian.seller=String(s[i].seller_name);
                                buyercustodian.sellercustodian=String(s[i].custodian_id);
                                buyercustodian.totalamount=Number(buyer.quantity)*Number(buyer.price);
                                ExchangeServices.addCustodian(buyercustodian);
                                ExchangeServices.deleteSeller(s[i].id);
                                dispatch(onConfirm({
                                    matched:true
                                }));
                                props.history.push("/output");
                            }
                        }
                        console.log(buyer);
                        if(buyer.quantity!==0){
                            ExchangeServices.addBuyer(buyer);
                            dispatch(onConfirm({
                                matched:true
                            }));
                            props.history.push("/output");
                        }
                    }
                })
            }
            
        }).catch(
            setErrmsg("no match")
        );
        if(errmsg.length>0){
            setErrmsg('');
            ExchangeServices.addBuyer(buyer);
            dispatch(onConfirm({
                matched:false
            }));
            props.history.push("/output");
        }
       
    }
    else{
        ExchangeServices.findBuyer(seller).then((res)=>{
            let b=res.data;
            if(b.length>0){
            sellercustodian.buyer=String(b[0].buyer_name);
            sellercustodian.buyercustodian=String(b[0].custodian_id);
            ExchangeServices.addCustodian(sellercustodian);
            ExchangeServices.deleteBuyer(b[0].id);
            dispatch(onConfirm({
                matched:true
            }));
            props.history.push("/output");
            }
            else{
                ExchangeServices.findPartialBuyer(seller).then((res)=>{
                    let b=res.data;
                    if(b.length>0){
                        for(let i=0;i<b.length;i++){
                            if(seller.quantity===0)
                            break;
                            if(b[i].quantity>seller.quantity){
                                b[i].quantity-=Number(seller.quantity);
                                seller.quantity=Number(0);
                                ExchangeServices.updateBuyer(b[i]);
                                sellercustodian.buyer=String(b[i].buyer_name);
                                sellercustodian.buyercustodian=String(b[i].custodian_id);
                                ExchangeServices.addCustodian(sellercustodian);
                                dispatch(onConfirm({
                                    matched:true
                                }));
                                props.history.push("/output");
                            }
                            else{
                                seller.quantity=Number(seller.quantity)-b[i].quantity;
                                sellercustodian.quantity=Number(b[i].quantity);
                                sellercustodian.buyer=String(b[i].buyer_name);
                                sellercustodian.buyercustodian=String(b[i].custodian_id);
                                ExchangeServices.addCustodian(sellercustodian);
                                ExchangeServices.deleteBuyer(b[i].id);
                                dispatch(onConfirm({
                                    matched:true
                                }));
                                props.history.push("/output");
                            }
                        }
                        if(seller.quantity!==0){
                            ExchangeServices.addSeller(seller);
                            dispatch(onConfirm({
                                matched:true
                            }));
                            props.history.push("/output");
                        }
                    }
                })
            }
        }).catch(
            setErrmsg("no match")
        );
        if(errmsg.length>0){
            setErrmsg('');
            ExchangeServices.addSeller(seller);
            dispatch(onConfirm({
                matched:false
            }));
            props.history.push("/output");
        }
    }
    }

    return (
        <div>
            <form onSubmit={next}>
                <h2 className="text-center">Confirmation</h2>
                <div className="row">
                    <table align="center" className="table table-striped table-bordered w-50 ">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="label">Client Id</td>
                                <td>{exchange.exchange.id}</td>
                            </tr>
                            <tr>
                                <td className="label">Client Name</td>
                                <td>{exchange.exchange.name}</td>
                            </tr>
                            <tr>
                                <td className="label">Custodian Id </td>
                                <td>{exchange.exchange.custodian_id}</td>
                            </tr>
                            <tr>
                                <td className="label">Instrument Name </td>
                                <td>{exchange.exchange.instrumentname}</td>
                            </tr>
                            <tr>
                                <td className="label">Quantity </td>
                                <td>{exchange.exchange.quantity}</td>
                            </tr>
                            <tr>
                                <td className="label">price</td>
                                <td>{exchange.exchange.price}</td>
                            </tr>
                            <tr>
                                <td className="label">Direction(buy/sell) </td>
                                <td>{exchange.exchange.direction}</td>
                            </tr>
                            <tr>
                                <td className="label">Total Price </td>
                                <td>{Number(exchange.exchange.quantity)*Number(exchange.exchange.price)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                    <button type="submit" className="btn btn-success" onClick={next}>Confirm</button>
                    </div>
                </div>
                </form>
            </div>
    );
}

export default FinalComponent;