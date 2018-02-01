

var osmBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> | Crash Data: Colorado DOT',
    opacity: .75
});

var map = L.map("map", {
    maxZoom: 18,
    layers: [osmBase],
    home: true
}).setView([39.88260603835847, -105.05693435668947], 11);

// uncomment to see a collection of an hour's worth of points
//points.forEach((p) => {
//    L.marker([p.latitude, p.longitude])
//    .bindPopup(`PlaneID: ${p.aircraftId}<br>Flight Number: ${p.flightNumber}<br>Date: ${p.time}<br>Altitude: ${p.altitude}<br>Direction: ${p.direction}`)
//    .addTo(map);
//});

var pubnub = new PubNub({
    subscribeKey: "sub-c-6f8e6a58-0776-11e8-8855-8e6ea0d48f72"
});

pubnub.subscribe({
    channels: ['aircraft_tracker']
});

pubnub.addListener({
    message: function(m){
        L.marker([m.message.latitude, m.message.longitude])
        .bindPopup(`PlaneID: ${m.message.aircraftId}<br>Flight Number: ${m.message.flightNumber}<br>Date: ${m.message.time}<br>Altitude: ${m.message.altitude}<br>Direction: ${m.message.direction}`)
        .addTo(map);
    }
});