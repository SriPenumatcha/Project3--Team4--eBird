// Constants for CSV file
const CSV_FILE_URL = 'https://sripenumatcha.github.io/eBird-Data-Visualisation/Resources/eBird_observations_data.csv';

// Variables for storing data
let birdData = []; // Array to hold bird observation data
let map;
let markers = L.layerGroup(); // Layer group to hold markers

// Function to fetch CSV data
async function fetchCSVData() {
    try {
        const response = await fetch(CSV_FILE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch CSV data.');
        }
        const data = await response.text();
        return d3.csvParse(data);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return [];
    }
}

// Function to initialize the dashboard
async function initializeDashboard() {
    try {
        birdData = await fetchCSVData(); // Fetch CSV data
        populateDropdown();
        initializeMap();

        // Select the first state and trigger change event
        const stateSelect = document.getElementById('stateSelect');
        if (stateSelect.options.length > 0) {
            const firstStateCode = stateSelect.options[0].value;
            stateSelect.value = firstStateCode;
            stateSelect.dispatchEvent(new Event('change'));
        }
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

// Populate dropdown with states
function populateDropdown() {
    const stateSelect = document.getElementById('stateSelect');
    
    // Extract unique states from CSV data
    const states = {};
    birdData.forEach(observation => {
        const code = observation.subnational1Code;
        const name = observation.subnational1Name;
        if (code && name && !states[code]) {
            states[code] = name;
        }
    });

    // Add options to select element
    for (const [code, name] of Object.entries(states)) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        stateSelect.appendChild(option);
    }

    // Bind dropdown change event listener
    stateSelect.addEventListener('change', function() {
        const regionCode = stateSelect.value;
        optionChanged(regionCode);
    });
}

// Handle dropdown selection change
function optionChanged(regionCode) {
    const data = filterDataByRegion(regionCode);
    const top10Observers = getTop10Observers(data);
    const top10Species = getTop10BirdSpeciesObservations(data);
    displayLocationInfo(data, top10Species);
    displayCharts(data, top10Observers, top10Species); // Pass entire data for bubble chart
    updateMap(data);
}

// Filter data by selected region (state)
function filterDataByRegion(regionCode) {
    return birdData.filter(observation => observation.subnational1Code === regionCode);
}

// Get top 10 observers based on the number of observations
function getTop10Observers(data) {
    const observerCounts = data.reduce((acc, observation) => {
        acc[observation.userDisplayName] = (acc[observation.userDisplayName] || 0) + 1;
        return acc;
    }, {});

    const sortedObservers = Object.entries(observerCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

    return sortedObservers.map(observer => ({
        userDisplayName: observer,
        count: observerCounts[observer]
    }));
}

// Get top 10 bird species based on the number of times observed
function getTop10BirdSpeciesObservations(data) {
    const speciesCounts = data.reduce((acc, observation) => {
        acc[observation.comName] = (acc[observation.comName] || 0) + 1;
        return acc;
    }, {});

    const sortedSpecies = Object.entries(speciesCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

    return data.filter(observation => sortedSpecies.includes(observation.comName));
}

// Display location info in card
function displayLocationInfo(allData, top10Data) {
    const metadataDiv = document.getElementById('sample-metadata');
    metadataDiv.innerHTML = ''; // Clear previous content

    const speciesSet = new Set(allData.map(observation => observation.comName));
    const speciesList = Array.from(speciesSet).sort();

    if (speciesList.length === 0) {
        metadataDiv.innerHTML = '<p>No recent notable observations.</p>';
        return;
    }

    const speciesDiv = document.createElement('div');
    speciesDiv.classList.add('species-list');
    const ul = document.createElement('ul');
    speciesList.forEach(species => {
        const li = document.createElement('li');
        li.textContent = species;
        ul.appendChild(li);
    });
    speciesDiv.appendChild(ul);
    metadataDiv.appendChild(speciesDiv);

    // Display top 10 observations
    const top10Div = document.createElement('div');
    top10Div.classList.add('top10-list');
    top10Div.innerHTML = '<h6>Top 10 Observations:</h6>';
    top10Data.forEach(observation => {
        const obsDiv = document.createElement('div');
        obsDiv.classList.add('observation');
        obsDiv.innerHTML = `
            <h6>${observation.comName}</h6>
            <p>Location: ${observation.locName}</p>
            <p>Date: ${observation.obsDt}</p>
            <p>Observer: ${observation.userDisplayName}</p>
        `;
        top10Div.appendChild(obsDiv);
    });
}

// Display charts
function displayCharts(allData, top10Observers, top10Species) {
    const barDiv = document.getElementById('bar');
    const bubbleDiv = document.getElementById('bubble');
    const pieDiv = document.getElementById('pie'); // Ensure you have a div with id 'pie' in your HTML

    // Plotly Bar Chart for top 10 observers
    const barData = [{
        x: top10Observers.map(observer => observer.userDisplayName),
        y: top10Observers.map(observer => observer.count),
        type: 'bar',
        text: top10Observers.map(observer => observer.count), // Display the count as text
        textposition: 'auto'
    }];
    const barLayout = {
        title: 'Top 10 Observers by Number of Observations'
    };
    Plotly.newPlot(barDiv, barData, barLayout);

    // Bubble Chart for species observations in the selected state
    const speciesCounts = allData.reduce((acc, observation) => {
        acc[observation.comName] = (acc[observation.comName] || 0) + 1;
        return acc;
    }, {});

    const bubbleData = [{
        x: Object.keys(speciesCounts).map((_, index) => index + 1),
        y: Object.values(speciesCounts),
        text: Object.entries(speciesCounts).map(([species, count]) => `${species}: ${count} observations`),
        mode: 'markers',
        marker: {
            size: Object.values(speciesCounts).map(count => Math.sqrt(count) * 4), // Size based on count
            color: Object.values(speciesCounts), // Color based on count
            colorscale: 'Viridis'
        }
    }];
    const bubbleLayout = {
        title: 'Species by Number of Observations',
        xaxis: { title: 'Species' },
        yaxis: { title: 'Number of Observations' }
    };
    Plotly.newPlot(bubbleDiv, bubbleData, bubbleLayout);

    // ECharts Pie Chart for top 10 bird species observations
    const top10SpeciesCounts = top10Species.reduce((acc, observation) => {
        acc[observation.comName] = (acc[observation.comName] || 0) + 1;
        return acc;
    }, {});

    const top10SpeciesNames = Object.keys(top10SpeciesCounts);
    const top10Counts = Object.values(top10SpeciesCounts);

    const pieChart = echarts.init(pieDiv);
    const pieData = top10SpeciesNames.map((name, index) => ({
        name: name,
        value: top10Counts[index]
    }));
    const pieOption = {
        title: {
            text: 'Top 10 Bird Species Observations',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Species',
                type: 'pie',
                radius: '50%',
                data: pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    pieChart.setOption(pieOption);
}


// Initialize the map
function initializeMap() {
    map = L.map('map').setView([-25.2744, 133.7751], 4); // Center of Australia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markers.addTo(map); // Add the markers layer to the map
}

// Update the map with new markers
function updateMap(data) {
    markers.clearLayers(); // Clear existing markers

    data.forEach(observation => {
        if (observation.lat && observation.lng) {
            const marker = L.marker([parseFloat(observation.lat), parseFloat(observation.lng)]);
            marker.bindPopup(`
                <b>${observation.comName}</b><br>
                Location: ${observation.locName}<br>
                Date: ${observation.obsDt}<br>
                Observer: ${observation.userDisplayName}
            `);
            markers.addLayer(marker); // Add marker to the layer group
        }
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', initializeDashboard);
