import React from 'react';

import './App.css';

//import './Components/errors.json';
import ItemList from './Components/ItemList';
function App() {
  return (
    <div  className="App">
      <div style={{height:10000,backgroundColor:"#757575"}}>
      {/* // eslint-disable-next-line */}
      <header className="App-header"  >
      {/* // eslint-disable-next-line */}
      <img src={'./logo.png'} width="200" height="50" style={{paddingRight:850}}
      /> <h1>LOG STRUCTURE</h1>
      
      
      </header>
      
      <ItemList/>
    
     
     </div>
     
    </div>
   
  );
}



export default App;
