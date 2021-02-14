import React from 'react';


import { Navbar, Nav } from 'react-bootstrap'

import { useDispatch } from 'react-redux'


import { setMODAL } from '../../redux-actions/redux-actions'

import './styles.css'

function NavBarComponent() {

    const dispatch = useDispatch()
    const handleOpen = () => {
        dispatch(setMODAL(
            true
        ))
    };


    return (
        <>
            <Navbar className="navbar navbar-fixed-top" >
                <Nav className="nav-content">
                    <Nav.Item className="item" onClick={window.scrollTo(0, 0)} >Home</Nav.Item>
                    <Nav.Item className="item" onClick={handleOpen}>Carrinho de Compras</Nav.Item>

                </Nav>

            </Navbar>

        </>
    );
}

export default NavBarComponent;