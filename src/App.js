import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'
import Main from './components/MainContent/Main';

function App() {
  const [disable, setDisable] = useState(false)
  const coins = JSON.parse(localStorage.getItem('data'));
  console.log(coins)
  return (
    <>
      <Router>
        <Sidebar
          onCollapse={(active) => {
            console.log(active);
            setDisable(active)
          }}
        />
        <div className={`container-${disable}`}>
          <Switch>
            <Route path="/:id" children={<Main coins={coins} />} />
            {/* {coins.map(coins => {
              return (
                <Route key={coins.id} path={`'/${coins.symbol}`}>
                  {console.log(coins.symbol)}
                  <Bitcoin coins={coins} />
                </Route>
              )
            })} */}
          </Switch>
        </div>
      </Router>

    </>
  )
}

export default App
