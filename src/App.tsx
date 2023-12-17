import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import styles from './App.module.scss';

mapboxgl.accessToken =
    'pk.eyJ1IjoidG9tcmF2IiwiYSI6ImNscTlrYTdqNzE5Z3oyanM5bWhrOGF0MTcifQ.PdEl6CYehj2UrSA4GMEvsQ';

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef<Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom,
            });

            map.current.on('move', () => {
                if (map.current) {
                    setLng(Number(map.current.getCenter().lng.toFixed(4)));
                    setLat(Number(map.current.getCenter().lat.toFixed(4)));
                    setZoom(Number(map.current.getZoom().toFixed(2)));
                }
            });
        }
    });

    return (
        <div>
            <div className={styles.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
}
