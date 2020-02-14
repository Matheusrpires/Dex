import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';
import '../style/pages.css';
import Nav from './nav';

class Pages extends Component {

  state = {
    pictures: [],
    arrayPics: []
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

    axios.get(`http://localhost:1337/${this.props.call}`)
      .then(resp => {
        this.setState({
          pictures: resp.data
        })
        console.log(resp.data)
        this.reverse()
      })
      .catch(error => {
        console.log(error)
      })


  }

  reverse() {
    let newArray = [];
    let count = this.state.pictures.length;
    for (let i = count - 1; i >= 0; i -= 1) {
      newArray.push(this.state.pictures[i]);
    }
    this.setState({
      arrayPics: newArray
    })
  }

  render() {
    return (
      <React.Fragment>
        <Nav page={this.props.tittle}/>
        <div className="page_wrapper">
          <div className="page__tittle">
            <a>{this.props.tittle}</a>
          </div>
          <hr className="page__line" />
          <div className="page__image_wrapper">
            {
              !this.state.arrayPics ?
                <div>
                  <h1>Carregando</h1>
                </div>
                :
                this.state.arrayPics.map((picture, index) => {
                  return (
                    <div key={index} className="container2">
                      <img src={picture.link} />
                      <div className="bottom-left">{picture.name}</div>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Pages;