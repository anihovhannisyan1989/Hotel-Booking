import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { register } from '../../actions/auth/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

//import { isExternalModuleNameRelative } from 'typescript';

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registerHandler = async (e) => {
        e.preventDefault();

        try{
            const response = await register({ name, email, password });
            console.log(response);
            toast.success("You are registered!");
            setTimeout(() => { navigate("/login")}, 1000);
        } catch(err) {
            toast.error(err.response.data);
        }
    }

return (
    <Container>
        <Row>
            <Col md={{span: 4, offset: 4}} className="mt-2">
                <div className='h3'>Create account</div>
                <p className='text-muted'>Lorem ipsum, dolor sit amet consectetur.</p>
                <Form onSubmit={registerHandler}>
                <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>    
                <Button variant="primary" type="submit">
                Sign up
                </Button>
                <p className='mt-3'>
                    <small className='text-muted'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, esse.
                    </small>
                </p>
            </Form>
            </Col>
            
        </Row>
    </Container>
    );
}

export default Register