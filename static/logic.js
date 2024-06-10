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
        zoom: 3,
        layers: [streetmap, birdSightings]
    });

    L.control.layers(baseMaps, overlayMaps,{
        collapsed: false
    }).addTo(map);

}

function createMarkers(response){
    let birdMarkers = [];
    for (let i = 0; i < response.length; i++){
        let bird = response[i];
        let birdMarker = L.marker([bird.lat, bird.lng])
            .bindPopup(" ");

        birdMarkers.push(birdMarker);
        
    }

    createMap(L.layerGroup(birdMarkers));

}

// d3.json("https://api.ebird.org/v2/data/obs/AU/recent?back=30").header("X-eBirdApiToken", "m2l3d329lrja").

const axiosInstance = axios.create({
    baseURL: 'https://api.ebird.org/v2',
  });

  axiosInstance.defaults.headers.common['X-eBirdApiToken'] = `m2l3d329lrja`;

  axiosInstance.get('/data/obs/AU/recent?back=30')
  .then(response => {
    console.log(response.data);
    createMarkers(response.data)
})

  
