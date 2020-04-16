let statistics = {"Number of Republicans":0, "Number of Democrats":0, "Number of Independents":0, "Least Loyal":0, "Most Loyal":0};


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