import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import LoginServices from '../services/LoginServices'

function LoginComponent(props) {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [errmsg,setErrmsg]=useState('');

    const dispatch=useDispatch();

    const usernameChangeHandler=(event)=>{
        setUsername(event.target.value);
        setErrmsg('');
    }
    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
        setErrmsg('');
    }
    const next=(e)=>{
        e.preventDefault();
        LoginServices.getCustodianById(password).then((res)=>{
            if(res.data.id===password && res.data.name===username){
                dispatch(login({
                    user:{
                        username:username,
                        password:password
                    }
                }))
                props.history.push('/home');
            }
        }).catch(
            setErrmsg("Invalid username")
        )
    }
        return (
            <div>
                <div className="container">
                    <div className="row"><br/>
                    <span className="row_span text-center"><h3>Welcome to Exchange Application</h3></span>
                        <div id="loginbody" className="card col-md-6 offset-md-3 offset-md-3" >
                            <br/>
                            <h3 className="text-center">Login</h3>
                            <h5 className="text-center text-danger">{errmsg}</h5>
                            <div className="card-body">    
                                <form onSubmit={next}>
                                    <div className="form-group">
                                        <label>Custodian Name </label><br/>
                                        <input placeholder="enter name" name="username" className="form-control"
                                        value={username} onChange={usernameChangeHandler}/>
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label>Id </label><br/>
                                        <input type="password" placeholder="enter Id" name="password" className="form-control"
                                        value={password} onChange={passwordChangeHandler}/>
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-success">Login</button>
                                </form>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        );
}
export default LoginComponent;