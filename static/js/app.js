function optionChanged(selectedID){
d3.json("samples.json").then((data) => {
d3.select("#selDataset").html("");   
data.metadata.forEach(item => {d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);});
d3.select("#selDataset").node().value = selectedID;
const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
const panelDisplay = d3.select("#sample-metadata");
panelDisplay.html("");
Object.entries(idMetadata[0]).forEach(item=> {panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)});

const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
var sampleValue = idSample[0].sample_values.slice(0,10);
sampleValue= sampleValue.reverse();
var otuID = idSample[0].otu_ids.slice(0,10);
otuID = otuID.reverse();
var otuLabels = idSample[0].otu_labels
otuLabels = otuLabels.reverse();
const yAxis = otuID.map(item => 'OTU' + " " + item);
const trace = {y: yAxis, x: sampleValue, type: 'bar', orientation: "h", text:  otuLabels,
marker: {color: 'rgb(23, 68, 190)', line: {width: 1}}},
layout = {title: '<b>Top 10 OTUs Bar Chart</b>', xaxis: {title: 'No. of Samples'}, yaxis: {title: 'OTU ID'}};
Plotly.newPlot('bar', [trace], layout,  {responsive: true});

var sampleValue1 =idSample[0].sample_values;
var otuID1= idSample[0].otu_ids;
const trace1 = {x: otuID1, y: sampleValue1, mode: 'markers', marker: {color: otuID1, colorscale: "Jet", size: sampleValue1}},
layout1 = {title: '<b>Bubble Chart For Each Sample</b>', xaxis: {title: 'OTU ID'}, yaxis: {title: 'No. of Samples'}, showlegend: false, height: 550, width: 1000};
Plotly.newPlot('bubble', [trace1], layout1);
});
}
optionChanged(940);
d3.select("#selDataset").on('change',() => {optionChanged(d3.event.target.value);});