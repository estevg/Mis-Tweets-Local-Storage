// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event Listeners 

eventListiners();

function eventListiners(){
 // Cuando se envia el formulario
 document.querySelector('#formulario').addEventListener('submit', agregarTweet);
 // Borrar tweets
 listaTweets.addEventListener('click', borrarTweet);
 document.addEventListener('DOMContentLoaded', localStorageListo);
}


// Funciones
function agregarTweet(e){
     e.preventDefault();
     // Leer el valor del text area 
     const tweet = document.getElementById('tweet').value;
     // Crear boton de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText = 'X';



     // Crear elemento y agregar el elemento a la lista
     const li = document.createElement('li');
     li.innerText = tweet;
     // Añade el boton borrar al tweet 
     li.appendChild(botonBorrar);
     // Añade el tweet a la lista
     listaTweets.appendChild(li);


     // Agregar Tweet a LocalStorage
     agregarTweetLocalStorage(tweet);
}

// Eliminando Tweet
function borrarTweet(e){
     e.preventDefault();

     if(e.target.className === 'borrar-tweet'){
          e.target.parentElement.remove()
          borrarTweetLocalStorage(e.target.parentElement.innerText);
     }

}

// Mostrar los datos de LocalStorage en la lista
function localStorageListo(){
     let tweets;

     tweets = obtenerTweetsLocalStorage();
     tweets.forEach(tweet => {
          // Crear boton de eliminar
          const botonBorrar = document.createElement('a');
          botonBorrar.classList = 'borrar-tweet';
          botonBorrar.innerText = 'X';
     
     
     
          // Crear elemento y agregar el elemento a la lista
          const li = document.createElement('li');
          li.innerText = tweet;
          // Añade el boton borrar al tweet 
          li.appendChild(botonBorrar);
          // Añade el tweet a la lista
          listaTweets.appendChild(li);
     }); 
}


// Agregar Tweets al Local Storage
function agregarTweetLocalStorage(tweet){
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     // Añadir el nuevo tweets
     tweets.push(tweet);
     // Covertir de String a arreglo para localStorage
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Obtener Tweets del LocalStorage
function obtenerTweetsLocalStorage() {
     let tweets;
     // Revisamos los valores del localStorage
     if(localStorage.getItem('tweets') === null){
          tweets = [];
     }else{
          tweets = JSON.parse(localStorage.getItem('tweets'));
     }
     return tweets;
}

function borrarTweetLocalStorage(tweet){
     let tweets, tweetsBorrar;
     // Elimina la X del tweets
     tweetsBorrar = tweet.substring(0, tweet.length - 1);

     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet, index) {
          if(tweetsBorrar === tweet){
               tweets.splice(index, 1);
          }
     });
     localStorage.setItem('tweets', JSON.stringify(tweets));
}