import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const mxNews = 12;
  const country = "in";
  const api_key = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  const setLength = (progress)=>{
    setProgress(progress);
  }
    return (
      <div>
        <Router>
          <LoadingBar
          color='#f11946'
          progress= {progress}
          />
          <Navbar/>
          <Switch>
            {/* exact path is safer than path to make difference b/w /user and /user/about */}
            <Route exact path="/">
              <News setProgress={setLength} api_key={api_key} className="active" mxNews={mxNews} key="general" country={country} category="general" />
            </Route>
            <Route exact path="/sports">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="sports" country={country} category="sports" />
            </Route>
            <Route exact path="/business">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="business" country={country} category="business" /> 
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="entertainment" country={country} category="entertainment" />
            </Route>
            <Route exact path="/health">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="health" country={country} category="health" />
            </Route>
            <Route exact path="/science">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="science" country={country} category="science" />
            </Route>
            <Route exact path="/technology">
              <News setProgress={setLength} api_key={api_key} mxNews={mxNews} key="technology" country={country} category="technology" />
            </Route>
            
          </Switch>

        </Router>
      </div>
    )
}

export default App;
