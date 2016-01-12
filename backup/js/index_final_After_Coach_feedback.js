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
	debugger;
  
	
	my_graph_draw(data);
	// ** debugger;
	
});

function my_graph_draw(data) {
	
	var filteredData = [];
	var filteredDataC = [];
	var filteredDataA = [];
	var filteredDataY = [];
/*	
	var unsortedyears = dimple.getUniqueValues(data, "Year");
	var Unique_cariers = dimple.getUniqueValues(data, "CarrierName");
	debugger;

	
//	var years=unsortedyears.sort(function(a,b){
//		return a-b;
//
//	    });
		

	// ** Remove comments to enable debugger				
	// ** debugger;
  
	filteredDataC = dimple.filterData(data, "CarrierName", Unique_careers);
	
    // ** Draw a chart for each of the 12 dates
    Unique_cariers.forEach(function (cariers) {
          
		filteredDataC = dimple.filterData(data, "CarrierName", Unique_careers);
		
				unsortedyears.forEach(function (years) {
						// ** Filter for the Carrier in the iteration
						var chartData = dimple.filterData(filteredDataC, "Year", years);
						var Carrier_avg = d3.mean(chartData, function(d) { return d.Carrier; });	
						var Security_avg = d3.mean(chartData, function(d) { return d.Security; });	
						var Weather_avg = d3.mean(chartData, function(d) { return d.Weather; });
						var OnTime_avg = d3.mean(chartData, function(d) { return d.OnTime; });	
						// ** debug point
						// ** debugger;
		
				});
		  
		var perfdata = [
			{"Category":"Carrier", "Performance":Carrier_avg},
			{"Category":"Security", "Performance":Security_avg},
			{"Category":"Weather", "Performance":Weather_avg},
			{"Category":"OnTime", "Performance":OnTime_avg}
			]; 		  

	});
*/

//	var CarriersTotalByYear = d3.nest()
	var nestchartData = d3.nest()
//		.key(function(d) { return { 
//			CarrierName: d.CarrierName}; })
//		.key(function(d) { return { 
//			Year: d.Year}; })
		.key(function(d) { return d.CarrierName; })
		.key(function(d) { return d.Year; })
		.rollup(function(v) { return {
			OnTime: d3.mean(v, function(d) { return d.OnTime; }) //,
//			Carrier: d3.mean(v, function(d) { return d.Carrier; }),
//			Security: d3.mean(v, function(d) { return d.Security; }),
//			Weather: d3.mean(v, function(d) { return d.Weather; })
			}; })
//		.rollup(function(v) { return {
//			Carrier: d3.mean(v, function(d) { return d.Carrier; }) }; })
//		.rollup(function(v) { return d3.mean(v, function(d) { return d.Security; }); })
//		.rollup(function(v) { return d3.mean(v, function(d) { return d.Weather; }); })
		.map(data);
//		.entries(data)
	
/*	nestchartData.forEach(function(d) {
		d.Carrier = d.key;
		d.values = d.values;

		});
	debugger;

*/
	
/*****	
	chartData = _.chain(nestchartData)
		.map(function(row, index){
		// for each Year, return a new row
			return _.map(row.key, function(key){
				return {
					//'Carrier' : row.Carrier,
					'Year' : key,
					'OnTime' : Year.OnTime,
					'Carrier' : Year.Carrier,
					'Security' : Year.Security,
					'Weather' : Year.Weather
				};
			});
		})
		.flatten()
		.value();
***/


	debugger;	


    chartData = flatten(nestchartData); 
	
	debugger;
	alert(chartData[0]);
	console.log(chartData);
    console.log(chartData[0]);
    console.log(chartData[1]);
    console.log(chartData[2]);

//	alert(chartData.Carrier);
	
//	alert(chartData[0].Carrier);
//	chartData[2];
	debugger;
	
	var svg = dimple.newSvg('#graph1',800, 400)

	// ** Remove comments to enable debugger	
	// ** ////////////////////////
	debugger;
	// ** /////////////////////////

	var filteredDataY = dimple.filterData(data, "Year");
	// var myChart = new dimple.chart(svg, chartData);
	
	debugger;
	var myChart = new dimple.chart(svg, chartData);

	

	myChart.setBounds(90, 50, 550, "77%");  	
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
	//x.ticks = 12;
	x.tickFormat = 'd';
	x.overrideMin = minX;
	x.overrideMax = maxX;  
	x.title = 'Years'; 


  
  
	// ** set series and legend

	var s = myChart.addSeries(['Year','Carrier'], dimple.plot.scatter);
	var p = myChart.addSeries(['Year','Carrier'], dimple.plot.line);
	
	var legend = myChart.addLegend(660, 75, 0, 350, 'left');
	
	legend.series = [s];

  
	// ** draw

	// ** Remove comments to enable debugger	
	debugger;
	// ** ///////////////////////////////////////////
	myChart.draw();

	// handle mouse events on gridlines
    y.gridlineShapes.selectAll('line')
    .style('opacity', 0.25)
    .on('mouseover', function(e) {
      d3.select(this)
        .style('opacity', 1);
    }).on('mouseleave', function(e) {
      d3.select(this)
        .style('opacity', 0.25);
    });

    // handle mouse events on paths
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

	

function flatten(o) {

	var temp = [];
	var Carrier_name = (Object.keys(o));
	Carrier_name.forEach(function(d) {

		Years = (Object.keys(o[d]));
		Years.forEach(function(e) {
				var valueToPush = new Array();
				valueToPush["Carrier"]=d;
				valueToPush["Year"]=+e;
				//console.log("Carrier="+d+","+"Year="+(+e)+","+"OnTime="+o[d][e]["OnTime"]);
				valueToPush["OnTime"]=+(o[d][e]["OnTime"]);
				temp.push(valueToPush);
				
			});


		});
	// debugger;

	//console.log(temp[0]);
	//console.log(temp[1]);
	//console.log(temp[2]);

	return temp;
}