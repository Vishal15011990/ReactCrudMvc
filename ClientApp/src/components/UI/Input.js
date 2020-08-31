import React from 'react'

export const Input = (props) => {
    let inputElement = null
    switch (props.inputtype) {

        case ('input'):
            inputElement = <input {...props} />;
            break;
        case ('button'):
            inputElement = <button {...props} />;
            break;
        default:
            inputElement= <input {...props} />;
    }
    return (
        <>
            <label>{props.lable}</label>
            {inputElement}

            </>
        )

}