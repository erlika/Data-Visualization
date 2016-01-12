d3.csv("data/473753677_82015_1729_airline_delay_causes.csv", function(d) {	
  return {
    'Year': +d.year,
	'Month': +d.month,
    'CarrierName': d.carrier_name,
	'Airport': d.airport,
	'delay': +d.arr_delay,
    'OnTime': +(1.00-(d.arr_del15/d.arr_flights)),
	'Carrier': +(1.00-(d.carrier_ct/d.arr_del15)),
	'Weather': +(1.00-(d.nas_ct/d.arr_del15)),
	'Security': +(1.00-(d.security_ct/d.arr_del15)),
    'Arrivals': +d.arr_flights
  }; 
}, function(data) {
	'use strict';



	// ** Remove comments to enable debugger   
	// ** debugger;
  
	
	my_graph_draw(data);
	// ** debugger;
	
});

function my_graph_draw(data) {
	
	var filteredData = [];
	var filteredDataC = [];
	var filteredDataA = [];
	var filteredDataY = [];

	var nestchartData = d3.nest()

		.key(function(d) { return d.CarrierName; })
		.key(function(d) { return d.Year; })
		.rollup(function(v) { return {
			OnTime: d3.mean(v, function(d) { return d.OnTime; }) //,
//			Carrier: d3.mean(v, function(d) { return d.Carrier; }),
//			Security: d3.mean(v, function(d) { return d.Security; }),
//			Weather: d3.mean(v, function(d) { return d.Weather; })
			}; })
		.map(data);

	var IndustryData = d3.nest()

		.key(function(k) { return k.Year; })
		.rollup(function(v) { return {
			OnTime_Iavg: d3.mean(v, function(d) { return d.OnTime; }) //,

			}; })
		.map(data);
	

	


	debugger;	


    chartData = flatten(nestchartData,IndustryData); 
	

	
	// working: var svg = dimple.newSvg('#graph1',800, 400)
    var svg = dimple.newSvg('#graph1',1400, 400)
	
	// ** Remove comments to enable debugger	
	// ** ////////////////////////
	// ** debugger;
	// ** /////////////////////////

	//var filteredDataY = dimple.filterData(data, "Year");
	// var myChart = new dimple.chart(svg, chartData);
	
	// ** debugger;
	var myChart = new dimple.chart(svg, chartData);

	

	myChart.setBounds(90, 50, 1100, "77%");  	
	// ** set y axis
	var minY = 0.5,
		maxY = 1;
	var y = myChart.addMeasureAxis('y', 'OnTime');
	y.tickFormat = '%';
	y.overrideMin = minY;
	y.overrideMax = maxY;
	y.title = '%age of Arrival on-Time';

	// ** set x axis
	var minX = 2003,
		maxX = 2015;
	var x = myChart.addMeasureAxis('x','Year','%b');
	x.tickFormat = 'd';
	x.overrideMin = minX;
	x.overrideMax = maxX;  
	x.title = 'Years'; 


  
  
	// ** set series and legend

	var s = myChart.addSeries(['Year','Carrier'], dimple.plot.scatter);
	var p = myChart.addSeries(['Year','Carrier'], dimple.plot.line);
	
	var legend = myChart.addLegend(1230, 75, 0, 350, 'left');
	
	legend.series = [s];

  
	// ** draw

	// ** Remove comments to enable debugger	
	// ** debugger;
	// ** ///////////////////////////////////////////
	myChart.draw();

	
	// ** This is a critical step.  By doing this we orphan the legend. This
    // ** means it will not respond to graph updates.  Without this the legend
    // ** will redraw when the chart refreshes removing the unchecked item and
    // ** also dropping the events we define below.
    myChart.legends = [];

    // ** This block simply adds the legend title. I put it into a d3 data
    // ** object to split it onto 2 lines.  This technique works with any
    // ** number of lines, it isn't dimple specific.
    svg.selectAll("title_text")
          .data(["Click legend to","show/hide Carrier:"])
          .enter()
          .append("text")
            .attr("x", 1230)
            .attr("y", function (d, i) { return 70 + i * 14; })
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("color", "Black")
            .text(function (d) { return d; });

    // ** Get a unique list of Owner values to use when filtering
    var filterValues = dimple.getUniqueValues(chartData, "Carrier");
    // ** Get all the rectangles from our now orphaned legend
    legend.shapes.selectAll("rect")
        // ** Add a click event to each rectangle
        .on("click", function (e) {
            // ** This indicates whether the item is already visible or not
			var hide = false;
            var newFilters = [];
            // ** If the filters contain the clicked shape hide it
            filterValues.forEach(function (f) {
				if (f === e.aggField.slice(-1)[0]) {
					hide = true;
				} else {
					newFilters.push(f);
				}
            });
            // ** Hide the shape or show it
            if (hide) {
				d3.select(this).style("opacity", 0.2);
            } else {
				newFilters.push(e.aggField.slice(-1)[0]);
				d3.select(this).style("opacity", 0.8);
            }
            // ** Update the filters
            filterValues = newFilters;
            // ** Filter the data
            myChart.data = dimple.filterData(chartData, "Carrier", filterValues);
            // ** Passing a duration parameter makes the chart animate. Without
            // ** it there is no transition
            myChart.draw(800);
			
			
			// ** handle mouse events on gridlines
			y.gridlineShapes.selectAll('line')
				.style('opacity', 0.25)
				.on('mouseover', function(e) {
					d3.select(this)
						.style('opacity', 1);
				}).on('mouseleave', function(e) {
					d3.select(this)
						.style('opacity', 0.25);
				});

			// ** handle mouse events on paths
			d3.selectAll('path')
			.style('opacity', 0.25)
			.on('mouseover', function(e) {
				d3.select(this)
					.style('stroke-width', '8px')
					.style('opacity', 1)
					.attr('z-index', '1');
			}).on('mouseleave', function(e) {
			  d3.select(this)
				.style('stroke-width', '2px')
				.style('opacity', 0.25)
				.attr('z-index', '0');
			});
	
			
			
        });
	
	// ** debugger;
	

	// ** handle mouse events on gridlines
    y.gridlineShapes.selectAll('line')
    .style('opacity', 0.25)
    .on('mouseover', function(e) {
      d3.select(this)
        .style('opacity', 1);
    }).on('mouseleave', function(e) {
      d3.select(this)
        .style('opacity', 0.25);
    });

    // ** handle mouse events on paths
    d3.selectAll('path')
    .style('opacity', 0.25)
    .on('mouseover', function(e) {
      d3.select(this)
        .style('stroke-width', '8px')
        .style('opacity', 1)
        .attr('z-index', '1');
    }).on('mouseleave', function(e) {
      d3.select(this)
        .style('stroke-width', '2px')
        .style('opacity', 0.25)
        .attr('z-index', '0');
    });
	
	
};  // ** end of my_grap_draw(data);

	

function flatten(o,i) {

// ** o = Nested Data i.e. nestchartData
// ** i = Industry Data i.e. IndustryData
 
// ** Define temp array to hold the values to be return;
	var temp = [];
	
// ** Get the list of all keys that is the Carrier names;	
	var Carrier_name = (Object.keys(o));
	
// ** Loop through each Carrier name one by one and perfom below actiions	
	Carrier_name.forEach(function(d) {
	
// ** Lets define variable to check if the Carrier missed a year by not beating Industry Average.
// ** false = Missed the year and did not beat or equal Industry average on-time arrival.
// ** true = meet or beat the Industry average on-time arrival.
	var missed = false;
	var missedcount = 0;
	var NotMissed = 0;
	var holder = new Array();
	
// ** Get the list of all the Years for the Carrier and assign to Years varibale to loop year by Year	
		Years = (Object.keys(o[d]));
		
// ** Since the Initial Graph is very loaded and busy
// ** After reviewing the data, I decided to prune the airlines 
// ** that has less than 12 Years of data.  This initial decision will
// ** remove some of the clutter from the graph by removing Carriers with less than 12 Years of data.	
		// ** get the lenght of Years Array
		NumOfYears=Years.length;	
		// ** Next Check if Lenght is geater than and or Equal to 12
		// ** if it is then proceed with iteration through years otherwise
		// ** move to the next Carrier;
		if (NumOfYears>=12){
				// ** Loop through each year to get OnTime data;
				Years.forEach(function(e) {
					
						// ** Get the industry average that we calculated in IndustryData by Year.
						var IndAvg = +(i[e]["OnTime_Iavg"]);
						// ** debugger;
						// ** alert(IndAvg);
					
						// ** Create new array for every new year to hold values to push to temp array.
						var valueToPush = new Array();
						
						// ** Assign Carrier_name to Carrier Key in ValueToPush array; 
						valueToPush["Carrier"] = d;
						
						// ** Assign Year to Year in ValueToPush array; 
						valueToPush["Year"] = +e;
						
						// ** Assign OnTime to OnTime in ValueToPush array; 
						valueToPush["OnTime"] = +(o[d][e]["OnTime"]);
						var CAvg = +(o[d][e]["OnTime"]);
						// ** Log to console to display for confirmation;
						//console.log("Carrier="+d+","+"Year="+(+e)+","+"OnTime="+o[d][e]["OnTime"]);
						
						// ** Push the values to the holder array;
						holder.push(valueToPush);
						
						if(CAvg >= IndAvg) {

							NotMissed ++;
						}  else {
							missed = true;
							missedcount ++;
							//debugger;
						} 
				
				});
				 if (missedcount <= 4){
						// ** Push the values to the temp array;
						// ** copy values
						temp.push.apply(temp, holder);
						debugger;
				} 
			}

		});
	// ** debugger and Console display, uncomment to check and verify;	
	//debugger;
	//console.log(temp[0]);
	//console.log(temp[1]);
	//console.log(temp[2]);

// ** return the temp array;
	return temp;
}