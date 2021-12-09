import React, { Component } from 'react';
import ExchangeServices from '../services/ExchangeServices';

class Custodian extends Component {
    constructor(props){
        super(props);
        this.state={
            custodian:[]
        }
    }
    componentDidMount(){
        ExchangeServices.getCustodians().then((res)=>{
            this.setState({custodian:res.data});
            //console.log(this.state.custodian);
        })
    }
    render() {
        return (
            <div>
            <h2 className="text-center">Recent Matches</h2>
            <div className="row">
                <table align="center" className="table table-striped table bordered w-75">
                    <thead className="dark">
                        <tr>
                            <th>Buyer</th>
                            <th>Buyer Custodian</th>
                            <th>Seller</th>
                            <th>Seller Custodian</th>
                            <th>Instrument</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.custodian.map(
                            custodian=>
                            <tr key={custodian.id}>
                                <td>{custodian.buyer}</td>
                                <td>{custodian.buyercustodian}</td>
                                <td>{custodian.seller}</td>
                                <td>{custodian.sellercustodian}</td>
                                <td>{custodian.instrument}</td>
                                <td>{custodian.quantity}</td>
                                <td>{custodian.price}</td>
                                <td>{custodian.price*custodian.quantity}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default Custodian;