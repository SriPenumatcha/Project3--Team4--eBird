// Create the CreateMap function

function createMap(birdSightings){
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    let baseMaps = {
        "Street Map": streetmap
    };
    
    let overlayMaps = {
        "Bird Sightings": birdSightings
    };
    
    let map = L.map("map-id",{
        center: [-23.69, 133.88],
        zoom: 5,
        layers: [streetmap, birdSightings]
    });

    L.control.layers(baseMaps, overlayMaps,{
        collapsed: false
    }).addTo(map);

}

function createMarkers(response){
    let birds = response.comName;
    let birdMarkers = [];
    for (let i = 0; i < response.length; i++){
        let bird = birds[i];
        let birdMarker = L.marker([response.lat, response.lng])
            .bindPopup(" ");

        birdMarkers.push(birdMarker);
    }

    createMap(L.layerGroup(birdMarkers));

}

d3.json("https://api.ebird.org/v2/data/obs/AU/recent?back=30").then(createMarkers);

