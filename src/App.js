import { useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './service.js'
import { AllAccounts } from './accounts.jsx'
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom'
import Home from './home.jsx'
import Navbar from './navbar.jsx'
import User from './user'




function App() {

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    getUsers().then(res => {
      setAccounts(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }, [])


  return (
    <HashRouter basename="/">
      <div >
        <Navbar />
      </div>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <AllAccounts accounts={accounts} />
          </Route>
          <Route exact path="/users/:id">
            <User accounts={accounts} setAccounts={setAccounts} />
          </Route>
        </Switch>
        <footer>
        Copyright  &copy; Milos Kozić 2021
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
