import React, {Component} from 'react'
import './index.scss'

type LoginProps={
    history:any
}
class Login extends React.Component<LoginProps> {
    render() {
        return (
           <div className="P-login">
              
                <button onClick={this.gotoHome.bind(this)}>跳转Home页</button>
            </div>
        )
    }

    gotoHome() {
        this.props.history.push('/home')
   }
}

export default Login;