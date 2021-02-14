import React from 'react';

import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateCompraValue, updateCarrinhoValue } from '../../redux-actions/redux-actions'

import './styles.css'

function CartComponent() {

    const dispatch = useDispatch()
    const carrinho = useSelector(state => state.carrinho)
    const compraValue = useSelector(state => state.compra.value)

    function RemoveCarrinhoItem(data, key) {

        const itensCopy = Array.from(carrinho)
        itensCopy.splice(key, 1)

        dispatch(updateCarrinhoValue(
            itensCopy
        ))
        dispatch(updateCompraValue({
            value: compraValue.value - data.valor
        }))

    }

    return (

        <Table striped bordered >
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {
                    carrinho.filter(function (data) {
                        if (data.valor === 0) {
                            return false; // skip
                        }
                        return true;
                    }).map((data, key) => (

                        <tr key={key}>
                            <td>{data.nome}</td>
                            <td>{data.valor}</td>
                            <td className='table-text'>

                                <Button
                                    variant='danger'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        RemoveCarrinhoItem(data, key)
                                    }}
                                >Remover</Button>

                            </td>


                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default CartComponent;