import React from 'react';


import { useDispatch } from 'react-redux'

import { setSelectedFilter } from '../../redux-actions/redux-actions'

import { Form } from 'react-bootstrap'

import './styles.css'

function FilterComponent() {

    const dispatch = useDispatch()


    return (
        <div className='searchForm'>
            <Form >
                <Form.Row className='form-content'>
                    <Form.Label className='form-label' >
                        Filtrar por:
                </Form.Label>
                    <Form.Control
                        as="select" size="lg"
                        style={{ marginLeft: 5 }}
                        onChange={(e) => {
                            dispatch(setSelectedFilter(
                                e.target.value
                            ))

                        }}
                    >
                        <option value="name">Ordem alfabética</option>
                        <option value="score">Popularidade</option>
                        <option value="price">Preço</option>

                    </Form.Control>

                </Form.Row>
            </Form>

        </div>
    )
}

export default FilterComponent;