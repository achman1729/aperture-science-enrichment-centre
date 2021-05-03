import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

// export default class Login extends React.Component {
const Login = (props) => {
  const [subjectUsername, setSubjectUsername] = useState("")
  const [password, setPassword] = useState("")
  const [glaDosId, setGlaDosId] = useState("")
  const [glaDosPass, setGlaDosPass] = useState("")

  const data = props.dataObj
  const history = useHistory()

  const handleSubmit = (e, user) => {
    e.preventDefault()
    console.log("submitted", user)

    if (verifyUser(user)) {
      if (user === "glados") {
        props.getVerifiedUser(glaDosId)
        history.push("/GLaDOS")
      } else {
        props.getVerifiedUser(subjectUsername)
        history.push("/subject")
      }
    }
  }

  const verifyUser = (user) => {
    let verified = false
    if (user === "glados") {
      if (
        data.GLaDOS.SubjectId === glaDosId &&
        data.GLaDOS.Password === glaDosPass
      ) {
        verified = true
      }
    } else {
      data.subjects.map((item) => {
        if (item.Username === subjectUsername && item.Password === password) {
          verified = true
        }
      })
    }
    return verified
  }

  console.log(data)
  return (
    <Container style={{ marginTop: "40vh" }}>
      <Row>
        <Col>
          <div
            className="glaDos-login-form"
            style={{
              width: "30vw",
              borderWidth: ".2rem .2rem 0",
              borderRadius: "8px 8px 0 0",
              border: ".2rem solid #ececec",
              padding: "1rem",
            }}
          >
            <h4>Login for GlaDos</h4>
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ marginBottom: "2rem" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter glaDos ID"
                  name="subjectId"
                  value={glaDosId}
                  onChange={(e) => setGlaDosId(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ marginBottom: "2rem" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={glaDosPass}
                  onChange={(e) => setGlaDosPass(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e, "glados")}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col>
          <div
            className="subject-login-form"
            style={{
              width: "30vw",
              borderWidth: ".2rem .2rem 0",
              borderRadius: "8px 8px 0 0",
              border: ".2rem solid #ececec",
              padding: "1rem",
            }}
          >
            <h4>Login for Subjects</h4>
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ marginBottom: "2rem" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter subject ID"
                  name="subjectUsername"
                  value={subjectUsername}
                  onChange={(e) => setSubjectUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ marginBottom: "2rem" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e, "subject")}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
