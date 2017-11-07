'use strict'
import React from 'react';
import {connect} from 'react-redux';
import {Modal,Panel,Col,Row,Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart , getCart} from '../../actions/cartActions';

class Cart extends React.Component {
  constructor(){
    super()
    this.state = {
      showModal: false
    }

    this.onDelete = this.onDelete.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount(){
    this.props.getCart();
  }

  open(){
    this.setState({showModal: true})
  }

  close(){
    this.setState({showModal: false})
  }

  onDelete(_id){
    const currentBookToDelete = this.props.cart
    const indexToDelete = currentBookToDelete.findIndex((cart) => {
      return cart._id === _id;
    })

    let cartAfterDelete = [...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)]
    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id){
    this.props.updateCart(_id,1, this.props.cart)
  }

  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1 , this.props.cart)
    }
  }
  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }

  renderEmpty(){
    return(<div></div>)
  }

  renderCart(){
    const cartItemsList = this.props.cart.map((cart) => {
      return(
        <Panel key={cart._id}>
          <Row>
            <Col xs={12} sm={4} >
              <h6>{cart.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2} >
              <h6>USD: ${cart.price}</h6>
            </Col>
            <Col xs={12} sm={2} >
              <h6>qty. <Label bsStyle='success'>{cart.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4} >
              <ButtonGroup style={{minWidth: '300px'}}>
                  <Button onClick={this.onDecrement.bind(this,cart._id,cart.quantity)} bsStyle="default" bsSize='small'>-</Button>
                  <Button onClick={this.onIncrement.bind(this,cart._id)} bsStyle="default" bsSize='small'>+</Button>
                  <span>     </span>
                  <Button onClick={this.onDelete.bind(this,cart._id)} bsStyle='danger' bsSize='small'> DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    })
    return(
      <Panel header="Cart" bsStyle='primary'>
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6> Total amount: {this.props.totalAmount}</h6>
            <Button onClick={this.open} bsStyle='success' bsSize='small'> PROCEED TO CHECKOUT </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <h6> Thank you</h6>
                <p> You will receive an email confirmation </p>
            </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6> Total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

function mapStateToProps(state){
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({deleteCartItem: deleteCartItem, updateCart: updateCart , getCart: getCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
