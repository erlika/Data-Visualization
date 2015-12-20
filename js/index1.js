d3.csv("data/473753677_82015_1729_airline_delay_causes.csv", function(d) {	
  return {
    'Year': +d.year,
	'Month': +d.month,
    'Carrier Name': d.carrier_name,
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

	// ** Sort function
	// ** Credit of this function is to: https://github.com/Teun/thenBy.js
	// ** thenBy is a javascript micro library that helps sorting arrays on multiple keys.
	// ** for more details, please check the above github url by Tuen.  All credits to Tuen for this function.
	
	var firstBy=function(){function n(n,t){if("function"!=typeof n){var r=n;n=function(n,t){return n[r]<t[r]?-1:n[r]>t[r]?1:0}}return-1===t?function(t,r){return-n(t,r)}:n}function t(t,u){return t=n(t,u),t.thenBy=r,t}function r(r,u){var f=this;return r=n(r,u),t(function(n,t){return f(n,t)||r(n,t)})}return t}(); 
  

	// ** Remove comments to enable debugger 
	// ** debugger;	
    // ** 
	
	// ** if(document.getElementById('button').clicked == true)
	// **	{
	// **		alert("button was clicked");
	// **	}
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
	debugger;
   
   
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
	debugger;
  
    // ** going to create a funtion of gaph draw.
	// ** having issues as the redraw goes back to begining and wipe out all selections.
	
	my_grap_draw(data);
	
});

function my_grap_draw(data) {
	
    // ** //////////////////////////////////////////////////
	// ** Let us a filter the huge file by the selections.
	// **
	// **
	// ** First lets read all values in selection boxes
	// ** /////////////////////////////////////////////////

	// ** Sort function
	// ** Credit of this function is to: https://github.com/Teun/thenBy.js
	// ** thenBy is a javascript micro library that helps sorting arrays on multiple keys.
	// ** for more details, please check the above github url by Tuen.  All credits to Tuen for this function.
	
	var firstBy=function(){function n(n,t){if("function"!=typeof n){var r=n;n=function(n,t){return n[r]<t[r]?-1:n[r]>t[r]?1:0}}return-1===t?function(t,r){return-n(t,r)}:n}function t(t,u){return t=n(t,u),t.thenBy=r,t}function r(r,u){var f=this;return r=n(r,u),t(function(n,t){return f(n,t)||r(n,t)})}return t}(); 
  
  
	var filteredData = [];
	var filteredDataC = [];
	var filteredDataA = [];
	var filteredDataY = [];
	
	
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
	// ** Feedback 1: Tom Pelicano
	// ** Select Aiport and plot top 5 airlines with best on-time arrival rate
	// **
	
	filteredDataA = data.filter(function(d) { 
			return ((d['Airport'] === A1Value));
			});
			
	// ** filteredDataC = filteredDataA.filter(function(d) { 
			// ** return ((d['Carrier Name'] === C1Value));
			// ** });
    
	filteredDataY = filteredDataA.filter(function(d) { 
			return ((d['Year'] === Y1Value));
			});	
    // ** Lets Sort by On-Time
	// **
	/*
	var SortedData=filteredDataY.sort(function(a,b){
		a = a[6].value;
		b = b[6].value;
 
		return a-b;
	});
	*/
	// ** my sort function did not work. Going to borow from thenBy: https://github.com/Teun/thenBy.js
	/* Commenting my function and using Teun's thenBy.
	var SortedData=filteredDataY.sort(function(a,b){
			if(a.OnTime == b.OnTime){
			
				if(a.OnTime == b.OnTime){
					return 0;
					}
		
				return (a.OnTime < b.OnTime) ? -1 : 1;
			}
	
			return (a.OnTime < b.OnTime) ? -1 : 1;

	});
	*/
	
	// ** credits of this function to: https://github.com/Teun/thenBy.js

	var SortedData=filteredDataY.sort(
			firstBy(function (v1, v2) { return v2.OnTime - v1.OnTime; })
			// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
			// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
		);

	
	// ** Lets get the top 20 On-Time Airlines for the selection
	
	filteredData=SortedData.slice(0,20);
	
	// ** Remove comments to enable debug			
	// ** Debugging for values			
	// ** console.log(filteredDataC[0],filteredDataA[0],filteredData[0]);
	// ** filteredData.forEach(function(d) {
		// ** display each row of data
				// ** console.log(d);
                // ** }); 
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
	debugger;
	// ** /////////////////////////
	
	var myChart = new dimple.chart(svg, filteredData);

	// ** set y axis
	var minY = 0.5,
		maxY = 1;
	var y = myChart.addMeasureAxis('y', 'OnTime');
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
	// ** var p = myChart.addSeries('Month', dimple.plot.line);
	var p = myChart.addSeries(['Month','Airport','Carrier Name'], dimple.plot.line);
	
	var legend = myChart.addLegend(width*0.95, 30, width*0.25, 30, 'right');
	legend.series = [s];

  
	// ** draw

	// ** Remove comments to enable debugger	
	debugger;
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
				debugger;
				
				// ** filter Data
				
				// ** Feedback 1: Tom Pelicano
				// ** Select Aiport and plot top 5 airlines with best on-time arrival rate
				// **
	
				filteredDataA = data.filter(function(d) { 
						return ((d['Airport'] === A1Value));
					});
			
				// ** filteredDataC = filteredDataA.filter(function(d) { 
				// ** 		return ((d['Carrier Name'] === C1Value));
				// **	});
    
				filteredDataY = filteredDataA.filter(function(d) { 
						return ((d['Year'] === Y1Value));
					});	

				// ** Lets Sort by On-Time
				// **
/*	
				var SortedData=filteredDataY.sort(function(a,b){
						if(a.OnTime == b.OnTime){
			
								if(a.OnTime == b.OnTime){
										return 0;
									}
		
								return (a.OnTime < b.OnTime) ? -1 : 1;
							}
	
						return (a.OnTime < b.OnTime) ? -1 : 1;

					});
*/	
					
				// ** credits of this function to: https://github.com/Teun/thenBy.js

				var SortedData=filteredDataY.sort(
						firstBy(function (v1, v2) { return v2.OnTime - v1.OnTime; })
						// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
						// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
						);
				// ** Lets get the top 10 On-Time Airlines for the selection
	
				filteredData=SortedData.slice(0,10);
				debugger;
				
			myChart.data = filteredData;
		
			myChart.draw(1000);
	
	
	});
	
	d3.select("#top5").on("click", function() {

			var filteredData1 = Return_Data_By_Selection(data,"top5"); 
			// ** Lets Sort by On-Time
	        // **

/*			
			var SortedData=filteredDataY.sort(function(a,b){
						if(a.OnTime == b.OnTime){
			
								if(a.OnTime == b.OnTime){
										return 0;
									}
		
								return (a.OnTime < b.OnTime) ? -1 : 1;
							}
	
						return (a.OnTime < b.OnTime) ? -1 : 1;

				});

*/
	
			// ** credits of this function to: https://github.com/Teun/thenBy.js

			var SortedData=filteredData1.sort(
					firstBy(function (v1, v2) { return v2.OnTime - v1.OnTime; })
					// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
					// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
				);				
	
			// ** Lets get the top 5 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,5);
				// ** stop and debug
				// ** Remove comments to enable debugger
			debugger;
				
			myChart.data = filteredData;	
		
			
			debugger;
		
			myChart.draw(1000);
	
	
	});
	
	d3.select("#top5weather").on("click", function() {

			var filteredData1 = Return_Data_By_Selection(data,"top5weather"); 
				// ** stop and debug
				// ** Remove comments to enable debugger
			debugger;
			// ** Lets Sort by On-Time
			// **
	/*
			var SortedData=filteredData1.sort(function(a,b){
					a = a[8].value;
					b = b[8].value;
 
					return a-b;
			});
	

			var SortedData=filteredDataY.sort(function(a,b){
						if(a.Weather == b.Weather){
			
								if(a.Weather == b.Weather){
										return 0;
									}
		
								return (a.Weather < b.Weather) ? -1 : 1;
							}
	
						return (a.Weather < b.Weather) ? -1 : 1;

				});
		
*/

	
	// ** credits of this function to: https://github.com/Teun/thenBy.js

			var SortedData=filteredData1.sort(
					firstBy(function (v1, v2) { return v2.Weather - v1.Weather; })
					// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
					// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
				);	
			// ** Lets get the top 5 weather delayed Airlines for the selection
	
			filteredData=SortedData.slice(0,5);	
			myChart.data = filteredData;
			debugger;
		
			myChart.draw(1000);
	
	
	});
	
	
	d3.select("#top5security").on("click", function() {

			var filteredData1 = Return_Data_By_Selection(data,"top5security"); 
				// ** stop and debug
				// ** Remove comments to enable debugger
			debugger;
			// ** Lets Sort by On-Time
			// **
/*	
			var SortedData=filteredData1.sort(function(a,b){
						a = a[9].value;
						b = b[9].value;
 
						return a-b;
					});


			var SortedData=filteredDataY.sort(function(a,b){
						if(a.Security == b.Security){
			
								if(a.Security == b.Security){
										return 0;
									}
		
								return (a.Security < b.Security) ? -1 : 1;
							}
	
						return (a.Security < b.Security) ? -1 : 1;

				});
*/

	
			// ** credits of this function to: https://github.com/Teun/thenBy.js

			var SortedData=filteredData1.sort(
					firstBy(function (v1, v2) { return v2.Security - v1.Security; })
					// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
					// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
				);			
	
			// ** Lets get the top 5 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,5);			
			
			myChart.data = filteredData1;
			debugger;
		
			myChart.draw(1000);
	
	
	});
	
	
	d3.select("#top5carrier").on("click", function() {

			var filteredData1 = Return_Data_By_Selection(data,"top5carrier"); 
				// ** stop and debug
				// ** Remove comments to enable debugger
			debugger;
			
			// ** Lets Sort by On-Time
			// **
/*	
			var SortedData=filteredData1.sort(function(a,b){
					a = a[7].value;
					b = b[7].value;
 
					return a-b;
				});

			var SortedData=filteredDataY.sort(function(a,b){
						if(a.Carrier == b.Carrier){
			
								if(a.Carrier == b.Carrier){
										return 0;
									}
		
								return (a.Carrier < b.Carrier) ? -1 : 1;
							}
	
						return (a.Carrier < b.Carrier) ? -1 : 1;

				});
*/

			// ** credits of this function to: https://github.com/Teun/thenBy.js

			var SortedData=filteredData1.sort(
					firstBy(function (v1, v2) { return v2.Security - v1.Security; })
					// ** .thenBy(function (v1, v2) { return v1.population - v2.population; })
					// ** .thenBy(function (v1, v2) { return v1.id - v2.id; })
				);			
	
			// ** Lets get the top 5 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,5);
			
			myChart.data = filteredData;
			debugger;
		
			myChart.draw(1000);
	
	
	});
	
};  // ** end of my_grap_draw(data);


	
//** });

function Return_Data_By_Selection(data,varName) {
	
    // ** //////////////////////////////////////////////////
	// ** Let us a filter the huge file by the selections.
	// **
	// **
	// ** First lets read all values in selection boxes
	// ** /////////////////////////////////////////////////

	var filteredData = [];
	var filteredDataC = [];
	var filteredDataA = [];
	var filteredDataY = [];
	
	
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
	// ** Feedback 1: Tom Pelicano
	// ** Select Aiport and plot top 5 airlines with best on-time arrival rate
	// **
	
	filteredDataA = data.filter(function(d) { 
			return ((d['Airport'] === A1Value));
			});
			
	// ** filteredDataC = filteredDataA.filter(function(d) { 
			// ** return ((d['Carrier Name'] === C1Value));
			// ** });
    
	filteredDataY = filteredDataA.filter(function(d) { 
			return ((d['Year'] === Y1Value));
			});	


	debugger;

	switch (varName)
		{
			case "top5":
						filteredData = filteredDataY.filter(function(d) { 
								return ((d['OnTime'] >= 0.80));
							});	
						break;
			case "top5weather":
						filteredData = filteredDataY.filter(function(d) { 
								return ((d['OnTime'] >= 0.81));
								});
						break;		
			case "top5security": 
						filteredData = filteredDataY.filter(function(d) { 
								return ((d['OnTime'] >= 0.82));
								});
						break;		
			case "top5carrier": 
						filteredData = filteredDataY.filter(function(d) { 
								return ((d['OnTime'] >= 0.83));
								});
			
						break;

			default: 
					filteredData = filteredDataA.filter(function(d) { 
							return ((d['Year'] === Y1Value));
							});	
					break;
		}	

/*
	filteredData = filteredDataY.filter(function(d) { 
		 		return ((d['OnTime'] >= 0.90));
		});
*/		
		// ** stop and debug
		// ** Remove comments to enable debugger
	debugger;
				
	return filteredData;
	
};  // ** end of Return_Data_By_Selection(data,varName);
