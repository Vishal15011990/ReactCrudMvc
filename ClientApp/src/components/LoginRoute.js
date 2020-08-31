import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Login } from './Login'

export const LoginRoute = () => {
    return (
        <>
            <BrowserRouter>
                <Route path="/" component={Login} exact />
            </BrowserRouter>
            </>
        )
}