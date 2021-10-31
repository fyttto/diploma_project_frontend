import React, { Component } from 'react'

type InputProps = {

    text?:String
}

 class InputBox extends React.Component<InputProps> {
    render() {
        return (
            <div>
                <input type="text" />
            </div>
        )
    }
}

export default InputBox
