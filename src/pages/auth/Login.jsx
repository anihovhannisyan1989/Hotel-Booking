import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login } from "../../actions/auth/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      console.log(response);
      setTimeout(() => {
        navigate("/dashboard/bookings");
      }, 1000);
      if (response.data) {
        window.localStorage.setItem("auth", JSON.stringify(response.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="mt-4">
          <div className="h3">Welcome!</div>
          <p className="text-muted">
            Lorem ipsum, dolor sit amet. Recusandae, assumenda.
          </p>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
            <p className="mt-4">
              <small className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                esse.
              </small>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
