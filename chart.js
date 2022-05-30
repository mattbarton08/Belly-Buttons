function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let samples_array=data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let sampleN=samples_array.filter(sampleObj => sampleObj.id == sample)
    //  5. Create a variable that holds the first sample in the array.
    let sample1=sampleN[0]
    console.log(sample1)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids=sample1.otu_ids
    var otu_labels=sample1.otu_labels
    var sample_values=sample1.sample_values
    console.log(sample1.otu_label)
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    //let yvalues = otu_ids.slice(0,10).reverse()
    let yticks = otu_ids.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse()
    // 8. Create the trace for the bar chart.s s
    let trace={
      x:sample_values,
      y:yticks,
      type: "bar",
      orientation: "h"
    }
    let barData = [trace];
      
//     ];
//     // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    }
     
//     };
//    10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar-plot", barData, barLayout)

          // 1. Create the trace for the bubble chart.
    var bubbleTrace = {
      x:otu_ids,
      y:sample_values,
      text:otu_labels.map(sampleObj => "OTU " + sampleObj),
      mode:"markers",
      marker:{
        size:sample_values,
        color:otu_ids
      }};

      let bubbleData = [bubbleTrace];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title:"Bacteria Cultures Per Sample",
      showlegend: false,
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData, bubbleLayout); 

    
// Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    let meta_array=data.metadata
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let metaN=meta_array.filter(sampleObj => sampleObj.id == sample)
    //  5. Create a variable that holds the first sample in the array.
    let meta1=metaN[0]
    console.log(meta1)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids=meta1.otu_ids
    var otu_labels=meta1.otu_labels
    var sample_values=meta1.sample_values
    console.log(meta1.otu_label)
    // 3. Create a variable that holds the washing frequency.
    wfreq=meta1.wfreq

    // 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      value:wfreq,
      title: "<b>Belly Button Washing Frequency</b><br> Scrubs per Week ",
      subtitle: "Scrubs per Week",
      type:"indicator",
      mode:"gauge+number",
      gauge:{
        axis:{range:[null,10]},
        steps:[
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "limegreen"},
          {range: [8,10], color: "darkgreen"}],
        bar: {color: "black"},
      }
     
  };
  let gaugeData=[gaugeTrace]
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData);
  });
}