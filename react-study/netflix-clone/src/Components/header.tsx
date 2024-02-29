import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin : 10px 20px;
`;

const Col = styled.div`
`;

const Logo = styled.span`
    color : red;
    font-size : 20px;
    font-weight : 600;
    margin-right : 20px;
`;

const LinkComponent = styled(Link)`
    margin-right : 20px;
`;

const Input = styled.input`
    margin-right : 10px;

`;

function Header() { 
    const [userInput, setUserInput] = useState("");
    return (
        <Nav>
            <Col>
                <Logo>NETFLIX</Logo>
                <LinkComponent to="/">Home</LinkComponent>
                <Link to="/tv">TV</Link>
            </Col>
            <Col>
                <Input
                    type="text"
                    onChange={(e) => {
                        return setUserInput(e.currentTarget.value);
                    }}
                />
                <LinkComponent to={`/search/${userInput}`}>Search</LinkComponent>
            </Col>
        </Nav>
    );
};

export default Header;