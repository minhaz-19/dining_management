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
initializeApp(firebaseConfig);


// init services
const db = getFirestore();













  //=============================  Log In Page Javascript  ===============================

function loginPage(){
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



}









//============================  Order Page Javascript ===========================




var show_item_price_in_menu;

function showMenuItems(item_name, item_price){

  // Create a new element
var newElement = document.createElement('div');

// Set class name for the new element
newElement.className = 'card my-3 shadow border-0 pt-2';

// Set styles for the new element
newElement.style.width = '18rem';


newElement.innerHTML = `
<img
  src="../images/food-image.jpg"
  class="card-img-top"
  alt="..."
/>
<div class="card-body">
  <h5 class="card-title">
    <div class="row">
      <div class="col">${item_name}</div>
      <div class="col text-end">${show_item_price_in_menu} </div>
    </div>
  </h5>
  <a href="#" class="btn btn-secondary w-100">Add to cart</a>
</div>`;

// Get the parent element by its ID name
var parentElement = document.getElementById('menu-items-card-holder');

// Append the new element to the parent element
parentElement.appendChild(newElement);
 
}




function menu(){

  // collection ref
let colRef = collection(db, 'Bangabandhu Sheikh Mujibur Rahman Hall/Menu/Lunch');
var item_name, item_price, item_availability;
// get collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let books = []
    
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
        item_name = doc.id;
        item_price = doc.data().Price;
        item_availability = doc.data().Available;
        if(item_price == 0){
          show_item_price_in_menu = 'Complementary'
        }else{
          show_item_price_in_menu = item_price +'/='
        }
        if(item_availability){
          showMenuItems(item_name, show_item_price_in_menu)
        }
    })
    
    console.log(books)
  })
  .catch(err => {
    item_name = 'Error';
        item_price = 'Error';
        item_availability = false;
  });

}




function orderPage(){
  menu();
}














//===============================  Select Javascript function  =================

if(document.title == 'Log In'){
  loginPage();
}
else if(document.title == 'Order Meal'){
  orderPage();
}