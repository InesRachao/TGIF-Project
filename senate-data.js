let member = data.results[0].members;

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
buildTable(member);



function addEvent(array){
    let checkbox = Array.from(document.querySelectorAll('input[name="party"]')).forEach(box => box.addEventListener("change",()=>filter(array)));
    let select = document.getElementById("state").addEventListener("change", ()=>filter(array));
    
  }
  addEvent(member);

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
selectbyState(data.results[0].members);

