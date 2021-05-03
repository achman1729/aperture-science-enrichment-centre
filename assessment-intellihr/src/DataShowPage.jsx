import React from "react"
import Table from "react-bootstrap/Table"
import { useHistory } from "react-router-dom"

export default function DataShowPage(props) {
  console.log("props.user", props.user)
  const user = JSON.parse(localStorage.getItem("user"))
  const data = props.dataObj
  let subjectsArray = []
  const history = useHistory()

  let headerName
  user === "GLaDOS" ? (headerName = "GLaDOS") : (headerName = `subject ${user}`)

  const handleClick = () => {
    localStorage.clear()
    history.push("/")
  }

  if (data.subjects) {
    if (user === "GLaDOS") {
      data.subjects.map((item) => {
        subjectsArray.push(
          <tr>
            <td>{item.Username}</td>
            <td>{item.DateOfBirth}</td>
            <td>{item.TestChamber}</td>
            <td>{item.TotalScore}</td>
            <td>{`${item.Alive}`}</td>
          </tr>
        )
      })
    } else {
      data.subjects.map((item) => {
        if (item.Username === user) {
          subjectsArray.push(
            <tr>
              <td>{item.Username}</td>
              <td>{item.DateOfBirth}</td>
              <td>{item.TestChamber}</td>
              <td>{item.TotalScore}</td>
              <td>{`${item.Alive}`}</td>
            </tr>
          )
        }
      })
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome {headerName}</h3>
          {user !== "GLaDOS" ? (
            <ul>
              <li
                style={{ width: "0px", cursor: "pointer" }}
                onClick={handleClick}
              >
                Logout
              </li>
            </ul>
          ) : (
            <div></div>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>DOB</th>
                <th>Test Chamber</th>
                <th>Total Score</th>
                <th>Alive</th>
              </tr>
            </thead>
            <tbody>{subjectsArray}</tbody>
          </Table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
