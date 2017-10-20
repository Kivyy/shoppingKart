' use strict'

import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getCart } from '../../actions/cartActions';

class Menu extends React.Component{
  render(){
    return(
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <a href="/">React-Bootstrap</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/about'>
              <NavItem eventKey={1} href="/about">About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contact'>
              <NavItem eventKey={2} href="/contact">Contact</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/admin'>
              <NavItem eventKey={1} href="/admin">Admin</NavItem>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <NavItem eventKey={2} href="/cart">Your Cart <Badge className='badge'>1</Badge></NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state){
  return {
    totalQty: state.cart.totalQty
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getCart:getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
