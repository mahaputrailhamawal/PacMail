// Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from './assets/logo-pacmail.jpg';
import { Button, Navbar, Container, Modal } from 'react-bootstrap';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleInbox = () => {
    console.log('Inbox logic goes here');
    navigate('/mail');
  };

  const handleSendMail = () => {
    console.log('Send Mail logic goes here');
    navigate('/send-email');
  };

  const handleLogout = () => {
    // Menampilkan modal konfirmasi sebelum logout
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Implementasikan logika logout di sini
    console.log('Logout logic goes here');

    // Menghapus token atau data otentikasi lainnya dari localStorage jika ada
    localStorage.removeItem('token');

    // Redirect kembali ke route /
    navigate('/');

    // Tutup modal setelah logout
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    // Tutup modal jika pengguna membatalkan logout
    setShowLogoutModal(false);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Link to="/mail" className="navbar-brand">
          <img src={logo} alt="PacMail Logo" className="logo" />
          <span className="brand">PacMail</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Button className="inboxbtn" variant="outline-light" onClick={handleInbox}>
            Inbox
          </Button>
          
          <Button className="sendbtn" variant="outline-light" onClick={handleSendMail}>
            Send Email
          </Button>
          
          <Button className="logoutbtn" variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>

      {/* Modal untuk konfirmasi logout */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default CustomNavbar;
