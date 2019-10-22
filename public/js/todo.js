  
  //function that gets the to do list of user from the database
  async function getFromDb(){
      let id = Cookies.get('userId')
       let key = Cookies.get('key')
      try {
        
        //get request to get the list items of user
        let res = await axios.get(`/list?id=${id}&key=${key}`)
        
        //for each item add to the list in ui
        res.data.forEach(item =>{
           addToList(item.body,item.id) 
        })
        
        //hide the spinner loader
        document.getElementsByClassName("loader")[0].style.display = "none"
      }catch(err){
         
      }
    }
  
  //call the getFrmDb function when the page is fully loaded  
  //i set the timeut for dramatic effect so that you can enjoy the cool spinner
  document.onload = setTimeout(()=>{
    getFromDb()
  },1000)
  
  // Create a new list item when clicking on the "Add" button
  function newElement() {
     //get vaalue from input box
     var inputValue = document.getElementById("myInput").value; 

     //if value is empty prompt
     if(inputValue === '') {
        alert("You must write something!");
        return
      }

      //clear the input fieled
      document.getElementById("myInput").value = "";

      //generate a random id for the to do item
      let id = Math.floor(Math.random() * 700000000)+"p"+inputValue.length
      //add the item to the ui
      addToList(inputValue,id)
      //add item to db
      addToDb(id)
  }
  
  //adds and item to the ui
  function addToList(inputValue,id){
    //create a list item
    var li = document.createElement("li");
    //add the text to the list items
    var t = document.createTextNode(inputValue);
    li.appendChild(t)
    //sets the id
    li.setAttribute('id',id)
    
    //create the x span for removing item
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    //add it to the list item
    li.appendChild(span);
    //append list item to out list
    document.getElementById("myUL").appendChild(li);
    
    //set the events 
    addEvents(span,li,id)
  }

  //sends request to remove item from list
  function removeFromDb(id){

  }

  //sends request to add item to list
  function addToDb(id){

  }

  //send request to mark item as done
  function doneDb(id){

  }

  //sets the event handlers
  function addEvents(close,li,id){
    close.onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      removeFromDb(id)
    }
    
    li.addEventListener('click', function(ev) {
        ev.target.classList.toggle('checked')
        doneDb(id)
    })
  }