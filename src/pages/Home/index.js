import React, { useState, useEffect } from 'react';

import { Container, ListGroup } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { useDispatch, useSelector } from 'react-redux'
import { setMODAL } from '../../redux-actions/redux-actions'

import './styles.css'

import NavBarComponent from '../../components/NavBarComponent'
import FilterComponent from '../../components/FilterComponent'
import LoadData from '../../components/LoadData'
import CartComponent from '../../components/CartComponent'


function Home() {

    const dispatch = useDispatch()
    const carrinho = useSelector(state => state.carrinho)
    const filter = useSelector(state => state.filter)
    const compraValue = useSelector(state => state.compra.value)
    const [valorFrete, setvalorFrete] = useState(0)


    function getModalStyle() {
        const top = 50
        const left = 50

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'fixed',
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),

        },
    }));

    const classes = useStyles();
    const modalState = useSelector(state => state.modalState)
    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        dispatch(setMODAL(
            false
        ));
    };

    useEffect(() => {

        if (compraValue.value > 250) {
            setvalorFrete(0)
        }
        else if (compraValue.value <= 250 && carrinho.length >= 1) {
            setvalorFrete((carrinho.length) * 10)
        }
        else {
            setvalorFrete(0)

        }

    }, [valorFrete, compraValue, carrinho, filter])


    return (

        <Container className='content-container'>

            <NavBarComponent />
            <div className="welcome">
                <h1>Bem vindo ao Catálago de Jogos</h1>
                <h5>Compras acima de R$ 250,00 tem frete grátis!</h5>
            </div>
            <FilterComponent />
            <div className='games-container'>
                <LoadData />
            </div>
            <div className="modal-div">
                <Modal
                    open={modalState}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2 >Carrinho de Compras</h2>
                        <CartComponent />
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Valor da Compra: <b style={{ position: 'absolute', right: 55 }}>{compraValue.value.toFixed(2)}</b></ListGroup.Item>
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Valor do Frete: <b style={{ position: 'absolute', right: 55 }}>{valorFrete}</b></ListGroup.Item>
                    </div>
                </Modal>
            </div>

        </Container>
    )
}

export default Home;