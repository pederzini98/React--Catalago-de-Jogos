import React, { useState, useEffect } from 'react';

import { Container, Navbar, Nav, Card, ListGroupItem, ListGroup, Button, Form, Table } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MdMonetizationOn, MdStar } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux'

import { setSelectedFilter, updateCompraValue, updateCarrinhoValue, setMODAL } from '../../redux-actions/redux-actions'

import './styles.css'

function Home() {

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

    const handleOpen = () => {
        dispatch(setMODAL(
            true
        ))
    };

    const handleClose = () => {
        dispatch(setMODAL(
            false
        ));
    };

    const store = useSelector(state => state)
    const dados = require('../../products.json')
    const carrinho = useSelector(state => state.carrinho)
    const filter = useSelector(state => state.filter)
    const frete = useSelector(state => state.frete)
    const compraValue = useSelector(state => state.compra.value)
    const [valorFrete, setvalorFrete] = useState(0)

    const dispatch = useDispatch()



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

    dados.sort(OrdenarJogos(filter))

    function RemoveCarrinhoItem(data, key) {

        const itensCopy = Array.from(carrinho)

        itensCopy.splice(key , 1)


        dispatch(updateCarrinhoValue(
            itensCopy
        ))

        dispatch(updateCompraValue({
            value: compraValue.value - data.valor
        }))
        
        setvalorFrete(valorFrete - 10)
    }

    // function renderToast() {
    //     <Toast>
    //         <Toast.Header>
    //             <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    //             <strong className="mr-auto">Bootstrap</strong>
    //             <small>11 mins ago</small>
    //         </Toast.Header>
    //         <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    //     </Toast>
    // }

    function LoadDataCarrinho() {

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
                                <td style={{ textAlign: 'center', justifyContent: 'center' }}>

                                    <Button
                                        variant='danger'
                                        className='remove-button'
                                        onClick={(e) => {
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
    function addNewCartItem(id, nome, valor) {

        dispatch(updateCarrinhoValue(
            [
                ...carrinho,
                {
                    
                    id,nome,valor
                }
            ]
        ))

    }

    function LoadData() {
        return (
            dados.map((data, key) => (

                <Card key={key} style={{ width: '20rem', marginTop: 50, border: '2px solid  #0F772E  ' }}>
                    <Card.Img variant="top" style={{ width: '100%', marginTop: 3 }} src={"/" + data.image} alt="Card image cap" />
                    <Card.Body style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card.Title style={{ marginTop: 10 }}>{data.name}</Card.Title>
                    </Card.Body>
                    <ListGroup style={{ marginTop: 10 }} className="list-group-flush">
                        <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }} >
                            <MdMonetizationOn style={{ color: 'green' }} size='30' />
                            {data.price}</ListGroupItem>
                        <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }} >
                            <MdStar style={{ color: 'blueviolet' }} size='30' /> {data.score}</ListGroupItem>
                    </ListGroup>
                    <Card.Body style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Button

                            className="cardButton"
                            onClick={(e) => {
                                e.preventDefault()
                                // renderToast()
                                dispatch(updateCompraValue({
                                    value: compraValue.value + data.price
                                }))
                                setvalorFrete(valorFrete + 10)
                                addNewCartItem(data.id, data.name, data.price.toFixed(2))
                            }}
                        >Adicionar ao Carrinho</Button>
                    </Card.Body>
                </Card >
            ))
        )
    }

    useEffect(() => {

        console.log(store)
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

            <Navbar className="navbar navbar-fixed-top" >
                <Nav className="nav-content">
                    <Nav.Item className="item" onClick={window.scrollTo(0, 0)} >Home</Nav.Item>
                    <Nav.Item className="item" onClick={handleOpen}>Carrinho de Compras</Nav.Item>

                </Nav>

            </Navbar>
            <div style={{ color: 'black', marginTop: 90, textAlign: 'center', paddingTop: 25 }}>
                <h1>Bem vindo ao Catálago de Jogos</h1>
                <h5>Compras acima de R$ 250,00 tem frete grátis!</h5>
            </div>
            <div className='searchForm'>
                <Form >
                    <Form.Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Form.Label style={{ flexWrap: 'nowrap', width: 200, fontSize: 23 }} >
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
            {/* < Formulario data={selected, setSelected} /> */}
            <div className='games-container'>
                <LoadData />
            </div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', width: '100%' }}>
                <Modal
                    open={modalState}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Carrinho de compras</h2>
                        <LoadDataCarrinho />
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Valor da Compra: <b style={{ position: 'absolute', right: 55 }}>{compraValue.value.toFixed(2)}</b></ListGroup.Item>
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Valor do Frete: <b style={{ position: 'absolute', right: 55 }}>{valorFrete}</b></ListGroup.Item>
                    </div>
                </Modal>
            </div>

        </Container>
    )
}

export default Home;