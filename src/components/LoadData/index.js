import React from 'react';

import { Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap'
import { MdMonetizationOn, MdStar } from "react-icons/md";


import { useDispatch, useSelector } from 'react-redux'
import { updateCompraValue, updateCarrinhoValue } from '../../redux-actions/redux-actions'

import './styles.css'
function LoadData() {
    const dispatch = useDispatch()

    const dados = require('../../products.json')
    const compraValue = useSelector(state => state.compra.value)
    const filter = useSelector(state => state.filter)
    const carrinho = useSelector(state => state.carrinho)

    function OrdenarJogos(data) {
        if (filter === 'name' || filter === 'price') {
            return function (a, b) {
                if (a[data] > b[data]) {
                    return 1;
                } else if (a[data] < b[data]) {
                    return -1;
                }
                return 0;
            }
        } else {
            return function (a, b) {
                if (a[data] < b[data]) {
                    return 1;
                } else if (a[data] > b[data]) {
                    return -1;
                }
                return 0;
            }
        }
    }
    function addNewCartItem(id, nome, valor) {

        dispatch(updateCarrinhoValue(
            [
                ...carrinho,
                {

                    id, nome, valor
                }
            ]
        ))

    }


    dados.sort(OrdenarJogos(filter))
    return (
        dados.map((data, key) => (

            <Card key={key} className='card-container'>
                <Card.Img variant="top" className='card-image' src={"/" + data.image} alt="Card image cap" />
                <Card.Body className='card-body'>
                    <Card.Title style={{ marginTop: 10 }}>{data.name}</Card.Title>
                </Card.Body>
                <ListGroup style={{ marginTop: 10 }} className="list-group-flush">
                    <ListGroupItem className='list-item' >
                        <MdMonetizationOn style={{ color: 'green' }} size='30' />
                        {data.price}</ListGroupItem>
                    <ListGroupItem className='list-item' >
                        <MdStar style={{ color: 'blueviolet' }} size='30' /> {data.score}</ListGroupItem>
                </ListGroup>
                <Card.Body className='button-card'>
                    <Button

                        className="cardButton"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(updateCompraValue({
                                value: compraValue.value + data.price
                            }))
                            addNewCartItem(data.id, data.name, data.price.toFixed(2))
                        }}
                    >Adicionar ao Carrinho</Button>
                </Card.Body>
            </Card >
        ))
    );
}

export default LoadData;