import React from 'react';


import { Navbar, Nav } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";


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
                    <a className='item' href=" https://github.com/pederzini98/React--Catalago-de-Jogos" >Github</a>
                    <Nav.Item className="icon" onClick={handleOpen}>
                        <FaShoppingCart/>
                    </Nav.Item>

                </Nav>

            </Navbar>

        </>
    );
}

export default NavBarComponent;