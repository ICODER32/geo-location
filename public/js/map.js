mapboxgl.accessToken = 'pk.eyJ1IjoiaWJ0aXNhbTMyIiwiYSI6ImNrc2ZoeGJoMDB0NnQydm51NDZuMGx6bTkifQ.dGxa3ZrPrYPcGOkS3WatTQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [73.07545, 33.70964]
})

async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json()
    const store = data.data.map(store => {
        return {

            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
            },
            properties: {
                storeId: store.storeId,
                icon: 'shop'
            }

        }
    })
    console.log(store)
    loadMap(store)
}

function loadMap() {
    map.on('load', function (stores) {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}
// loadMap()
getStores()