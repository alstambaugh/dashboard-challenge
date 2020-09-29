//Read in JSON file
// var data = d3.json("samples.json").then(function(data) {
//     console.log(data);
// });

console.log(data);

// Populate dropdown list
var select = document.getElementById("selDataset");
var options = data.names;

console.log(options);
for (var i = 0; i < options.length; i++) {
    
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

var id = "945"
//Data for demographics
function demographics() {
    for (var i = 0; i <data.samples.length; i++) {
        if (data.samples[i].id === id) {
            Object.entries(demos).forEach(function([key,value]) {
                var cell = panel-body.append("td");
            })

            //var labels = Object.keys(data.metadata[i]);
           //var demo = Object.values(data.metadata[i]);
           //var demos = Object.entries(data.metadata[i]);
            
            //console.log(demos);
        } 
    }  
            
};

//Data for bar chart
function filterOTU() {
    for (var i = 0; i <data.samples.length; i++) {
        if (data.samples[i].id === id) {
            var valueList = data.samples[i].sample_values;
            
            console.log(valueList);
        } 
    }  
            
};

filterOTU();
demographics();
