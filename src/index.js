import '../css/reset.css';
import '../css/index.css';
import '../css/list.css';
import '../css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";

let commentId = 0;

// reducer permettant de gérer un unique commentaire à la fois
// s'utilise avec le reducer commentList
const commentPanel = (state, action) => {
  switch(action.type){
    case "ADD_COMMENT" :
      return{
        id : commentId++,
        name : action.name,
        email : action.email,
        comment : action.comment,
        creationDate : action.creationDate,
        completed : false
      }
      return {
        ...state,
        completed: !state.completed
      };
    default :
    return state;
  }
};

// reducer sur les commentaires, il sert à gérer l'ensemble des commentaires fournis
// par le reducer commentPanel
const commentList = (state=[],action) => {
  switch (action.type){
    case "ADD_COMMENT" : {
      return [...state,
      commentPanel(undefined, action)]
    }
    case "TOGGLE_COMMENT" : {
      return state.map(t =>
      commentPanel(t, action));
    }
    default :
    return state;
  }
}

// Fonction permettant de vérifier si un str est bien une adresse mail
function verifMail(champ)
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(champ))
   {
      return false;
   }
   else
   {
      return true;
   }
}

const store = createStore(commentList);

const  { Component } = React;

/* Reducer d'afficher et de remplir nos commentaires*/
class Reader extends Component  {
  render() {
    return(
      // Création des champs utiles du remplissage Pseudo - Email - Commentaire
  <div>
  <p>
        <label form="pseudo">Votre pseudo : </label>
        <input type="text" name="pseudo" id="pseudo" placeholder="Ex : botify" size="30" maxLength="10" />
  </p>
  <p>
        <label form="email">Votre email : </label>
        <input type="email" name="email" id="email" placeholder="Ex : adressemail@gmail.com" size="30" maxLength="25" />
  </p>
  <p>
        <label form="comment">Commentaire : </label>
        <br />
        <textarea name="comment" id="comment" rows="5" cols="80"></textarea>
  </p>

  <button onClick={() => {
    // Calcul de la date d'envoi, elle a été mise ici pour pouvoir se calculer à chaque click pour être plus précise
    var d = new Date();
    let theDate = String(d.getDate())+"/"+String(d.getMonth()+1)+"/"+String(d.getFullYear())
    let theTime = String(d.getHours())+"h:"+String(d.getMinutes())+"m:"+String(d.getSeconds())+"s"
    // Envoie des données (testées ici pour savoir si elles sont conformes ou non)
    if((document.getElementById("email").value === "" || verifMail(document.getElementById("email").value)) && document.getElementById("pseudo").value !== "" && document.getElementById("comment").value !== "") {
    store.dispatch({
      type : "ADD_COMMENT",
      name : document.getElementById("pseudo").value,
      email : document.getElementById("email").value,
      comment : document.getElementById("comment").value,
      creationDate : theDate + " à " + theTime,
    })
    document.getElementById("pseudo").value = ""
    document.getElementById("email").value = ""
    document.getElementById("comment").value = ""
  }
  }}> Submit </button></div>
)
}};


/* Reducer permettant la lecture de notre liste commentaryList comportant
tous les commentaires postés, on se sert pour cela de la proprité map de notre
reducer commentList */
class Print extends Component  {
  render() {
    return(
      <ul>
        {this.props.commentList.map(comment =>
        <li key={comment.id}>
        Posté le : {comment.creationDate} par  : {comment.name} {comment.email}
        <br/>
        {comment.comment}
        <br/> <br/>
        </li>
      )}
      </ul>
    )}};


// Render de la vue, ici juste l'image bandeau
ReactDOM.render(
  <App/>,
  document.getElementById('view')
);

// Render permettant l'affichage et la manipulation du render
const render = () => {
  ReactDOM.render(
  <Reader
  commentList={store.getState()}/>,
  document.getElementById('main')
); };

// Render permettant l'affichage et la manipulation du render
const render2 = () => {
  ReactDOM.render(
  <Print
  commentList={store.getState()}/>,
  document.getElementById('list')
); };

// Permet l'affichage dynamique de nos messages
store.subscribe(render);
render();

store.subscribe(render2);
render2();
