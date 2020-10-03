//Code walk-through by Dom during office hours was used as starter code for this file

//Function to draw the bar graph
function DrawBargraph(sampleId) {
    
    //Get data from json file
    d3.json("samples.json").then((data) => {
    
        var samples = data.samples;
        var resultArray = samples.filter(sample => sample.id == sampleId);
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
        var resultArray = samples.filter(sample => sample.id == sampleId);
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

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var metadataInfo = metadata.filter(metadata => metadata.id == sampleId);
        var washFreq = metadataInfo[0].wfreq;

        var gaugeData = {
            value: washFreq,
            title: { text: "Scrubs per Week"},
            type: "indicator",
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            mode: "gauge+number",
            gauge: {
                bar: {color: "#FFEB3b"},
                axis: {range: [null, 9], tickvals: [1,2,3,4,5,6,7,8,9]},
                steps: [
                    { range: [0, 1], color: "#acf0f2" },
                    { range: [1, 2], color: "#8cd3dd" },
                    { range: [2, 3], color: "#6eb6c9" },
                    { range: [3, 4], color: "#529ab4" },
                    { range: [4, 5], color: "#468ca9" },
                    { range: [5, 6], color: "#3a7e9e" },
                    { range: [6, 7], color: "#236388" },
                    { range: [7, 8], color: "#0f4972" },
                    { range: [8, 9], color: "#00305a" },

                  ]
            }
        }

        var gaugeLayout = {
            title: "Belly Button Washing Frequency"
        };

        Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
        
    })
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

        console.log(data)
        
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