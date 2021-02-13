import React, { useState, useEffect } from 'react';

import { Container, Navbar, Nav, Card, ListGroupItem, ListGroup, Button, Form, Table } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
            width: 400,
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

    const dados = require('../../assets/products.json')
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

            <Table >
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

                <Card key={key} style={{ width: '25rem', border: '1px solid', margin: '50px 50px' }}>
                    < Card.Img style={{ width: '100%' }} src="https://i.pinimg.com/originals/c7/8f/6c/c78f6ca2f2e42177adbf365b7937387a.jpg" />
                    <Card.Body style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', borderBottom: ' 1px solid #000' }}>
                        <Card.Title style={{ marginTop: 10 }}>{data.name}</Card.Title>
                    </Card.Body>
                    <ListGroup style={{ marginTop: 10 }} className="list-group-flush">
                        <ListGroupItem style={{ borderBottom: ' 1px solid #000' }}> Preço: {data.price}</ListGroupItem>
                        <ListGroupItem style={{ marginTop: 10, borderBottom: ' 1px solid #000' }}>Avaliação: {data.score}</ListGroupItem>
                    </ListGroup>
                    <Card.Body style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Button
                            onClick={() => {
                                setvalorCompra(valorCompra + data.price)
                                setvalorFrete(valorFrete + 10)
                                addNewCartItem(data.id, data.name, data.price.toFixed(2))
                            }}
                            variant="danger" href="#">Adicionar ao Carrinho</Button>
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
        <Container>
            <Navbar fixed="top" bg="dark" expand="lg" className='nav-container'>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills" className="mr-auto">
                        <Nav.Link className='item' href="/home">Pagina Inicial </Nav.Link>
                        <Nav.Link onClick={handleOpen} className='item' href="#">Carrinho</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className='searchForm'>
                <Form >
                    <Form.Row style={{ display: 'flex' }} >
                        <Form.Label >
                            Filtar por:
                            </Form.Label>
                        <Form.Control
                            as="select" size="lg"
                            style={{ marginLeft: 50 }}
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
            <div style={{ textAlign: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <label style={{ marginRight: 100 }}>Valor atual: {valorCompra}</label>
                <label>Frete atual: {valorFrete}</label>
                <div>

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
                            <ListGroup.Item>Valor da Frete: {valorFrete}</ListGroup.Item>
                        </div>
                    </Modal>
                </div>
            </div>

        </Container>
    )
}

export default Home;