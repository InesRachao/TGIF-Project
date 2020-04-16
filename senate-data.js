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
        console.log(row)
        table.appendChild(row)
    }
}
buildTable(member)

