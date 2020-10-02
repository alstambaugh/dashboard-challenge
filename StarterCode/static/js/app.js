function DrawBargraph(sampleId) {
    console.log(`Bargraph(${sampleId})`);

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

function DrawBubblechart(sampleId) {
    console.log(`Bubblechart(${sampleId})`);
}

function DrawGauge(sampleId) {
    console.log(`Gauge(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`Metadata ${sampleId}`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var panel = d3.select('#sample-metadata');
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {

            var textToShow = `SampleId = ${sampleId}`;
            panel.append("h6").text(textToShow);

        });
    });
}

function optionChanged(newSampleId) {
    console.log(`new ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    DrawGauge(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {  

    //Load JSON data
    d3.json("samples.json").then((data) => {
        console.log(data);

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