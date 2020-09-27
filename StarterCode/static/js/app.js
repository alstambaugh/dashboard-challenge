// Populate dropdown list
var select = document.getElementById("selDataset");
var options = data.names;
for (var i = 0; i < options.length; i++) {
    
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}
