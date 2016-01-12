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
	// ** debugger;
   
   
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
	// ** debugger;
  
    // ** going to create a funtion of gaph draw.
	// ** having issues as the redraw goes back to begining and wipe out all selections.
	
	my_graph_draw(data);
	// ** debugger;
	
});

function my_graph_draw(data) {
	
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
	// ** Select by Aiport and plot top 5 airlines with best on-time arrival rate
	// ** Selecting First airline an then airport only conplicate things for user.
	// ** Hence refining based on Tom's feedback.
	
	filteredDataA = data.filter(function(d) { 
			return ((d['Airport'] === A1Value));
			});

    
	filteredDataY = filteredDataA.filter(function(d) { 
			return ((d['Year'] === Y1Value));
			});	
    // ** Lets Sort by On-Time
	// **
	
	var SortedData=filteredDataY.sort(function(a,b){
	 
		return b.OnTime-a.OnTime;
	});

	
	// ** Lets get the top 20 On-Time Airlines for the selection
	
	filteredData=SortedData.slice(0,200);
	

	// ** filteredData.forEach(function(d) {
	// ** display each row of data
	// ** 		console.log(d);
    // ** 		}); 
	// ** Remove comments to enable debugger				
	// ** debugger;
  
	// ** set svg

	// ** var svg = dimple.newSvg('#content',"100%", 400)
	var svg = dimple.newSvg('#content',"50%", 400)
	

	// ** Remove comments to enable debugger	
	// ** ////////////////////////
	debugger;
	// ** /////////////////////////
	
	var myChart = new dimple.chart(svg, filteredData);

	
	//**
	myChart.setBounds(90, 70, 460, "70%");  
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
	var p = myChart.addSeries(['Month','Airport','Carrier Name'], dimple.plot.line);
	
	var legend = myChart.addLegend(600, 75, 0, 350, 'left');
	
	legend.series = [s];

  
	// ** draw

	// ** Remove comments to enable debugger	
	debugger;
	// ** ///////////////////////////////////////////
	myChart.draw();

	// **
	// ** Second graph here to show peformance by month and by category.
	// ** 
	// ** Credits to : http://dimplejs.org/advanced_examples_viewer.html?id=advanced_trellis_bar
	// ** Thanks for the inspiration and using the above example for my graph
	// ** 
	// **
	var svg2 = dimple.newSvg("#chartContainer", 590, 400);
	      // Set the bounds for the charts
    var row = 0,
        col = 0,
        top = 25,
		//top = 75,
        left = 60,
		//left = 760,
        inMarg = 15,
        width = 115,
        height = 90,
        totalWidth = parseFloat(svg2.attr("width"));
	// debugger;	
	
	  
	var unsortedmonths = dimple.getUniqueValues(filteredDataY, "Month");
	// ** var months = dimple.getUniqueValues(filteredDataY, "Month");
	
	// ** debugger;

	
	var months=unsortedmonths.sort(function(a,b){
		return a-b;
		//return (+b.Month) - (+a.Month);
	    });
	
    // Pick the latest 12 dates
	debugger;
    // ** months = months.slice(months.length - 12);
	// ** debugger;
	// ** Here lets get how many rows will be 
	// ** so we can draw the x axis text on the last row.
	var Trowcount = months.length/4;;   // ** these are trelis row count i.e. how many for graphs
	var rcount = 0.0;
    // ** Draw a chart for each of the 12 dates
    months.forEach(function (month) {
          
          // Wrap to the row above
          if (left + ((col + 1) * (width + inMarg)) > totalWidth) {
            row += 1;
            col = 0;
          }
        rcount=row + 1;  
        // ** Filter for the month in the iteration
		var chartData = dimple.filterData(filteredDataY, "Month", month);
		// ** debugger;
		// ** Use d3 to draw a text label for the month
		svg2
			.append("text")
			.attr("x", left + (col * (width + inMarg)) + (width / 2))
			.attr("y", (top-20) + (row * (height + inMarg)) + (height / 2) + 12)
			.style("font-family", "sans-serif")
			.style("text-anchor", "middle")
			.style("font-size", "28px")
			.style("opacity", 0.2)
			.text(chartData[0].Month); 
			  
		  


		var Carrier_avg = d3.mean(chartData, function(d) { return d.Carrier; });	
		var Security_avg = d3.mean(chartData, function(d) { return d.Security; });	
		var Weather_avg = d3.mean(chartData, function(d) { return d.Weather; });
		var OnTime_avg = d3.mean(chartData, function(d) { return d.OnTime; });	
		// ** debug point
		// ** debugger;
		

		  
		var perfdata = [
			{"Category":"Carrier", "Performance":Carrier_avg},
			{"Category":"Security", "Performance":Security_avg},
			{"Category":"Weather", "Performance":Weather_avg},
			{"Category":"OnTime", "Performance":OnTime_avg}
			]; 		  

		// ** Create a chart at the correct point in the trellis
 
		// ** debug point 
		// ** debugger;
		var myChartTRS = new dimple.chart(svg2, perfdata);

		  
		myChartTRS.setBounds(
				left + (col * (width + inMarg)),
				top + (row * (height + inMarg)),
				width,
				height);
          

		
		var x = myChartTRS.addCategoryAxis("x", 'Category');
		// ** Debug point
		// ** debugger;
			var minY = 0.5,
				maxY = 1;

		var y = myChartTRS.addMeasureAxis('y', 'Performance');
				y.tickFormat = '%';
				y.overrideMin = minY;
				y.overrideMax = maxY;

        // ** Draw the bars.  Passing null here would draw all bars with
        // ** the same color.  Passing owner second colors by owner, which
        // ** is normally bad practice in a bar chart but works in a trellis.
        // ** Month is only passed here so that it shows in the tooltip.

		myChartTRS.addSeries(['Performance', 'Category'], dimple.plot.bar);
			
		// ** Debug point	
		// ** debugger;	
        // ** Draw the chart
        myChartTRS.draw();

        // ** Once drawn we can access the shapes
        // ** If this is not in the first column remove the y text
        if (col > 0) {
				y.shapes.selectAll("text").remove();
			}
         // ** If this is not in the last row remove the x text
        // ** if (row < 2) {
        if (rcount < Trowcount) {			
				x.shapes.selectAll("text").remove();
			}
        // ** Remove the axis labels
        y.titleShape.remove();
        x.titleShape.remove();

        // ** Move to the next column
        col += 1;

    // ** }, this);
    });	



	
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
				
				var SortedData=filteredDataY.sort(function(a,b){
	 
						return b.OnTime-a.OnTime;
					});
						
				// ** Lets get the top 20 On-Time Airlines for the selection
	
				filteredData=SortedData.slice(0,200);
				debugger;
			
				
			myChart.data = filteredData;
		
			myChart.draw(1000);
			// ** my_graph_draw(filteredData);
			// ** Refresh second graph too.
			// ** myChartTRS.data = filteredDataY;
			debugger;
			
			// ** Let us svg2 clearing and redrawing.
			// ** 
			// ** 
			// ** svg2.remove();
			// d3.select("svg2").remove();		// ** this is OK but did not work properly, hence used second option.
			d3.select("#chartContainer").select("svg").remove(); // **  but I like this one.
			// ** d3.select("#chartContainer").add();		// ** very dangerous, not going to use it
			// ** myChartTRS.draw(1000);
			my_TRS_graph(filteredDataY);
	
	
	});
	
	d3.select("#top5").on("click", function() {

			var filteredData1 = Return_Data_By_Selection(data,"top5"); 
			// ** Lets Sort by On-Time
	        // **

			// ** New try to nested for groupings
			/*
			var nested_data = d3.nest()
					.key(function(d) { return d.Month; })
					.key(function(d) { return d.OnTime >= 0.85; })
					.entries(filteredData1);
			*/
			// ** 
			// ** var SortedData=nested_data.sort(function(a,b){
			var SortedData=filteredData1.sort(function(a,b){
	 
					return b.OnTime-a.OnTime;
				});
	
			// ** Lets get the top 10 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,50);
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

			
			var SortedData=filteredData1.sort(function(a,b){
	 
					return b.Weather-a.Weather;
				});
				
			// ** Lets get the top 10 weather delayed Airlines for the selection
	
			filteredData=SortedData.slice(0,10);	
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
			
			var SortedData=filteredData1.sort(function(a,b){
	 
					return b.Security-a.Security;
				});

	
			// ** Lets get the top 10 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,10);			
			
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
			var SortedData=filteredData1.sort(function(a,b){
	 
					return b.Carrier-a.Carrier;
				});			

	
			// ** Lets get the top 10 On-Time Airlines for the selection
	
			filteredData=SortedData.slice(0,10);
			
			myChart.data = filteredData;
			debugger;
		
			myChart.draw(1000);
	
	
	});
	
};  // ** end of my_grap_draw(data);

	

// ** Function for Trelis Graph

function my_TRS_graph(filteredDataY) {
	
    // ** //////////////////////////////////////////////////
	// ** Here we already getting filtered data by Airport and Year.
	// ** We will use dimple filter to filter by Month.
	// **
	// ** 
	// ** /////////////////////////////////////////////////
	// ** 
	// ** Credits to : http://dimplejs.org/advanced_examples_viewer.html?id=advanced_trellis_bar
	// ** Thanks for the inspiration and using the above example for my graph
	// ** 
	// **
	// ** Let us svg2 clearing and redrawing.
	// ** 
	// ** 
	// ** svg2.remove();  // ** redid it above since here it is undefined.
	
	debugger;
	// ** Second graph here to show peformance by month and by category.
	// ** 
	
	var svg2 = dimple.newSvg("#chartContainer", 590, 400);
	      // Set the bounds for the charts
    var row = 0,
        col = 0,
        top = 25,
		//top = 331,
        left = 60,
		//left = 720,
        inMarg = 15,
        width = 115,
        height = 90,
        totalWidth = parseFloat(svg2.attr("width"));
	// ** debugger;	

	  
	var unsortedmonths = dimple.getUniqueValues(filteredDataY, "Month");
	
	var months=unsortedmonths.sort(function(a,b){
	 
		return a-b;
	    });

    // Pick the latest 12 dates
	// ** debugger;
	// ** Here lets get how many rows will be 
	// ** so we can draw the x axis text on the last row.
	var Trowcount = months.length/4;;   // ** these are trelis row count i.e. how many for graphs
	var rcount = 0.0;	
    //months = months.slice(months.length - 12);
	//debugger;
    // Draw a chart for each of the 12 dates
    months.forEach(function (month) {
          
          // Wrap to the row above
          if (left + ((col + 1) * (width + inMarg)) > totalWidth) {
            row += 1;
            col = 0;
          }
        rcount=row + 1;            
          // Filter for the month in the iteration
		var chartData = dimple.filterData(filteredDataY, "Month", month);
		// ** debugger;
		// ** Use d3 to draw a text label for the month
		svg2
			.append("text")
			.attr("x", left + (col * (width + inMarg)) + (width / 2))
			.attr("y", (top-20) + (row * (height + inMarg)) + (height / 2) + 12)
			.style("font-family", "sans-serif")
			.style("text-anchor", "middle")
			.style("font-size", "28px")
			.style("opacity", 0.2)
			.text(chartData[0].Month);
			  
		  


		var Carrier_avg = d3.mean(chartData, function(d) { return d.Carrier; });	
		var Security_avg = d3.mean(chartData, function(d) { return d.Security; });	
		var Weather_avg = d3.mean(chartData, function(d) { return d.Weather; });
		var OnTime_avg = d3.mean(chartData, function(d) { return d.OnTime; });	
		// ** debug point
		// ** debugger;
		

		  
		var perfdata = [
			{"Category":"Carrier", "Performance":Carrier_avg},
			{"Category":"Security", "Performance":Security_avg},
			{"Category":"Weather", "Performance":Weather_avg},
			{"Category":"OnTime", "Performance":OnTime_avg}
			]; 		  

		// ** Create a chart at the correct point in the trellis
 
		// ** debug point 
		// ** debugger;
		var myChartTRS = new dimple.chart(svg2, perfdata);

		  
		myChartTRS.setBounds(
				left + (col * (width + inMarg)),
				top + (row * (height + inMarg)),
				width,
				height);
          

		
		var x = myChartTRS.addCategoryAxis("x", 'Category');
		// ** Debug point
		// ** debugger;
			var minY = 0.5,
				maxY = 1;

			var y = myChartTRS.addMeasureAxis('y', 'Performance');
				y.tickFormat = '%';
				y.overrideMin = minY;
				y.overrideMax = maxY;

        // ** Draw the bars.  Passing null here would draw all bars with
        // ** the same color.  Passing owner second colors by owner, which
        // ** is normally bad practice in a bar chart but works in a trellis.
        // ** Month is only passed here so that it shows in the tooltip.

		myChartTRS.addSeries(['Performance', 'Category'], dimple.plot.bar);
			
		// ** Debug point	
		// ** debugger;	
        // ** Draw the chart
        myChartTRS.draw();

        // ** Once drawn we can access the shapes
        // ** If this is not in the first column remove the y text
        if (col > 0) {
				y.shapes.selectAll("text").remove();
			}
         // ** If this is not in the last row remove the x text
        // ** if (row < 2) {
        if (rcount < Trowcount) {			
				x.shapes.selectAll("text").remove();
			}
        // ** Remove the axis labels
        y.titleShape.remove();
        x.titleShape.remove();

        // ** Move to the next column
        col += 1;

    }, this);
    // ** });	
	// ** return svg2;
} // ** end of my_TRS_graph(data)

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

		
		// ** stop and debug
		// ** Remove comments to enable debugger
	debugger;
				
	return filteredData;
	
};  // ** end of Return_Data_By_Selection(data,varName);
