import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { } from "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";

const map = L.map('map').setView([43.204666, 27.910543], 10);
const MarkerMap = {};
const RoutingMap = {};
const RoutingArray = [];
let RouteControl = L.Routing.control({
    serviceUrl: 'https://smartbinosrm.blueweabo.com/route/v1'
});
RouteControl.addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
function reloadRouting() {
    const keys = Object.keys(MarkerMap);
    for (const key in RoutingMap) {
        delete RoutingMap[key];
    }
    let i = 0;
    while(RoutingArray.length > 0) {
        RoutingArray.pop();
    }
    keys.forEach(key => {
        const marker = MarkerMap[key];
        if (marker["info"] > 50) {
            RoutingArray[i++] = marker["mark"].getLatLng();

        }
    })
    RouteControl.setWaypoints(RoutingArray);
}



const firebaseConfig = {
    apiKey: "AIzaSyAPDYXHTFJzMkvzLAYGrPy368BthLpovtM",
    authDomain: "smartbin-d94f7.firebaseapp.com",
    databaseURL: "https://smartbin-d94f7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smartbin-d94f7",
    storageBucket: "smartbin-d94f7.appspot.com",
    messagingSenderId: "518082529527",
    appId: "1:518082529527:web:fd3cef87782f5126a16bf2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

function readTrashCanData(field) {
    const latitudeRef = ref(database, `smartbin/${field}/location/latitude`);
    const longitudeRef = ref(database, `smartbin/${field}/location/longitude`);
    const percentageRef = ref(database, `smartbin/${field}/percentage`);

    onValue(latitudeRef, (latSnapshot) => {
        const latitude = latSnapshot.val();
        onValue(longitudeRef, (lngSnapshot) => {
            const longitude = lngSnapshot.val();
            onValue(percentageRef, (percentageSnapshot) => {
                const percentage = percentageSnapshot.val();
                console.log("Location:" + latitude + "," + longitude);
                // console.log(longitude);
                console.log("Percenage:" + percentage);
                const date = new Date();
                const hour = date.getHours();
                const min = date.getMinutes();
                console.log(latitude);
                console.log(longitude);
                console.log("updated:" + hour + ":" + min);
                if (latitude !== null && longitude !== null && percentage !== null) {
                    const binData = {
                        lat: latitude,
                        lng: longitude,
                        info: `Percentage: ${percentage}%`
                    };

                    if (!MarkerMap[field]) {
                        MarkerMap[field] = { mark: L.marker([binData.lat, binData.lng]), info: percentage };
                    }
                    const marker = MarkerMap[field]["mark"];
                    map.removeLayer(marker);
                    marker.setZIndexOffset(1000);
                    marker.setLatLng([binData.lat, binData.lng]);
                    marker.addTo(map);
                    marker.bindPopup(binData.info);
                    marker.setPopupContent(binData.info);
                    reloadRouting();
                } else {
                    console.error("Invalid latitude, longitude, or percentage data:", latitude, longitude, percentage);
                }
            });
        });
    });
}


readTrashCanData("Bin1");
readTrashCanData("Bin2");
readTrashCanData("Bin3");
readTrashCanData("Bin4");
readTrashCanData("Bin5");
reloadRouting();
// L.Routing.control({
//     waypoints: [
//         L.latLng(43.21436107755289, 27.89921972626954),
//         L.latLng(43.24243423495769, 27.849323114698294),
//         L.latLng(43.17924205882412, 27.888085783308405),
//     ],routeDragging:false
// }).addTo(map);
