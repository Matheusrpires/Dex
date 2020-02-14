import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import history from './components/history';
import './App.css';
import Login from './components/login';
import Pages from './components/pages';
import { parse } from 'querystring';

class App extends Component {

  state = {
    session: '',
    id: '',
    token: '',
    step: 0,
    tokenPage: '',
    loged: '',
    loading: true,
    email: '',
    password: '',
  }


  componentDidMount() {

  }


  handleToken = () => {
    console.log('teste22222222222222')
    const options = {
      headers: {
        'X-Parse-Application-Id': 'OSGiFZBrXxNLjN3gYDPsgi7P4a0j6fzcc2iaCKga',
        'X-Parse-REST-API-Key': 'k8xm42UVuIP51wR2DswLY8NL3zgWfev8AuKUUjga',
      
        'X-Parse-Session-Token': ls.get('token'),
      }
    }
    console.log('tokeennnn', ls.get('token'))
    axios.get(`http://localhost:1337/parse/sessions/me`, options)
      .then(resp => {
        this.setState({
          tokenPage: resp.data.sessionToken,
          loged: true,
          loading: false,
        })
        console.log('token', resp.data)
        console.log('token', resp.data.objectId)
        console.log('token', resp.data.sessionToken)
      })
      .catch(error => {
        console.log(error);
        const steps = this.state.step +1;
        this.setState({
          loading: false,
          step: steps
        })

      })

  }

  handleState = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleLogin = () => {
    const { email, password } = this.state;
    let data = {
      email,
      password,
    }

    axios.post('http://localhost:1337/login', {
      email,
      password
    })
      .then(resp => {
        console.log('login foi', resp);
        console.log(resp.data);
        this.setState({
          id: resp.data.objectId,
          token: resp.data.sessionToken,
          loading: false,
        })
        ls.set('token', resp.data.sessionToken);
        if (this.state.token) {
          history.push('/food');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleSigning = () => {
    const { email, password } = this.state;
    console.log("click");
    axios.post('http://localhost:1337/signup', {
      email,
      password
    })
      .then(resp => {
        this.setState({
          token: resp.data.sessionToken,
          loading: false,
        })
        ls.set('token', resp.data.sessionToken);
        if (this.state.token) {
          history.push('/food');
        }
        this.handleToken()
      })
      .catch(error => {
        console.log(error);
      })
  }

  step = () => {
    this.setState({
      step: 0
    })
  }

  PrivateRoute = ({ component: Component, ...props }) => {
    if(ls.get('token') !== "" && this.state.loged === ''){
      console.log('ainda true')
      this.handleToken();
    }
    return (
      <Route
        {...props}
        render={innerProps =>
          this.state.loading === true ?
            <div>Loading</div>
            :
            this.state.loged === true ?
              <Pages handleToken={this.handleToken} tittle="LIST OF FOODS" call="getAllFoods" />
              :
              this.state.step === 12 ?
              <Redirect to="/" />
              :
              <div>
              
              </div>
        }
      />
    );
  };

  PrivateRoute2 = ({ component: Component, ...props }) => {
    if(ls.get('token') !== "" && this.state.loged === ''){
      console.log('ainda true')
      this.handleToken();
    }
    return (
      <Route
        {...props}
        render={innerProps =>
          this.state.loading === true ?
            <div>Loading</div>
            :
            this.state.loged === true ?
              <Pages handleToken={this.handleToken} tittle="LIST OF PEOPLE" call="getAllPeople" />
              :
              this.state.step === 12 ?
              <Redirect to="/" />
              :
              <div>
              
              </div>
        }
      />
    );
  };

  PrivateRoute3 = ({ component: Component, ...props }) => {
    if(ls.get('token') !== "" && this.state.loged === ''){
      console.log('ainda true')
      this.handleToken();
    }
    return (
      <Route
        {...props}
        render={innerProps =>
          this.state.loading === true ?
            <div>Loading</div>
            :
            this.state.loged === true ?
              <Pages handleToken={this.handleToken} tittle="LIST OF PLACES" call="getAllPlaces" />
              :
              this.state.step === 12 ?
              <Redirect to="/" />
              :
              <div>
              
              </div>
        }
      />
    );
  };


  render() {
    return (
      <div className="App">
        <Switch history={history}>
          <Route exact path="/" render={() => <Login checkLogin={this.handleToken} token={this.state.token} handleState={this.handleState} step={this.step} handleLogin={this.handleLogin} handleSigning={this.handleSigning} />} />
          <this.PrivateRoute path="/food" component={Pages} />
          <this.PrivateRoute2 path="/people" component={Pages} />
          <this.PrivateRoute3 path="/places" component={Pages} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
