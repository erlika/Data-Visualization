d3.csv("data/473753677_82015_1729_airline_delay_causes.csv", function(d) {	
  return {
    'Year': +d.year,
	'Month': +d.month,
    'Carrier Name': d.carrier_name,
	'Airport': d.airport,
	'delay': +d.arr_delay,
    'On Time': +(1.00-(d.arr_del15/d.arr_flights)),
    'Arrivals': +d.arr_flights
  }; 
}, function(data) {
	'use strict';

	// ** Remove comments to enable debugger 
	// ** debugger;	
  
	// ** Get dropdown element from DOM

	var Ydropdown = document.getElementById("selectYear");

	// ** Loop through the array
	var YearArray = d3.set();
	data.forEach(function(d) {
				// ** Append the element to the end of Array list
				if(YearArray.has(d['Year']) === false) {
					var Yel = document.createElement("option");
					Yel.textContent = d['Year'];
					Yel.value = d['Year'];
					Ydropdown.appendChild(Yel);
					YearArray.add(d['Year']);
					};
                }); 
   
 
	// ** Remove comments to enable debugger
	// ** debugger;

	// ** Get dropdown element from DOM


	var select = document.getElementById("selectCarrier");

	var CarrierArray = d3.set();
	
	data.forEach(function(d) {
                    // ** CarrierArray.add(d['Carrier Name']);
                    if(CarrierArray.has(d['Carrier Name']) === false) {
						var el = document.createElement("option");
						el.textContent = d['Carrier Name'];
						el.value = d['Carrier Name'];
						select.appendChild(el);
						CarrierArray.add(d['Carrier Name']);
					};
                });
				




	// ** Get dropdown element from DOM

	var Airdropdown = document.getElementById("Airport");

	// ** Loop through the array
	var AirportArray = d3.set();
	data.forEach(function(d) {
				// ** Append the element to the end of Array list
				if(AirportArray.has(d['Airport']) === false) {
					var Airel = document.createElement("option");
					Airel.textContent = d['Airport'];
					Airel.value = d['Airport'];
					Airdropdown.appendChild(Airel);
					AirportArray.add(d['Airport']);
					};
                }); 
   


   
	// ** Get dropdown element from DOM

	var PFdropdown = document.getElementById("PeriodFrom");

	// ** Loop through the array
	var PFArray = d3.set();
	data.forEach(function(d) {
				// ** Append the element to the end of Array list
				if(PFArray.has(d['Month']) === false) {
					var PFel = document.createElement("option");
					PFel.textContent = d['Month'];
					PFel.value = d['Month'];
					PFdropdown.appendChild(PFel);
					PFArray.add(d['Month']);
					};
                }); 
   
 
	// ** Lets sort the list

	var selectList = $('#PeriodFrom option');

	selectList.sort(function(a,b){
		a = a.value;
		b = b.value;
 
		return b-a;
	});

	$('#PeriodFrom').html(selectList);

	// ** Remove comments to enable debugger
	//	** debugger;
   
   
	// ** Get dropdown element from DOM

	var PTdropdown = document.getElementById("PeriodTo");

	// ** Loop through the array
	var PTArray = d3.set();
	data.forEach(function(d) {
				// ** Append the element to the end of Array list
				if(PTArray.has(d['Month']) === false) {
					var PTel = document.createElement("option");
					PTel.textContent = d['Month'];
					PTel.value = d['Month'];
					PTdropdown.appendChild(PTel);
					PTArray.add(d['Month']);
					};
                }); 
   
 
	// ** Lets sort the list

	var selectList = $('#PeriodTo option');

	selectList.sort(function(a,b){
		a = a.value;
		b = b.value;
 
		return a-b;
	});

	$('#PeriodTo').html(selectList);


	// ** Remove comments to enable debugger   
	// **  debugger;
  
    // ** //////////////////////////////////////////////////
	// ** Let us a filter the huge file by the selections.
	// **
	// **
	// ** First lets read all values in selection boxes
	// ** /////////////////////////////////////////////////
	var filteredData = [];
	var filteredDataC = [];
	var filteredDataA = [];
	var Y1 = document.getElementById("selectYear");
	var Y1Value = Number(Y1.options[Y1.selectedIndex].text);
	var C1 = document.getElementById("selectCarrier");
	var C1Value = C1.options[C1.selectedIndex].text;
	var A1 = document.getElementById("Airport");
	var A1Value = A1.options[A1.selectedIndex].text;
	var PF1 = document.getElementById("PeriodFrom");
	var PF1Value = Number(PF1.options[PF1.selectedIndex].text);
	var PT1 = document.getElementById("PeriodTo");
	var PT1Value = Number(PT1.options[PT1.selectedIndex].text);
	console.log(Y1Value,C1Value,A1Value,PF1Value,PT1Value);
	filteredDataC = data.filter(function(d) { 
			return ((d['Carrier Name'] === C1Value));
			});
    filteredDataA = filteredDataC.filter(function(d) { 
			return ((d['Airport'] === A1Value));
			});
	filteredData = filteredDataA.filter(function(d) { 
			return ((d['Year'] === Y1Value));
			});	

	// ** Remove comments to enable debug			
	// ** Debugging for values			
	// ** console.log(filteredDataC[0],filteredDataA[0],filteredData[0]);
	filteredData.forEach(function(d) {
		// ** display each row of data
				console.log(d);
                }); 
	// ** Remove comments to enable debugger				
	// ** debugger;
  
	// ** set svg
	var margin = {top: 20, right: 10, bottom: 20, left: 10};
	var width = 960 - margin.left - margin.right,
		height = 640 - margin.top - margin.bottom;
	// ** var width = 1500,
	// **	height = 640;
	// ** var svg = dimple.newSvg('#content', width + margin.left + margin.right, height + margin.top + margin.bottom);
	var svg = dimple.newSvg('#content',"100%", 400)
	/*
	var svg = d3.select("content").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	*/
	// ** Remove comments to enable debugger	
	// ** ////////////////////////
	// ** debugger;
	// ** /////////////////////////
	
	var myChart = new dimple.chart(svg, filteredData);

	// ** set y axis
	var minY = 0.5,
		maxY = 1;
	var y = myChart.addMeasureAxis('y', 'On Time');
	y.tickFormat = '%';
	y.overrideMin = minY;
	y.overrideMax = maxY;
	y.title = '%age of Arrival on-Time';

	// ** set x axis
	var minX = 1,
		maxX = 12;
	var x = myChart.addMeasureAxis('x','Month','%b');
	//x.ticks = 12;
	x.tickFormat = ',d';
	x.overrideMin = minX;
	x.overrideMax = maxX;  
	x.title = 'Month';  
  
	// ** set series and legend

	var s = myChart.addSeries(['Month','Airport','Carrier Name'], dimple.plot.scatter);
	var p = myChart.addSeries('Month', dimple.plot.line);

	var legend = myChart.addLegend(width*0.95, 30, width*0.25, 30, 'right');
	legend.series = [s];

  
	// ** draw

	// ** Remove comments to enable debugger	
	// ** debugger;
	// ** ///////////////////////////////////////////
	myChart.draw();

	// ** Remove comments to enable debugger
	// ** debugger;
	// ** /////////////////////////////////////////////////////
	
	// ** This is where if the button is clicked, We need to get new selection
	// ** Filter the data based on selection, either draw chart or raise alert if no 
	// ** filtered values found asking user to make new selection.
	d3.select("#submit").on("click", function() {

				var Y1 = document.getElementById("selectYear");
				var Y1Value = Number(Y1.options[Y1.selectedIndex].text);
				var C1 = document.getElementById("selectCarrier");
				var C1Value = C1.options[C1.selectedIndex].text;
				var A1 = document.getElementById("Airport");
				var A1Value = A1.options[A1.selectedIndex].text;
				var PF1 = document.getElementById("PeriodFrom");
				var PF1Value = Number(PF1.options[PF1.selectedIndex].text);
				var PT1 = document.getElementById("PeriodTo");
				var PT1Value = Number(PT1.options[PT1.selectedIndex].text);
				// ** debug values
				console.log(Y1Value,C1Value,A1Value,PF1Value,PT1Value);
				// ** stop and debug
				// ** Remove comments to enable debugger
				// ** debugger;
				
				// ** filter Data
				filteredDataC = data.filter(function(d) { 
						return ((d['Carrier Name'] === C1Value));
				});
				filteredDataA = filteredDataC.filter(function(d) { 
						return ((d['Airport'] === A1Value));
				});
				filteredData = filteredDataA.filter(function(d) { 
						return ((d['Year'] === Y1Value));
				});	
			
			myChart.data = filteredData;
		
			myChart.draw(1000);
	});
});


