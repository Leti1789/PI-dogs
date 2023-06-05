import { Home, Landing, Detail, Form } from './views'

import { Route } from 'react-router-dom';


function App() {

 
 



  return (
    <div className="App">
     
      <Route exact path = '/'>
      <Landing/>
      </Route>

      <Route exact path= '/home'>
      <Home />
      </Route>

      <Route exact path= '/detail/:id'>
      <Detail />
      </Route>

      <Route exact path= '/create'>
      <Form />
      </Route>
    </div>
  );
}

export default App;
