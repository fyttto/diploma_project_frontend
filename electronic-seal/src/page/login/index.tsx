import React, {Component} from 'react'
import './index.scss'

type Props={
    history:any
}
class Login extends React.Component<Props> {
    render() {
        return (
           <div className="P-login">
                <h1>Login page</h1>
                <button onClick={this.gotoHome.bind(this)}>跳转Home页</button>
            </div>
        )
    }

    gotoHome() {
        this.props.history.push('/home')
   }
}

export default Login;