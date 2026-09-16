import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// Automatically fit the map to available observations
function MapBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    const validLocations = locations.filter(
      (item) =>
        typeof item.latitude === "number" &&
        typeof item.longitude === "number"
    );

    if (validLocations.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(
      validLocations.map((item) => [
        item.latitude,
        item.longitude,
      ])
    );

    map.fitBounds(bounds, {
      padding: [30, 30],
    });
  }, [locations, map]);

  return null;
}


function Habitat() {

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchLocations();
  }, []);


  async function fetchLocations() {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/population/locations`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLocations(response.data);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load wildlife location data."
      );

    } finally {

      setLoading(false);

    }
  }


  return (

    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />


      <main className="ml-64 flex-1 p-8">


        {/* Header */}

        <div className="mb-8">

          <p className="text-teal-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Habitat Analytics
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Habitat Intelligence
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Explore wildlife observation locations using geographic
            distribution data from the project dataset.
          </p>

        </div>


        {/* Summary */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">


          <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Mapped Observations
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              {locations.length.toLocaleString()}
            </p>

          </div>


          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Geographic Data
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              Latitude + Longitude
            </p>

          </div>


          <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Data Source
            </p>

            <p className="text-xl font-bold text-white mt-2">
              Wildlife Dataset
            </p>

          </div>

        </div>


        {/* Error */}

        {error && (

          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-6 mb-7">

            <p className="text-red-400 font-semibold">
              {error}
            </p>

          </div>

        )}


        {/* Map */}

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 shadow-2xl">


          <div className="flex items-center gap-4 mb-5">

            <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-2xl">
              🗺️
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Wildlife Observation Map
              </h2>

              <p className="text-slate-400 text-sm">
                Select a marker to view species and observation details.
              </p>

            </div>

          </div>


          {loading ? (

            <div className="h-[600px] rounded-xl bg-slate-900 flex items-center justify-center">

              <div className="text-center">

                <div className="text-4xl mb-4 animate-pulse">
                  🗺️
                </div>

                <p className="text-slate-300">
                  Loading wildlife locations...
                </p>

              </div>

            </div>

          ) : locations.length === 0 ? (

            <div className="h-[600px] rounded-xl bg-slate-900 flex items-center justify-center">

              <p className="text-slate-400">
                No wildlife location data available.
              </p>

            </div>

          ) : (

            <div className="h-[600px] rounded-xl overflow-hidden">

              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={true}
                className="h-full w-full"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <MapBounds locations={locations} />


                {locations.map((item, index) => (

                  <Marker
                    key={index}
                    position={[
                      item.latitude,
                      item.longitude,
                    ]}
                  >

                    <Popup>

                      <div className="text-sm">

                        <strong>
                          {item.common_name ||
                            item.scientific_name}
                        </strong>

                        <br />

                        <span>
                          Scientific name:{" "}
                          {item.scientific_name}
                        </span>

                        <br />

                        <span>
                          Group:{" "}
                          {item.iconic_taxon_name ||
                            "Unknown"}
                        </span>

                        <br />

                        <span>
                          Observed:{" "}
                          {item.observed_on ||
                            "Unknown"}
                        </span>

                        <br />

                        <span>
                          Latitude:{" "}
                          {item.latitude}
                        </span>

                        <br />

                        <span>
                          Longitude:{" "}
                          {item.longitude}
                        </span>

                      </div>

                    </Popup>

                  </Marker>

                ))}

              </MapContainer>

            </div>

          )}

        </div>


        {/* Information */}

        <div className="mt-7 bg-[#111827] border border-white/10 rounded-2xl p-7">

          <h2 className="text-xl font-bold text-white">
            Habitat Mapping Information
          </h2>

          <p className="text-slate-400 mt-3 leading-relaxed">
            The map visualizes wildlife observation locations using
            latitude and longitude information from the connected
            wildlife dataset. Each marker represents an observation
            and provides species, taxonomic group and observation-date
            information.
          </p>

        </div>


      </main>

    </div>

  );
}


export default Habitat;