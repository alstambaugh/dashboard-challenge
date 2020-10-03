//Code walk-through by Dom during office hours was used as starter code for this file

//Function to draw the bar graph
function DrawBargraph(sampleId) {
    
    //Get data from json file
    d3.json("samples.json").then((data) => {
    
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        
        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l:150}
        };

        Plotly.newPlot("bar", [barData], barLayout);
    });
}

//Function to draw bubble chart
function DrawBubblechart(sampleId) {
    
    //Get data from JSON file
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels, 
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }   
        };

        var bubbleLayout = {
            title: "Bacterial Cultures Found",
            xaxis: { title: "OTU IDs"},
        };

        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);
    })
}

function DrawGauge(sampleId) {
    console.log(`Gauge(${sampleId})`);
}

function ShowMetadata(sampleId) {
    
    //Get data from JSON file
    d3.json("samples.json").then((data) => {
        var demographic = data.metadata;
        var resultArray = demographic.filter(demographic => demographic.id == sampleId);
        var result = resultArray[0];

        var panel = d3.select('#sample-metadata');
        panel.html("");

        Object.entries(result).forEach(([k, v]) => {

            var text = `${k} = ${v}`;
            panel.append("h6").text(text);

        });
    });
}

//Function to update charts when selector is changed
function optionChanged(newSampleId) {
    
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    DrawGauge(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {  

    //Load JSON data
    d3.json("samples.json").then((data) => {
        
        var selector = d3.select("#selDataset");
        var options = data.names; 

        //Populate dropdown with IDs
        options.forEach((sampleId) => {
            selector.append("option").text(sampleId).property("value", sampleId);
        });
        

        //Get first sample Id
        var sampleId = options[0];
     
        //Draw the graphs
        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        DrawGauge(sampleId);
        ShowMetadata(sampleId);

    });
}

InitDashboard()