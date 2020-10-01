function DrawBargraph(sampleId) {
    console.log(`Bargraph(${sampleId})`);
}

function DrawBubblechart(sampleId) {
    console.log(`Bubblechart(${sampleId})`);
}

function DrawGauge(sampleId) {
    console.log(`Gauge(${sampleId})`);
}

function optionChanged(newSampleId) {
    console.log(`new ${newSampleId}`);

    DrawBargraph(newSampleId);
}

function InitDashboard() {
    
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names; 

        //Populate dropdown with IDs
        sampleNames.forEach((sampleId) => {
            selector.append("option").text(sampleId).property("value", sampleId);
        });

        //Get first sample Id
        var sampleId = sampleNames[0];
     
        //Draw the graphs
        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        DrawGauge(sampleId);

    });
}

InitDashboard()