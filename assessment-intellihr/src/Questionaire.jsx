import React from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"

export default function Questionaire(props) {
  const data = props.dataObj
  let questionsArr = []
  let options = []
  const history = useHistory()

  const handleClick = () => {
    history.push("/subject")
  }

  if (data.testQuestions) {
    data.testQuestions.map((item) => {
      if (item.Options) {
        item.Options.map((option) => {
          options.push(<option value={options.value}>{option.label}</option>)
        })
      }
      switch (item.Type) {
        case "select":
          questionsArr.push(
            <tr>
              <td>{item.Label}</td>
              <td>
                <select>{options}</select>
              </td>
            </tr>
          )
          break
        case "text":
          questionsArr.push(
            <tr>
              <td>{item.Label}</td>
              <td>
                <input type="text"></input>
              </td>
            </tr>
          )
          break
        case "boolean":
          questionsArr.push(
            <tr>
              <td>{item.Label}</td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          )
          break
      }
    })
  }
  return (
    <div>
      <h3>Please answer the following questions</h3>
      <form>
        <Table striped bordered hover>
          <tbody>{questionsArr}</tbody>
        </Table>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </form>
    </div>
  )
}
