import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./App.css"
import Login from "./auth/Login"
import DataShowPage from "./DataShowPage"
import Questionaire from "./Questionaire"

function App() {
  const [dataObj, setDataObj] = useState({})
  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(true)

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setDataObj(data)
      })

    setLoading(false)
  }

  const getVerifiedUser = (user) => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      {!loading ? (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Login
                  {...props}
                  dataObj={dataObj}
                  getVerifiedUser={getVerifiedUser}
                />
              )}
            />
            <Route
              exact
              path={`/GLaDOS`}
              render={(props) => (
                <DataShowPage {...props} user={user} dataObj={dataObj} />
              )}
            />
            <Route
              exact
              path={`/subject`}
              render={(props) => (
                <DataShowPage {...props} user={user} dataObj={dataObj} />
              )}
            />
            <Route
              exact
              path={`/questions`}
              render={(props) => (
                <Questionaire {...props} user={user} dataObj={dataObj} />
              )}
            />
          </Switch>
        </BrowserRouter>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
