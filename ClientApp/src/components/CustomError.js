import React, { useState, useReducer } from 'react'
import { AddEmployee } from './AddEmployee';



export const ErrorContext = React.createContext()

const errorState = {
    Name: "Enter Name Required",
    Phone: "Enter Phone Required",
    EmailId: "Enter EmailId Required",
    Address: "Enter Address Required",
    Country: "Enter Country Required",
    State: "Enter State Required",
    City: "Enter City Required"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ('name'):
            return { ...state, Name: state.Name }
        case ('phone'):
            return { ...state, Phone: state.Phone }
        case ('emailid'):
            return { ...state, EmailId: state.EmailId }
        case ('address'):
            return { ...state, Address: state.Address }
        case ('country'):
            return { ...state,Country: state.Country }
        case ('state'):
            return { ...state, State: state.State }
        case ('city'):
            return { ...state, City: state.City }
        default:
            return {state}
    }
}



export const CustomError = () => {
    const [error, dispatch] = useReducer(reducer, errorState)
    return (
        <React.Fragment>
            <ErrorContext.Provider value={{ errorMsg: error, errorDispatch: dispatch }}>
                <AddEmployee/>
            </ErrorContext.Provider>
        </React.Fragment>

    )
}