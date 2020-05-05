let senators;
let ajaxResult = fetch('https://api.propublica.org/congress/v1/113/senate/members.json',{
  method: "GET",
  headers:{
    "X-API-Key": "Zjbs5WDDqPgKG1B7B1TBhHZFgYGJ9dsqjhgLpMO1"
  }
})
  .then(response => response.json())
  .then(dados =>{
        console.log(dados.results[0].members);
        senators = dados.results[0].members;
        buildTable(senators);
        addEvent(senators);
        selectbyState(senators);
        setTimeout(()=> {document.querySelector("#loader").className += ' ' + "hide-loader"})
})
console.log(ajaxResult);




function buildTable(array) {
    let table = document.getElementById("senate-data");

    for(let i = 0;  i < array.length; i++){
        let row = document.createElement('tr');
        let fullName = "";

        if (array[i].middle_name === null) {
            fullName = array[i].first_name + " " + array[i].last_name;
        } else {
            fullName = array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name;
        }
        
        row.insertCell().innerHTML = fullName.link(array[i].url)
        row.insertCell().innerHTML = array[i].party
        row.insertCell().innerHTML = array[i].state
        row.insertCell().innerHTML = array[i].seniority
        row.insertCell().innerHTML = array[i].total_votes
        table.appendChild(row)
    }
}



function addEvent(array){
    let checkbox = Array.from(document.querySelectorAll('input[name="party"]')).forEach(box => box.addEventListener("change",()=>filter(array)));
    let select = document.getElementById("state").addEventListener("change", ()=>filter(array));
    
  }
  

function filter(array){
  let table = document.getElementById("senate-data");
  let checkboxvalue = Array.from(document.querySelectorAll('input[name="party"]:checked')).map(function(myinput) {
    return myinput.value;
  });
  
  
  let select = document.getElementById("state").value;
  console.log(select)

  if (checkboxvalue.length === 0 && select === "All"){
    table.innerHTML = ""
    buildTable(array);
  } 
  if(checkboxvalue.length > 0 && select === "All"){
    table.innerHTML = ""
    let result = array.filter(member => checkboxvalue.includes(member.party));
    buildTable (result);
    
  }
  if (checkboxvalue.length === 0 && select !== "All") {
    table.innerHTML = ""
    let result = array.filter(member => select === member.state);
    buildTable (result);
  }
  if (checkboxvalue.length > 0 && select !== "All"){
    table.innerHTML = ""
    let result =  array.filter(member => checkboxvalue.includes(member.party) && select === member.state);
    buildTable (result);
  }
  };



  function selectbyState(array){
    let states = []
    let select = document.getElementById("state");

    for (let i = 0; i < array.length; i++) {
        states.push(array[i].state);
    }
    
    let filteredArray = states.filter(function(item, pos){
        return states.indexOf(item) === pos
    }).sort()

    

    for (let j = 0; j < filteredArray.length; j++) {
    let options = document.createElement('option');
        options.innerHTML = filteredArray[j];
        options.value = filteredArray[j];
        select.appendChild(options);     
    }
    
}


function loaded(){
  let loaded = document.createElement('div');
    loaded.setAttribute('class', 'loader')
  let trs = document.querySelectorAll('td')
    console.log(trs)
}


