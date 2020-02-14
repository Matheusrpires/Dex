import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';
import Logo from '../style/imgs/assets/logo.png'

class Nav extends Component {
  render() {
    return (
      <nav>
        <div className="nav__container">
          <div className="wrapper">
            <img className="nav__img_wrapper" src={Logo} />
            {/* </div> */}
            <div className="nav_options">
              {
                this.props.page === "LIST OF FOODS" ?
                  <Link className="nav_page_selected" to="/food">FOODS</Link>
                  :
                  <Link className="nav_page" to="/food">FOODS</Link>
              }
              {
                this.props.page === "LIST OF PEOPLE" ?
                  <Link className="nav_page_selected" to="/people">PEOPLE</Link>
                  :
                  <Link className="nav_page" to="/people">PEOPLE</Link>
              }
              {
                this.props.page === "LIST OF PLACES" ?
                  <Link className="nav_page_selected" to="/places">PLACES</Link>
                  :
                  <Link className="nav_page" to="/places">PLACES</Link>
              }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav;