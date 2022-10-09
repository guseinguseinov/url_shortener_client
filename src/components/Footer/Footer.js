import React from 'react';
import Container from '@mui/material/Container';

const Footer = () => {
    return (
        <>
            <Container
                maxWidth="xl"
                style={{
                    backgroundColor: "#1976d2",
                    padding: "30px",
                    position: "absolute",
                    left: '0',
                    bottom: '0',
                    right: '0',
                }}
            >
                <p style={{ textAlign: "center", color: "#fff" }}>Made By
                    <a style={{ textDecoration: 'none', fontWeight: "bold", color: "#000" }} href="https://www.linkedin.com/in/guseinguseinov/"> Gusein</a>
                </p>
            </Container>
        </>
    );
}

export default Footer;