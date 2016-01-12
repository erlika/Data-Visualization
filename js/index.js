d3.csv("data/473753677_82015_1729_airline_delay_causes.csv", function(d) {	
  return {
    'Year': +d.year,								// ** Year converted into integer
	'Month': +d.month,								// ** Month converted into integer
    'CarrierName': d.carrier_name,					// ** airline name
	'Airport': d.airport,							// ** airport name
	'delay': +d.arr_delay,							// ** arrival delay converted into integer.
    'OnTime': +(1.00-(d.arr_del15/d.arr_flights)),  // ** calculating On-Time arival rate i.e. delayed/total 
	'Carrier': +(1.00-(d.carrier_ct/d.arr_del15)),  // ** Calculating Carrier delays.
	'Weather': +(1.00-(d.nas_ct/d.arr_del15)),		// ** Calculating Weather delays.
	'Security': +(1.00-(d.security_ct/d.arr_del15)), // **  Calculating Security delays.
    'Arrivals': +d.arr_flights
  }; 
}, function(data) {
	'use strict';

	// ** My main graph function	
	my_graph_draw(data);							// ** out main draw function where all the magic happens.
	
	
});

function my_graph_draw(data) {						// ** start of the my_draw_graph

// ** nestchartData : provides On-Time average by year for each airline.	
// ** nestchartData will hold the data sorted first by carrier name, then by year and average On-time for that year  
// ** CarrierName = Airline name, we are using this as first key to nest data by.
// ** Year will hold the year of the data and it is the second key.
// ** next using rollup and d3.mean() we are calculating the average On-Time for Carrier by Year.
// ** Data will be as follow:
// ** {key:"CarrierName1",{key:year, value:OnTime}}
// ** {key:"CarrierName1",{key:year, value:OnTime}}

	var nestchartData = d3.nest()

		.key(function(d) { return d.CarrierName; }) 				// ** First Key = CarrierName
		.key(function(d) { return d.Year; })						// ** Second Key = Year
		.rollup(function(v) { return {								// ** rollup for average
			OnTime: d3.mean(v, function(d) { return d.OnTime; }) 	// ** d3.mean to caluclate the average

			}; })
		.map(data);

		
// ** IndustryData : calculate and provide Industry average for On-Time per Year.
// ** IndustryData will hold the data sorted by year and average On-time for that year for all airlines included.  
// ** Year will hold the year of the data and it is the second key.
// ** next using rollup and d3.mean() we are calculating the average On-Time for the Year.
// ** Data will be as follow:
// ** {key:2003, value:0.867574}
// ** {key:2004, value:0.776554}
		
	var IndustryData = d3.nest()

		.key(function(k) { return k.Year; })							// ** First Key = Year
		.rollup(function(v) { return {									// ** rollup for average
			OnTime_Iavg: d3.mean(v, function(d) { return d.OnTime; })	// ** d3.mean to caluclate the average 

			}; })
		.map(data);
	
	

	
// ** Calling function flatten to massage the data into shape to be used with dimple for our graphs.
// ** flatten : two paramaters (nestchartData=airline average,IndustryData = industry average)
	
    chartData = flatten(nestchartData,IndustryData); 
	

	
	// ** svg element based on the passed selector and returns the underlying svg element
    var svg = dimple.newSvg('#graph1',1400, 400)

	//** Initialise the chart with chartData and an svg in which to render
	var myChart = new dimple.chart(svg, chartData);

	
	// ** Set Chart boundaries
	myChart.setBounds(90, 50, 1100, "77%");  
	
	// var ontime_extent = (d3.extent(chartData, function(d) { return d.OnTime; }));
	//var ontime_scale = d3.scale.linear()
		
// ** set y axis
	// ** Pointed out by Coach this my lead to lie factor.
	//var minY = 0.5, 
	var minY = 0.0, 
	// ** I am setting maxY to 100%, perfect arrival rate.
		maxY = 1;
	// ** Plot OnTime on Y-Axis.	
	var y = myChart.addMeasureAxis('y', 'OnTime');
	y.tickFormat = '%';		// ** % is the tick fomat for Y-Axis, we want to shows as 50%, 60% etc.
	y.overrideMin = minY;
	y.overrideMax = maxY;
	// y.overrideMin = (d3.min(chartData, function(d) { return d.OnTime; }));
	// y.overrideMax = (d3.max(chartData, function(d) { return d.OnTime; }));

	y.title = '%age of Arrival on-Time';

// ** set x axis
	var minX = 2003,		// ** setting minX from Year 2003 start of our data
		maxX = 2015;		// ** setting max to 2015 as the last year of the data available.
		
	// ** Add an x axis for Years	
	var x = myChart.addMeasureAxis('x','Year','%b');
	x.tickFormat = 'd';     // ** Tick for X-axis is d, since we like to display as 2033, 2004 etc.
	x.overrideMin = minX;
	x.overrideMax = maxX;  
	x.title = 'Years'; 		// ** X-axis title


  
  
// ** set series and legend

	// ** First add scatter plot series, to show data points.
	var s = myChart.addSeries(['Year','Carrier'], dimple.plot.scatter);
	// ** Second add line plot series to show the trend.
	var p = myChart.addSeries(['Year','Carrier'], dimple.plot.line);
	// ** Add legend
	var legend = myChart.addLegend(1230, 75, 0, 350, 'left');
	// ** picking on Carrier name as legend
	legend.series = [s];

    
	// ** draw the chart

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
			d3.select("#Industry_Average_On-Time")
				.attr("class", "line")
				.style("stroke-dasharray", ("3, 3"))
				.style("opacity", 0.8)
				.style("stroke-width", '8px');  // <== This line here!!
			
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
		
	d3.select("#Industry_Average_On-Time")
		.attr("class", "line")
		.style("stroke-dasharray", ("3, 3"))
		.style("opacity", 0.8)
		//.fill("lightsteelblue")
		.style("stroke-width", '8px');  // <== This line here!!
	
	
	
	
	
    // ** had to add it here as well
	// ** reason was mouse events were not working once you have clicked the legen.
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

	

// ** Calling function flatten to massage the data into shape to be used with dimple for our graphs.
// ** flatten : two paramaters (o=airline average,i = industry average)
// **  Here I filter data as follow:
// ** Check if the data for airline is less than 12 years, if it is ignore as I am working on carriers with atleast 12 years of data
// ** Second, I compare the carrier performance with average performance.
// ** Then I save the data into array to return.
	
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
// ** how many years missed by airline not beating or equaling indistry average	
	var missedcount = 0;
// ** how many years not missed.	
	var NotMissed = 0;
// ** array to hold the values before we decide if threshold is met to copy to retuned array "temp"	
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
						
						// ** Assign IndAvg to "Industry Average" in ValueToPush array; 
						// ** valueToPush["Industry Average"] = IndAvg;
						
						// ** Push the values to the holder array;
						holder.push(valueToPush);
						
						if(CAvg >= IndAvg) {  // ** this is critcal because we check here if the carrier beat or meet the industry 
											  // ** On-Time average, if yes, increment NotMissed, if No, set missed = true and
											  // ** increament missedcount, which will be used in the threshold.
							NotMissed ++;
						}  else {
							missed = true;
							missedcount ++;
							
						} 
				
				});
// **  this is crucial check:
// **  First, I decided to plot all carriers that did not miss a single year beating or meeting industry average and unfortunately no carriers made the cut.
// **  Then decided to plot all carriers that only missed 1 year in beating or meeting industry average and only 1 carrier made the cut i.e. "Skywest Airlines".  
// **  I don't think this is justice to other Airlines that performed as well and missed more than 1 year beating or meeting the average.
// **  Third, to best illustrate the top punctual airlines, I decided to adjust my decision criteriea to call airlines punctual 
// **  that have not missed beating or meeting the industry average more than 4 years.  
// **  I personally think 4 years flexibility gives anough leeway to Carriers to be included that had temporary set backs and kept improving the punctuality. 
 				
				 if (missedcount <= 4){
						// ** Push the values to the temp array;
						// ** copy values
						temp.push.apply(temp, holder);
						
				} 
			}

		});
		

	// ** Create new array for every new year to hold Industry values to push to temp array.
	var INDArray = new Array();
	// ** Lets Add the Indistru Average to the temp array so we have it available to draw the average line
	var INDYears = (Object.keys(i));
	INDYears.forEach(function(e) {
						// ** Create new array for every new year to hold values to push to temp array.
						var INDToPush = new Array();
						
						// ** Get the industry average that we calculated in IndustryData by Year.
						var IndAvg = +(i[e]["OnTime_Iavg"]);
						
						// ** Assign Industry Average to Carrier Key in INDToPush array; 
						INDToPush["Carrier"] = "Industry_Average_On-Time";
						
						// ** Assign Year to Year in INDToPush array; 
						INDToPush["Year"] = +e;
						
						// ** Assign Average to OnTime in INDToPush array; 
						INDToPush["OnTime"] = IndAvg;
						
						INDArray.push(INDToPush);
				});
				
	// ** Push the values to the temp array;
	// ** copy values
	temp.push.apply(temp,INDArray);	


	
// ** return the temp array;
	return temp;
}