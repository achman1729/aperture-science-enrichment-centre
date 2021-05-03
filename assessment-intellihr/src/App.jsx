import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./App.css"
import Login from "./auth/Login"
import DataShowPage from "./DataShowPage"

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
        // console.log(response)
        return response.json()
      })
      .then(function (data) {
        setDataObj(data)
      })

    setLoading(false)
  }

  const getVerifiedUser = (user) => {
    console.log("user is: ", user)
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  useEffect(() => {
    getData()
  }, [])

  console.log("state user", user)

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
          </Switch>
        </BrowserRouter>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
