import React, { Component, useReducer, useContext, useState } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import { Navigation } from './NavigationMenu'
import { AddEmployee } from './AddEmployee'
import { FetchEmployee } from './FetchEmployee'
import { EditEmployee } from './EditEmployee'
import { Login } from './Login'
import ReactNotification from 'react-notifications-component';
import './custom.css'
import { get } from 'jquery';

export const LoginContext = React.createContext();
export const ACTION = { LOGIN: "LOGIN" ,LOGOUT:"LOGOUT" }

const initialState = {
    _isAuth: false
}

const reducer = (state, action) => {

    switch (action.type) {

        case (ACTION.LOGIN):
            {
                //document.cookie="userid=vishal"
                return {
                    ...state,
                    _isAuth: true
                }
            }
        case (ACTION.LOGOUT):
            {
                document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                return {
                    ...state,
                    _isAuth: false
                }
            }
        default:
            return state

    }
}



function App() {
   // const [counter, setCounter] = useState(0)

    

    const _logcookie = document.cookie;

    //const incCounter = () => {
    //    setCounter((prevCount)=>++prevCount)
    //}

    //const userid = (document.cookie ||"userid=")
    //    .split('; ')
    //    .find(row => row.startsWith('userid'))
    //    .split('=')[1];

    //const showlogin = !userid
    //console.log(userid)


    const [login, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <div className="container" /*key={ counter}*/>
                <ReactNotification />
                { <LoginContext.Provider value={{ _authLogin: login, _dispatch: dispatch }}>
      
                    <div>
                        {( _logcookie!="") ?
                            <BrowserRouter>
                                <Navigation />
                                <Route path='/Get' component={FetchEmployee} exact />
                                <Route path='/Add' component={AddEmployee} exact />
                                <Route path='/Edit:id' component={EditEmployee} exact />
                                
                                <Route path='/' component={FetchEmployee} exact />
                            </BrowserRouter> : <Login/>
                            }
                    </div>

                </LoginContext.Provider>}



                {/*(showlogin) ? <Login incCounter={incCounter} />:
                    <BrowserRouter>
                        <Navigation />
                        <Route path='/Get' component={FetchEmployee} exact />
                        <Route path='/Add' component={AddEmployee} exact />
                        <Route path='/Edit:id' component={EditEmployee} exact />
                        <Route path='/' component={FetchEmployee} />
                    </BrowserRouter> 
                    
                */}


            </div>

        </>
    );
}

export default App;