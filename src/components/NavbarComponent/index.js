import React from 'react';

import { Navbar, Nav } from 'react-bootstrap'
import './styles.css'


import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function NavbarComponent() {

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
  return (
    <>
      <Navbar fixed="top" bg="dark" expand="lg" className='nav-container'>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="mr-auto">
            <Nav.Link className='item' href="/home">Pagina Inicial </Nav.Link>
            <Nav.Link onClick={handleOpen} className='item' href="#">Carrinho</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
    </>
  )
}

export default NavbarComponent;