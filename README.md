# Ebird-data-visualisation

This is Team 4's repository for Monash University Data Analytics Bootcamp Project 3

Team contributors: Lindsay McCulloch, Sri Penumatcha, Vrinda Patel, Yashada Kulkarni

Deployment Link to GitHub pages: - https://sripenumatcha.github.io/eBird-Data-Visualisation/eBird_dashboard/eBird.html

## Contents

* **Fetch_data_and_clean folder**
* `API_Data_export_data_cleaning.ipynb` file containing the cleaned and merged data from the Ebird and reverse Geocoding API calls

* **Resources folder**
    * `eBird_observations_data.csv` static data exported from the API_Data_export_data_cleaning.ipynb file
    * `eBird_observations_data.json` static data exported from the API_Data_export_data_cleaning.ipynb file

* **SQL folder** 
    * `Create_scripts.sql` file containing tables for importing data into PostgreSQL
    * `ERD.png` image of our ERD for the dataset
    * `sql_data_viz.ipynb` file containing visualisation from the data extracted 
    * `sql_queries.sql` file containing SQL queries of the data
    * **SQL_Output folder** 
        * `results_observation_days.csv` file containing the results from the SQL queries
        * `results_species_diversity.csv` file containing the results from the SQL queries

* **eBird_dashboard folder**
    * `app.js` JavaScript file responsible for adding interactivity and functionality to the eBird dashboard
    * `eBird.html` is the main HTML file that structures the eBird dashboard 
    * `styles.css` file that styles the eBird dashboard 

* `Proposal_project3_team4.docx` file containing the proposal for this project
* `Analysis.ipynb` notebook file containing Python visualisations
* `project3_team4.pptx` file containing our powerpoint presentation

## Background

An enterprising group of scientists at the Cornell Lab of Ornithology started a citizen science project called eBird and they have been collecting birding data. This data that can drive our understanding of the avian world. 

In this project, our team has decided to follow the data visualisation track for interpretting this data from the Ebird API.
The Cornell Lab of Ornithology offer a flat file with over 30GB of data for download upon request, however due to the limited time available for this project, our team had to utilise the limited data from the eBird API call capturing only the past 30 days worth of data.

In the absence of historical data, we have decided to answer the following key questions:

1. How many species were observed, and how many individual observations were made; for Australia and for each state

2. Which species were observed and where? 

3. Which birding spots had max species diversity? 

4. Which were the 10 most commonly observed species, Australia-wide and state-wise?

5. Which species were least common? 

6. Which birding spots had max observations, Australia-wide and state-wise

7. State-wise what are the “notable” observations of birds?

8. Who were the top 10 observers per number of observations in each state?


The eBird Context Dashboard we have created provides an interactive platform for exploring bird observation data, allowing users to visualize and analyze bird species, observer activities, and observation locations across different regions.
As this is a continuously updating dataset, we have converted the data into static CSV and JSON files using the below libraries to execute our visualisations;

* **Requests** For making the API calls
* **JSON** For parsing JSON data into a Python dictionary or list
* **Pandas** For analyzing, cleaning, exploring, and manipulating data
* **D3.js:** For data manipulation and CSV parsing
* **Plotly:** For creating bar and bubble charts
* **ECharts:** For rendering the pie chart
* **Leaflet:** For creating the interactive map
* **Hvplot** For creating BarCharts
* **Matplotlib** For creating PieCharts
* **Bokeh** For creating Map
* **Holoviews** For creating Map

**Key Features of our dashboard include:**

* **Interactive Selection:** Users can dynamically change the state selection, and the dashboard updates all relevant data and visualizations accordingly.
* **Comprehensive Visualization:** Multiple chart types and an interactive map provide a holistic view of bird observation data.
* **Data-Rich Insights:** Detailed information about the top bird species and top observers is readily accessible.

## Ethical consideration 

An ethical consideration that was made by our group was to utilise the GeoCoding API from Google maps to not only clean the location data names but to also provide privacy to the bird observers who had recorded their observations at locations titled "home", "backyard" etc. 
Rather than providing exact locations for the bird watchers private residences we have updated the observation locations to include only the relevant street name and state information. 

## Requirements

**Data and Delivery (20 points)**

* The dataset contains at least 100 unique records. (5 points)

* A database is used to house the data (SQL, MongoDB, SQLite, etc.). (5 points)

* The GitHub repo has a README.md that includes the following: (10 points)

    - An overview of the project and its purpose

    - Instructions on how to use and interact with the project

    - At least one paragraph summarising efforts for ethical considerations made in the project

    - References for the data source(s)

    - References for any code used that is not your own

**Visualisations (25 points)**

* A minimum of three unique views present the data. (10 points)

* The visualisations are presented in a clear, digestible manner. (5 points)

* The data story is easy to interpret for users of all levels. (10 points)

**Usability (30 points)**

* The script, notebook, or webpage created to showcase data visualisations runs without error. (10 points)

* A Python or JavaScript library not shown in class is used in the project. (10 points)

* The project includes some level of user-driven interaction, conforming to one of the following designs: (10 points)

    - HTML menus, dropdowns, and/or textboxes to display JavaScript-powered visualisations

    - Flask backend with interactive API routes that serve back Python or JavaScript created plots

    - Visualisations created from user-selected filtered data

## Resources

BCS Xpert Learning assistant

https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding

https://stackoverflow.com/questions/72727292/merging-of-api-response-data


## Acknowledgments

* Dataset sourced from © 2024 Cornell University eBird API - https://ebird.org/data/download
* Supporting location data sourced from Google LLC Geocoding API - https://developers.google.com/maps/documentation/geocoding/overview
