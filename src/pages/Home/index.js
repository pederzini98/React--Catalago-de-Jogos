import React, { useState, useEffect } from 'react';

import { Container, Navbar, Nav, Card, ListGroupItem, ListGroup, Button, Form, Table } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MdMonetizationOn, MdStar } from "react-icons/md";


import './styles.css'

function Home() {
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }


    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dados = require('../../products.json')
    const [selected, setSelected] = useState('name')
    const [valorCompra, setvalorCompra] = useState(0)
    const [valorFrete, setvalorFrete] = useState(0)


    const [carrinho, setCarrinho] = useState([{ id: 0, nome: '', valor: 0 }])



    function OrdenarJogos(data) {
        if (selected === 'name' || selected === 'price') {
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

    dados.sort(OrdenarJogos(selected))

    function RemoveCarrinhoItem(data, key) {

        const itensCopy = Array.from(carrinho)

        itensCopy.splice(key + 1, 1)
        setCarrinho(itensCopy)
        setvalorCompra(valorCompra.toFixed(2) - data.valor)
        setvalorFrete(valorFrete - 10)
    }

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
                                <td>

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
        setCarrinho([...carrinho, { id: id, nome: nome, valor: valor }]);

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
                            <MdMonetizationOn style={{ color: 'green'}} size='30' />
                            {data.price}</ListGroupItem>
                        <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20 }} >
                            <MdStar style={{ color: 'blueviolet' }} size='30' /> {data.score}</ListGroupItem>
                    </ListGroup>
                    <Card.Body style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Button
                            onClick={() => {
                                setvalorCompra(valorCompra + data.price)
                                setvalorFrete(valorFrete + 10)
                                addNewCartItem(data.id, data.name, data.price.toFixed(2))
                            }}
                            style={{ backgroundColor: '#0F772E' }} href="#">Adicionar ao Carrinho</Button>
                    </Card.Body>
                </Card >
            ))
        )
    }

    useEffect(() => {

        if (valorCompra > 250) {
            setvalorFrete(0)
        }
        else if (valorCompra <= 250 && carrinho.length > 1) {
            setvalorFrete((carrinho.length - 1) * 10)
        }
        else {
            setvalorFrete(0)

        }

    }, [valorFrete, valorCompra, carrinho])


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
                            onChange={e => setSelected(e.target.value)}
                        >
                            <option value="name">Ordem alfabética</option>
                            <option value="score">Popularidade</option>
                            <option value="price">Preço</option>

                        </Form.Control>

                    </Form.Row>
                </Form>

            </div>
            <div className='games-container'>
                <LoadData />
            </div>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', width: '100%' }}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Carrinho de compras</h2>
                        <LoadDataCarrinho />
                        <ListGroup.Item>Valor da Compra: {valorCompra}</ListGroup.Item>
                        <ListGroup.Item>Valor do Frete: {valorFrete}</ListGroup.Item>
                    </div>
                </Modal>
            </div>

        </Container>
    )
}

export default Home;