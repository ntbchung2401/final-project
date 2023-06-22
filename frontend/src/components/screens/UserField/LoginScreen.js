import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Shop } from '../../../Shop';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaEnvelope, FaEyeSlash, FaTimes, FaEye } from 'react-icons/fa';
import { InputGroup } from 'react-bootstrap';

export default function LoginScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Shop);
    const { userInfo } = state;
    const clearEmail = () => {
        setEmail('');
    };
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/login', {
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            data.isAdmin ? navigate('/admin/dashboard') : navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <Row>
                <Col md={6} className="login_form_container">
                    <h1 className="my-3">Sign In</h1>
                    <Form style={{ width: '80%' }} onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {email && (
                                    <Button variant="light" onClick={clearEmail}>
                                        <FaTimes />
                                    </Button>
                                )}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <div className="mb-3">
                            <Button type="submit">Sign In</Button>
                        </div>
                        <div className="mb-3">
                            New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="login_form_image"></Col>
            </Row>
        </Container>
    );
}
