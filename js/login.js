import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc , doc, setDoc
} from 'firebase/firestore'
import {
   getStorage, ref, uploadBytes, getDownloadURL
} from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword
} from 'firebase/auth';


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
const storage = getStorage();
const auth = getAuth();
var docRef;
var userEmail;













  //=============================  Log In Page Javascript  ===============================



  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  }




  async function signIn(email, password) {
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Access the signed-in user object
      const user = userCredential.user;
  
      // Return the user object or any other relevant data
      return user;
    } catch (error) {
      throw error;
    }
  }





function loginPage(){
  const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
var signUpSubmitButton = document.getElementById('signUpSubmitButton');
var loginButton = document.getElementById('loginButton');

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', ()=>{
  container.classList.remove("sign-up-mode");
});

signUpSubmitButton.addEventListener("click", () => {
 let signUpUserName = document.getElementById('signUpUserName').value;
 let signUpEmail = document.getElementById('signUpEmail').value;
 let signUpPassword = document.getElementById('signUpPassword').value;

 signup(signUpEmail, signUpPassword)
  .then(user => {
    userEmail= signUpEmail;
    localStorage.setItem("userEmail", userEmail);
    window.location.href = './order.html';
  })
  .catch(error => {
    alert(error.message);
  });
});

loginButton.addEventListener("click", () => {
  let loginEmail = document.getElementById('loginEmail').value;
  let loginPassword = document.getElementById('loginPassword').value;
 
  signIn(loginEmail, loginPassword)
  .then(user => {
    userEmail= loginEmail
    localStorage.setItem("userEmail", userEmail);
    
    window.location.href = './order.html';
    
  })
  .catch(error => {
    alert(error.message);
  });
 });

}









//============================  Order Page Javascript ===========================




var show_item_price_in_menu, meal_name = 'Lunch', hall_name = 'Bangabandhu Sheikh Mujibur Rahman Hall',text_in_add_to_cart_button;
var reference = hall_name+'/Menu/'+meal_name;
var item_name, item_price, item_availability;
 // collection ref
 var colRef = collection(db, reference);


function showDate(){
   userEmail = localStorage.getItem("userEmail");
  document.getElementById('hello').innerHTML = userEmail
  console.log("user email is: " + userEmail )
  var nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1); // Add 1 day to the current date
    // Define an array of month names
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    
    
  // Handle cases where the next day falls in the next month or year
  if (nextDay.getDate() === 1) {
    nextDay.setMonth(nextDay.getMonth() + 1); // Add 1 month
    if (nextDay.getMonth() === 0) {
      nextDay.setFullYear(nextDay.getFullYear() + 1); // Add 1 year
    }
  }

// Extract the date parts
var month = monthNames[nextDay.getMonth()]; // Get month name from array
var day = nextDay.getDate();
var year = nextDay.getFullYear();


    // Format the date as desired (e.g., "Month DD, YYYY")
    var formattedDate = month + " " + day + ", " + year;
  
    // Update the innerHTML of the display element
    document.getElementById('show-date').innerHTML  = formattedDate;
}






function showMenuItems(item_name, show_item_price_in_menu){

  if(item_price==0){
    text_in_add_to_cart_button='Added to cart'
  }
  else{
    text_in_add_to_cart_button='Add to cart'
  }

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
  <a class="btn btn-secondary w-100" id="${item_name}" onclick="addToCartClicked(event, '${meal_name}')">${text_in_add_to_cart_button}</a>
</div>`;




// Get the parent element by its ID name
var parentElement = document.getElementById('menu-items-card-holder');

// Append the new element to the parent element
parentElement.appendChild(newElement);
 
}

 


function menu(){

 colRef = collection(db, reference);

// get collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let items = []
    
    snapshot.docs.forEach(doc => {
      items.push({ ...doc.data(), id: doc.id })
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
    
  })
  .catch(err => {
    item_name = 'Error';
        item_price = 'Error';
        item_availability = false;
  });

}



function addItemsToCart(){

  
}


function addItemsToMenuByAdmin(){
  document.getElementById('add-element-button').addEventListener('click', function() {
    // Add your logic here for what should happen when the button is clicked
  });
  
}



function lunchButtonClicked(){
  document.getElementById('lunch-button').addEventListener("click", function() {
    let lunch_button = document.getElementById('lunch-button');
    lunch_button.style.color = 'white';
    lunch_button.style.backgroundColor = 'rgba(63, 99, 183, 0.689)';
    let dinner_button = document.getElementById('dinner-button');
    dinner_button.style.color = 'black';
    dinner_button.style.backgroundColor = 'white';
    document.getElementById('menu-items-card-holder').innerHTML='';

    meal_name = 'Lunch';
    reference = hall_name+'/Menu/'+meal_name;
    menu();
  
  });
}


function dinnerButtonClicked(){
  document.getElementById('dinner-button').addEventListener("click", function() {
    let dinner_button = document.getElementById('dinner-button');
    dinner_button.style.color = 'white';
    dinner_button.style.backgroundColor = 'rgba(63, 99, 183, 0.689)';
    let lunch_button = document.getElementById('lunch-button');
    lunch_button.style.color = 'black';
    lunch_button.style.backgroundColor = 'white';
    document.getElementById('menu-items-card-holder').innerHTML='';

    meal_name = 'Dinner';
    reference = hall_name+'/Menu/'+meal_name;
    menu();
  
  });
}



function showSelectedHallName(){
  document.getElementById("myDropdownMenu").addEventListener("click", function(event) {
    meal_name='Lunch';
     hall_name = event.target.textContent;
    document.getElementById("showSelectedHallName").innerHTML = `<div class="row py-3 m-0 third-row">
    <div class="col">
      <div class="row m-0 py-3 first-row">
        <div class="col">
          <button
            type="button"
            class="btn btn-secondary btn-lg w-100 disabled"
            id="show-selected-hall-name"
          >
            ${hall_name}
          </button>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById('menu-items-card-holder').innerHTML='';
  let lunch_button = document.getElementById('lunch-button');
    lunch_button.style.color = 'white';
    lunch_button.style.backgroundColor = 'rgba(63, 99, 183, 0.689)';
    let dinner_button = document.getElementById('dinner-button');
    dinner_button.style.color = 'black';
    dinner_button.style.backgroundColor = 'white';
  reference = hall_name+'/Menu/'+meal_name;
  window.selectedItemForLunch.length= 0;
  window.selectedItemForDinner.length= 0;
  menu();
  });
}



function addItemButtonClicked(){
  document.getElementById('add-element-container').addEventListener("click", function(event){
    document.getElementById('popup-container').style.display = "block";
    document.getElementById('add-item-lunch-button').innerHTML = meal_name;
  });

  
}

function closeAddItemPopupClicked(){
  document.getElementById('close-add-item-popup').addEventListener("click", function(event){
    document.getElementById('popup-container').style.display = "none";
  });
}


 function submitAddItemButtonClicked(){
document.getElementById('submit-add-item-popup').addEventListener("click", function(event){
var newItemName = document.getElementById("itemNameToBeAdded").value;
var newItemValue = Number(document.getElementById("itemPriceToBeAdded").value);
var newItem = {
  Available: true,
  Price: newItemValue,
};
reference = hall_name+'/Menu/'+meal_name;

var collectionRef = collection(db, reference);
var documentId = newItemName; // specify the document ID

// Create a new document with the data you want to add
var newItemData = {
  Available: true,
  Price: newItemValue,

};

// Set the new document data for the selected document ID
setDoc(doc(collectionRef, documentId), newItemData)
.then(() => {
  document.getElementById('popup-container').style.display = "none";

})
.catch((error) => {
  console.error('Error adding document: ', error);
});


});
}





function orderPage(){
  
  showDate();

  menu();

  lunchButtonClicked();

  dinnerButtonClicked();

  showSelectedHallName();

addItemButtonClicked();

closeAddItemPopupClicked();

submitAddItemButtonClicked();


}









function cartPage(){

}













//===============================  Select Javascript function  =================

if(document.title == 'Log In'){
  loginPage();
}
else if(document.title == 'Order Meal'){
  orderPage();
}
else if(document.title == 'Cart'){
  cartPage();
}