import React, { Component } from 'react';
import '../css/view.css' ;

// Gère le premier render sur les vues
// le nom sert pour le fonctionnement correct lors du lancement via la console

class App extends Component {
  render() {
    return (
      <div className="view">
        <div className="App-header">
          <img src="topimg.jpg" className="App-top" alt="wallpaper" />
        </div>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
