import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Login extends React.Component {
    render() {
        return (
            <div className="login-form" style={{
                height: "25vh", width: "30vw", borderWidth: ".2rem .2rem 0",
                borderRadius: "8px 8px 0 0", border: ".2rem solid #ececec", padding: "1rem", margin: '34vh 0 0 35vw'
            }}>
                <Form>
                    <Form.Group controlId="formBasicEmail" style={{ marginBottom: "2rem" }}>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" style={{ marginBottom: "2rem" }}>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}
