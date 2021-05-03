import React, { useState } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"

export default function Questionaire(props) {
  const data = props.dataObj
  const user = JSON.parse(localStorage.getItem("user"))
  let questionsArr = []
  let options = []
  const history = useHistory()
  const [responseData, setResponseData] = useState([{}])
  let subjectId

  const handleClick = (e) => {
    e.preventDefault()
    history.push("/subject")
  }

  if (data.subjects) {
    data.subjects.map((item) => {
      if (item.Username === user) {
        subjectId = item.SubjectId
      }
    })
  }

  const handleChange = (value, id) => {
    if (data.testSubmissions) {
      setResponseData([
        ...responseData,
        {
          id: data.testSubmissions[data.testSubmissions.length - 1].Id + 1,
          date: new Date(),
          subjectId: subjectId,
          response: [
            {
              id: id,
              value: value,
            },
          ],
        },
      ])
    }
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
                <select
                  id={item.Id}
                  onChange={(e) => handleChange(e.target.value, item.Id)}
                >
                  <option value={options.value}>Select an option</option>
                  {options}
                </select>
              </td>
            </tr>
          )
          break
        case "text":
          questionsArr.push(
            <tr>
              <td>{item.Label}</td>
              <td>
                <input
                  id={item.Id}
                  type="text"
                  onChange={(e) => handleChange(e.target.value, item.Id)}
                />
              </td>
            </tr>
          )
          break
        case "boolean":
          questionsArr.push(
            <tr>
              <td>{item.Label}</td>
              <td>
                <input
                  id={item.Id}
                  type="checkbox"
                  required={item.Required}
                  onChange={(e) => handleChange(e.target.checked, item.Id)}
                ></input>
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
