function RadarScript(semesters,learned_skills,all_skills)
{
var w = 300,h = 300;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = semesters

//Data
var d = learned_skills;

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 7,
  levels: 6,
  ExtraWidthX: 0,
  ExtraWidthY: 0
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
    
//RadarChart.draw("#chart", d, mycfg,all_skills);


////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h)


//Create the title for the legend
var text = svg.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(90,0)') 
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "12px")
    .attr("fill", "#404040")
    .text("Semesters");
    
    //Initiate Legend
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)') 
    ;
    //Create colour squares
    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append("rect")
      .attr("x", w - 65)
      .attr("y", function(d, i){ return i * 20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d, i){ return colorscale(i);})
      .on("click",function(d,i)
      {
	  var color = this.style.fill;
	  var elements = document.getElementsByClassName("semester" + i);
	  var polygon = elements[0];
	  var circles = [];
	  for(var j=0;j<elements.length-1;j++)
	  {
	      circles[j] = elements[j+1];
	  }
	  polygon.classList.toggle("active");
	  if(polygon.classList.contains("active"))
	  {
	      polygon.setAttribute("style","fill:" + color + ";fill-opacity:0.5;stroke:" + color + "; stroke-width:2px");
	  }
	  else
	  {
	      polygon.setAttribute("style","fill-opacity:0");
	  }
	  for(var k=0;k<circles.length;k++)
	  {
	      circles[k].classList.toggle("active");
              if(circles[k].classList.contains("active"))
	      {
		  circles[k].setAttribute("style","fill:" + color);
	      }
	      else
	      {
	 	  circles[k].setAttribute("style","fill-opacity:0");
	      } 
	  }
      })
      ;
    //Create text next to squares
    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append("text")
      .attr("x", w - 52)
      .attr("y", function(d, i){ return i * 20 + 9;})
      .attr("font-size", "11px")
      .attr("fill", "#737373")
      .text(function(d) { return d; })
    ;
    if ((d.length == 0) || (d[0].length == 0))
{
    console.log("adding warning");
var warning = "<table> <tbody> <tr> <td><svg id='warning' width='400px'> <text x = '10' y = '50' font-size = '15'> No courses added. Add courses to see visualization </text> </svg> </td> <td><a class='btn btn-default btn-sm' href='/courseSearch' style='float: top;'> Add Courses to Build Your Visualization </a></td></tr></tbody></table>"
    document.getElementById("chart").innerHTML= warning;
    
}
else
{
RadarChart.draw("#chart", d, mycfg,all_skills); 
}
}
