# Data Visualization and D3.js: On-Time Arrival Stats by Airport and Year 
by Mohammad Yaqoob for Udacity's [Data Analyst Nanodegree](https://www.udacity.com/course/viewer#!/c-ud507-nd)

## Summary

This data visualization is designed to shows which airlines will have 80% or greater On-Time Arrival Rates for a selected Airport and Year.  I also wanted to communicate the story that user selected airport and year, on average how much the categories of security, carrier, and weather impact airlines performance by graphing their averages by months, allowing users to see what factors contribute the most to airpot and airline delays.  The data is downloaded from [RITA](http://www.transtats.bts.gov/OT_Delay/ot_delaycause1.asp?display=download&pn=0&month=12&year=2015)  

## Design

After downloading the data from [RITA](http://www.transtats.bts.gov/OT_Delay/ot_delaycause1.asp?display=download&pn=0&month=12&year=2015) I decided to open the csv file to look briefly into the data.  There was nothing otu of the ordinary and the data look pretty crisp and clean.  Fortunately, I didn't need to perform any data cleaning and wrangling with this data set.

### Exploratory Data Analysis 

I used d3.csv to read in the csv file for exploratory data analysis.  The initial plot did not look to deliver the relationship that I was looking for i.e. airlines on-time greater or equal to 80% and categories contributing to on-time performance for airport and airlines as shown in the following graph.

<img src="../master/img/EDA1.PNG" />


Using the provided data, it can be sliced and diced to address my question i.e. "For a given airport and year, which airlines are 80% or greater on-time and how factors like weather, security, and carrier delay impact their performance.

### Data Visualization using dimple.js

I decided to improve upon the initial data visualization further using  **D3.js** and **dimple.js** using iterative design design and analysis.

Next, I modified graphing options to plot all airlines and this was clearly very busy graph too. The scatter plot by itself did not show anything meaningful or distinguishable trends as shown below.

<img src="../master/img/EDA2.PNG" />



Next, I decided to add a line chart with multiple series that will show different trends across different airlines.  I first produced a cursory plot to explore this idea the plot shows on-time trends for the airlines with most airlines on-time rate greater than 50%:

<img src="../master/img/EDA3.PNG" />


Even though plot is clearly busy, it does show some airline on-time trends i.e. effect of Weather.  As we see the On-time performance degrade in certain months that one can relate to weather impact.  This chart is satisfactory in visualizing the this trend for the airlines arriving at the selected airport during the selected year.  It shows how various airlines improved or worsened from month to month, and which airlines performed better for the selected year.  

In order to address the second part of the question as to what factors impact the on-time arrival and how , I decided to look into plotting weather, security, and carrier on-time aveages for the month. 

Using inspiration from examples at [dimplejs.org](http://dimplejs.org/advanced_examples_viewer.html?id=advanced_trellis_bar) I read weather, security, and carrier related data and calculated averages for each month in the give year and plotted trellis bar graph to high light the impact on the on-time performance of airlines for those months at the selected airport and year.

This initial iteration can be viewed at `index2.html`, or below:

<img src="../master/img/EDA4.PNG" />


### Feedback



#### Interview #1



#### Interview #2



#### Interview #3



### Post-feedback Design


### Resources


- [Data Visualization and D3.js (Udacity)](https://www.udacity.com/course/viewer#!/c-ud507-nd)
- [dimple.js](http://dimplejs.org/)

### Data

- `data/473753677_82015_1729_airline_delay_causes.csv`: downloaded dataset
