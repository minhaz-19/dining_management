import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC9DQ-8QfVbSskULTG-nFC8mNVkh-fbY9g",
  authDomain: "ruet-dyning.firebaseapp.com",
  projectId: "ruet-dyning",
  storageBucket: "ruet-dyning.appspot.com",
  messagingSenderId: "245177251851",
  appId: "1:245177251851:web:808356e669d9f156e1af0e",
  measurementId: "G-4MWP8HZT9F"
}

// init firebase
initializeApp(firebaseConfig)


// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'dimu')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })











  //=============================  Log In Page Javascript  ===============================

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
 // container.classList.remove("sign-up-mode");

  // Navigate to new HTML page
  window.location.href = 'order.html';
});

console.log('hello')


