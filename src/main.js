'use strict'

import React from 'react';
import Menu from './components/pages/menu';
import Footer from './components/pages/footer';

class Main extends React.Component {
  render(){
    console.log(this.props.children)
    return(
      <div>
        <Menu/>
          {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default Main;
