# plane-points

This app shows real-time airplane locations. It relies on [dump1090](https://github.com/tedsluis/dump1090) and a cheap software defined radio to post data to an endpoint. A seperate nodejs app calls to the endpoint once a second and publishes the data to pubnub. This app listens for those messages and publishes them to the map.
