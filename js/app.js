//select define all variables
const form = document.querySelector('#add-form'); 
const addInput = document.querySelector('#add'); //input
const shopList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clearList');

const checkUndone = document.querySelector('.undone');
const checkDone = document.querySelector('.done'); 

//load all events
loadEventListeners();

//define LoadEvents function
function loadEventListeners() {

  // DOM Load event
  document.addEventListener('DOMContentLoaded', getList);
  // Add task event
  form.addEventListener('submit', addItem);
  // Remove task event
  shopList.addEventListener('click', removeItem);
  // Clear task event
  clearBtn.addEventListener('click', clearItems);

}

//getTasks function for saved list to load
function getList() {
    let items;
    if(localStorage.getItem('items') === null){
        items = [] ;
    }
    else{
        //create array of items stores in LS
        items = JSON.parse(localStorage.getItem('items'));
    }

    //foreach loop to create shopping list with each item in array created
    items.forEach(function(item){
        //create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        // add check box
        li.innerHTML =items.indexOf(item)+1+'. ';
        li.appendChild(document.createTextNode(item));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove">DELETE</i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        shopList.appendChild(li);

    });
}

//ADDING ITEMS WITH BUTTON AND ENTER KEY
    function addItem(e){
        if(addInput.value === ''){
         alert('add item');
        }
        let tasks;
        if(localStorage.getItem('items') === null){
          items = [];
        } else {
          items = JSON.parse(localStorage.getItem('items'));
        } 
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // add check box
    li.innerHTML = items.length + 1 +'. ';
    // Create text node and append to li
    li.appendChild(document.createTextNode(addInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove">DELETE</i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    shopList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(addInput.value);

    // Clear input
    addInput.value = '';

    e.preventDefault();   
        

    }

    
// Store Task
function storeTaskInLocalStorage(item) {
    let items;
    if(localStorage.getItem('items') === null){
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
  
    items.push(item);
  
    localStorage.setItem('items', JSON.stringify(items));
  }
  
//delete function
    function removeItem(e){
        if(e.target.parentElement.classList.contains('delete-item')) {
            if(confirm('Are You Sure?')) {
              e.target.parentElement.parentElement.remove();
        
              // Remove from LS
              removeItemFromLocalStorage(e.target.parentElement.parentElement);
              
            }
          }
    }
//remove deleted from ls
function removeItemFromLocalStorage(shopItem) {
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item, index){
    if(shopItem.textContent === item){
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

//clear items
function clearItems() {
  
  while(shopList.firstChild) {
    shopList.removeChild(shopList.firstChild);
  }
  //while ul is empty

  // Clear from LS
  clearItemsFromLocalStorage();
}

// Remove from LS
function  clearItemsFromLocalStorage(item) {
  localStorage.clear();
}

