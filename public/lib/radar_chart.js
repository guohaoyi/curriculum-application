//Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
//I only made some additions and aesthetic adjustments to make the chart look better 
//(of course, that is only my point of view)
//Such as a better placement of the titles at each line end, 
//adding numbers that reflect what each circular level stands for
//Not placing the last level and slight differences in color
//
//For a bit of extra information check the blog about it:
//http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html
var RadarChart = {
  draw: function(id, d, options,all_skills){
      var skills = all_skills;
      var cfg = {
       radius: 5,
       w: 400,
       h: 400,
       factor: 1,
       factorLegend: .85,
       levels: 3,
       maxValue: 7,
       radians: 2 * Math.PI,
       opacityArea: 0.5,
       ToRight: 5,
       TranslateX: 80,
       TranslateY: 80,
       ExtraWidthX: 100,
       ExtraWidthY: 100,
       color: d3.scale.category10()
      };
      
      if('undefined' !== typeof options){
	    for(var i in options){
		if('undefined' !== typeof options[i]){
		      cfg[i] = options[i];
		    }
		  }
	  }

      cfg.maxValue = Math.max(cfg.maxValue, 
			      d3.max(d, function(i){
				  return d3.max(i.map(function(o){return o.value;}))}));
      var allAxis = (skills.map(function(i, j){return i.skill}));
      var total = allAxis.length;
      var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
      var Format = d3.format('d');
      d3.select(id).select("svg").remove();
      
 
      var g = d3.select(id)
      .append("svg")
//      .attr("weight", 2*cfg.w + cfg.ExtraWidthX)  FIXME Get these to work again!! 
//      .attr("height", 2*cfg.h + cfg.ExtraWidthY)
      .attr("width", 450)
      .attr("height", 450)
      .append("g")
      .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
      //MKB
	  //.attr("transform","scale(0.5)");
      ;

 //     var tooltip;
      
      //Circular segments
      for(var j=0; j<cfg.levels-1; j++){
	    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	    g.selectAll(".levels")
	     .data(allAxis)
	     .enter()
	     .append("svg:line")
	     .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	     .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	     .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	     .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	     .attr("class", "line")
	     .style("stroke", "grey")
	     .style("stroke-opacity", "0.75")
	     .style("stroke-width", "0.3px")
	     .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	  }

      //Text indicating at what value each level is
      if(d.length>0 && d[0].length>0)
      {
	  for(var j=0; j<cfg.levels; j++){
	    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	    g.selectAll(".levels")
	     .data([1]) //dummy data
	     .enter()
	     .append("svg:text")
	     .attr("x", function(d){return levelFactor*(1-1.1*cfg.factor*Math.sin(0));})
	     .attr("y", function(d){return levelFactor*(1-1.1*cfg.factor*Math.cos(0));})
	     .attr("class", "legend")
	     .style("font-family", "sans-serif")
	     .style("font-size", "10px")
	     .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	     .attr("fill", "#737373")
	     .text(Format((j+1)*cfg.maxValue/cfg.levels));
	  }
      }
      
      series = 0;

      var skill_imgs = [];
      var axis = g.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

      axis.append("line")
      .attr("x1", cfg.w/2)
      .attr("y1", cfg.h/2)
      .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

     var toolTip = d3.select("body").append("div")
      .attr("class","tooltip")
      .style("opacity",0);


      axis.append("svg:image")
      .attr("class", "legend")
      .attr("xlink:href",function(d)
	    {
		var img_str = d.replace(/\s+/g,'');
		skill_imgs.push(img_str.toLowerCase());
		return "/img/" + img_str.toLowerCase() + ".png";
	    })
      .attr("id",function(d,i){ return "img" + skill_imgs[i];})
      .attr("height","50px")
      .attr("width","50px")
      .attr("transform", function(d, i){return "translate(-25, -25)"})
      .attr("x", function(d, i){return cfg.w/2*(1-1.3*cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y", function(d, i){return cfg.h/2*(1-1.3*cfg.factor*Math.cos(i*cfg.radians/total));})
      .on("mouseover", function(d,i) 
	  {
	      toolTip.transition()
	      .duration(200)
	      .style("opacity",.9);
	      
	      toolTip.html(d)
		  .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
	      
	  })
      .on("mouseout",function(d,i)
	  {
	      toolTip.transition()
	      .duration(500)
	      .style("opacity",0);
	  });
/*
      for(var i=0;i<skill_imgs.length;i++)
      {
	  $("#img" + skill_imgs[i]).on("mouseover",function(d)
	  {
	      for(var j=0;j<allAxis.length;j++)
	      {
		  if("img" + allAxis[j].replace(/\s+/g,'').toLowerCase()==this.id)
		  {
		      document.getElementById((this.id).replace("img",'')).innerHTML = allAxis[j];
		  }
	      }
	  })
	  $("#" + skill_imgs[i]).on("mouseout",function(d)
          {
              for(var j=0;j<allAxis.length;j++)
              {
                  if("img" + allAxis[j].replace(/\s+/g,'').toLowerCase()==this.id)
                  {
		            document.getElementById((this.id).replace("img",''))[0].innerHTML = "";
                  }
              }
          })
      }
*/
      if(d.length>0 && d[0].length>0)
      {
      d.forEach(function(y, x){
	    dataValues = [];
	    g.selectAll(".nodes")
	  .data(y, function(j, i){
	        dataValues.push([
		    cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
		    cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		      ]);
	      });  
	  dataValues.push(dataValues[0]);
	    g.selectAll(".area")
	   .data([dataValues])
	   .enter()
	   .append("polygon")
	   .attr("class", "radar-chart-serie"+ series + " semester" + series + " active")
	   .style("stroke-width", "2px")
	   .style("stroke", cfg.color(series))
	   .attr("points",function(d) {
	        var str="";
	        for(var pti=0;pti<d.length;pti++){
		     str=str+d[pti][0]+","+d[pti][1]+" ";
		     }
	        return str;
	         })
	   .style("fill", function(j, i){return cfg.color(series)})
	   .style("fill-opacity", cfg.opacityArea)
	   series++;
	  })
      };

      series=0;


      d.forEach(function(y, x){
	    g.selectAll(".nodes")
	  .data(y).enter()
	  .append("svg:circle")
	  .attr("class", "radar-chart-serie"+ series + " semester" + series + " active")
	  .attr('r', cfg.radius)
	  .attr("alt", function(j){return Math.max(j.value, 0)})
	  .attr("cx", function(j, i){
	        dataValues.push([
		    cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
		    cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		    ]);
	      return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
	      })
	  .attr("cy", function(j, i){
	        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
	      })
	  .attr("data-id", function(j){return j.axis})
	  .style("fill", cfg.color(series)).style("fill-opacity", .9)
	  .append("svg:title")
	  .text(function(j){return Math.max(j.value, 0)});

	    series++;
	  });
      //Tooltip
/*      tooltip = g.append('text')
         .style('opacity', 0)
         .style('font-family', 'sans-serif')
         .style('font-size', '13px');*/
  }
};
