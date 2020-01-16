var margin = {top: 20, right: 20, bottom: 20, left: 20},
 width = 500 - margin.right - margin.left,
 height = 500 - margin.top - margin.bottom,
 radius = width/2;

// color range
var color = d3.scaleOrdinal()
	.range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

// donut chart arc
var arc2 = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(radius - 70);

// arc for the labels position
var labelArc = d3.arc()
	.outerRadius(radius - 40)
	.innerRadius(radius - 40);

// generate pie chart and donut chart
var pie = d3.pie()
	.sort(null)
	.value(function(d) { return d.Manpower; });

// define the svg donut chart
var svg2 = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// import data 
d3.csv("GlobalFirePower.csv", function(error, data) {
 if (error) throw error;
 
	 // parse data
	data.forEach(function(d) {
	d.Manpower = +d.Manpower;
	d.Country = d.Country;
	})
	// "g element is a container used to group other SVG elements"
	var g2 = svg2.selectAll(".arc2")
	.data(pie(data))
	.enter().append("g")
	.attr("class", "arc2");

	// append path 
	g2.append("path")
	.attr("d", arc2)
	.style("fill", function(d) { return color(d.data.Country); })
	.transition()
	.ease(d3.easeLinear)
	.duration(2000)
	.attrTween("d", tweenDonut);
	 
	// append text
	g2.append("text")
	.transition()
	.ease(d3.easeLinear)
	.duration(2000)
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.attr("dy", ".35em")
	.text(function(d) { return d.data.Country; });
 
});