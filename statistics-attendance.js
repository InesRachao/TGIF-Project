let statistics = {"Number of Republicans":0, "Number of Democrats":0, "Number of Independents":0, "Least Engaged":0, "Most Engaged":0};


let listRepublicans; 
let listDemocrats;
let listIndependents;

function listMembers(array, party) {
    let results = [];

    for (let i = 0; i < array.length; i++) {
       if (array[i].party === party) {
            results.push(array[i]);
       }    
    }
    return results;  
}

listRepublicans = listMembers(data.results[0].members, "R");
listDemocrats = listMembers(data.results[0].members, "D");
listIndependents = listMembers(data.results[0].members, "ID");

statistics["Number of Republicans"] = listRepublicans.length;
statistics["Number of Democrats"] = listDemocrats.length;
statistics["Number of Independents"] = listIndependents.length;
console.log(statistics);



function averageVotes(array) {
    let results =[];

    for (let i = 0; i < array.length; i++) {
        results.push(array[i].votes_with_party_pct);
    }
    
    let n = results.reduce((a,b) => a + b) / array.length;
    return n.toFixed(2);

}
statistics["Republicans Average Votes"] = averageVotes(listRepublicans);
statistics["Democrats Average Votes"] = averageVotes(listDemocrats);
statistics["Independents Average Votes"] = averageVotes(listIndependents);
console.log(statistics);




function buildTable() {
    let table = document.getElementById("senate-glance");

    let rowRep = document.createElement('tr');
    let rowDem = document.createElement('tr');
    let rowInd = document.createElement('tr');

    rowRep.insertCell().innerHTML = "Republicans";
    rowDem.insertCell().innerHTML = "Democrats";
    rowInd.insertCell().innerHTML = "Independents"     
    rowRep.insertCell().innerHTML = statistics["Number of Republicans"];
    rowDem.insertCell().innerHTML = statistics["Number of Democrats"];
    rowInd.insertCell().innerHTML = statistics["Number of Independents"]
    rowRep.insertCell().innerHTML = statistics["Republicans Average Votes"];
    rowDem.insertCell().innerHTML = statistics["Democrats Average Votes"];
    rowInd.insertCell().innerHTML = statistics["Independents Average Votes"];

    table.appendChild(rowRep);
    table.appendChild(rowDem);
    table.appendChild(rowInd);
}
buildTable();



function leastEngaged(array) {
    let result = []

    array.forEach(member => {
        result.push(member.missed_votes_pct)
    });
    
    let percentage = Math.floor(array.length * 0.1);

    let x = result.sort((a,b) => b-a).slice(0, percentage);

    let y = Math.min.apply(null, x);

    return array.filter(member => member.missed_votes_pct >= y);
}
console.log(leastEngaged(data.results[0].members));