import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../components/button';
import '../style/login.css';

class Login extends Component {

  componentDidMount() {
    this.props.step();
  }

  handleChange = (event) => {
    this.props.handleState(event.target.name, event.target.value);
  }

  handleShowPass = () => {
    let check = document.getElementById('password');
    if(check.type === 'password'){
      check.type = 'text';
    } else {
      check.type = 'password';
    }
  }

  render() {
    
    return (
      <div className="login__wrapper">
        <div className="login">
          <div className="login__box">
            <a className="login_tittle">ORANGE</a>
            <form className="login__form">
              <div>
                <label>
                  Email:
              </label>
                <input type="text" name="email" placeholder="seunome@email.com" onChange={this.handleChange} />
              </div>
              <div>
                <label>
                  Password:
              </label>
                <input type="password" id="password" name="password" placeholder="Password"  onChange={this.handleChange} />
              </div>
              <div>
                <input
                  name="show_password"
                  type="checkbox"
                  id="showPass"
                onClick={this.handleShowPass} 
                />
                <label className="label__text">
                  Mostrar a senha
              </label>
              </div>
            </form>
            <div className="login__problems">
              <a className="login__problems__son">Problemas para acessar sua conta?</a>
            </div>
            <div className="login_btn">
              <Button type="color" handleEvent={this.props.handleLogin} checkLogin={this.props.checkLogin}>Acessar</Button>
              <div className="or_wrapper">
                <hr className="or__hr"/>
                <a className="or">ou</a>
                <hr className="or__hr"/>
              </div>
              <Button handleEvent={this.props.handleSigning} checkLogin={this.props.checkLogin}>Cadastrar</Button>
            </div>
            <a className="login__terms">Termos de uso  •  Política de privacidade</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;