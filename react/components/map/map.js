import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"

const Map = (props) => {

    const data = props.data;
    props.data !== "" && console.log(JSON.parse(data));
    let markers = []

    if (props.data !== "") {
        JSON.parse(data).forEach(e => {
            markers.push({
                geocode: e['geo_point_2d']
            })
        });
    }

    const customIcon = new Icon(
        {
            iconUrl: require("../../assets/pin.png"),
            iconSize: [38, 38]
        }
    )

    return (
        <div>
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                >

                </TileLayer>

                {markers.map((marker) => (
                    <Marker position={marker.geocode} icon={customIcon}>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
}

export default Map;
