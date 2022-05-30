

d3.json("samples.json").then(function(data){
  console.log("hello");
});

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
};

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h4").text("ID: " + result.id)
    PANEL.append("h4").text("Location: " + result.location)
    PANEL.append("h4").text("Ethnicity: " + result.ethnicity)
    PANEL.append("h4").text("Gender: " + result.gender)
    PANEL.append("h4").text("Age: " + result.age)
    PANEL.append("h4").text("BB Type: " + result.bbtype)
    PANEL.append("h4").text("WFREQ: " + result.wfreq);
  });
}
