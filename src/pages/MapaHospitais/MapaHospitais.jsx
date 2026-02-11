// MapaHospitais.jsx
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapaHospitais.module.css";
import { MdMyLocation } from "react-icons/md";
import AiSection from "../../components/AiSection";


const SEARCH_RADIUS_METERS = 5000;
const MAP_ZOOM_DEFAULT = 13;

export default function MapaHospitais() {
  const [animateRobot, setAnimateRobot] = useState(false);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Estados
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [results, setResults] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("hospital");     // NOVO
  const [searchQuery, setSearchQuery] = useState("");         // NOVO


  // Inicializa o mapa
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", { zoomControl: true }).setView([-23.5489, -46.6388], MAP_ZOOM_DEFAULT);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

      setTimeout(() => {
        mapRef.current.invalidateSize();
      },300);
    }
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setAnimateRobot(true);
  }, 100); // pequeno delay para suavidade

  return () => clearTimeout(timer);
}, []);


  // Geocodificação
  const geocodeAddress = async (addr) => {
    const q = encodeURIComponent(addr);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1&addressdetails=1`;
    const res = await fetch(url, { headers: { "Accept-Language": "pt" } });
    if (!res.ok) throw new Error("Geocoding falhou");
    const data = await res.json();
    if (data && data.length) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  };

  const queryOverpass = async (lat, lon, radius = SEARCH_RADIUS_METERS) => {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"~"hospital|clinic"](around:${radius},${lat},${lon});
        way["amenity"~"hospital|clinic"](around:${radius},${lat},${lon});
        relation["amenity"~"hospital|clinic"](around:${radius},${lat},${lon});
      );
      out center tags;
    `;
    const url = "https://overpass-api.de/api/interpreter";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: query,
    });
    if (!res.ok) throw new Error("Overpass API falhou");
    const json = await res.json();
    return json.elements
      .map((el) => {
        const latUse = el.lat ?? (el.center && el.center.lat);
        const lonUse = el.lon ?? (el.center && el.center.lon);
        return {
          id: el.id,
          lat: latUse,
          lon: lonUse,
          tags: el.tags || {},
        };
      })
      .filter((i) => i.lat && i.lon);
  };

  const demoPoints = () => [
    { id: "1", lat: -23.545, lon: -46.64, tags: { name: "Hospital Municipal Sorocabana", amenity: "hospital", phone: "(11) 3864-3379" } },
    { id: "2", lat: -23.55, lon: -46.65, tags: { name: "Clínica Premium Care", amenity: "clinic", phone: "(11) 3648-7800" } },
    { id: "3", lat: -23.5465, lon: -46.632, tags: { name: "Hospital Albert Sabin", amenity: "hospital", phone: "(11) 3839-4855" } },
  ];

  const updateMarkers = (items) => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();
    items.forEach((it) => {
      const marker = L.marker([it.lat, it.lon]).addTo(markersLayerRef.current);
      marker.bindPopup(`<b>${it.tags.name || "Unidade"}</b>`);
    });
    const group = L.featureGroup(markersLayerRef.current.getLayers());
    if (group.getBounds().isValid()) mapRef.current.fitBounds(group.getBounds().pad(0.2));
  };

  const enrichResults = (items) => {
    return items.map(item => {
      const isHospital = item.tags.amenity === 'hospital' || 
                        item.tags.name?.toLowerCase().includes('hospital');
      const isClinic = item.tags.amenity === 'clinic' || 
                      item.tags.name?.toLowerCase().includes('clínica');
      const isPublic = isHospital && (
        item.tags.operator?.toLowerCase().includes('sus') ||
        item.tags.name?.toLowerCase().includes('municipal') ||
        item.tags.name?.toLowerCase().includes('público')
      );
      return { ...item, isPublic, isHospital, isClinic };
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    const fullAddress = [address, number, bairro, cidade, cep, "Brasil"].filter(Boolean).join(", ");
    try {
      const geo = await geocodeAddress(fullAddress);
      if (!geo) throw new Error("Endereço não encontrado");
      setOrigin({ lat: geo.lat, lon: geo.lon });
      mapRef.current.setView([geo.lat, geo.lon], MAP_ZOOM_DEFAULT);

      let items = await queryOverpass(geo.lat, geo.lon);
      if (!items.length) items = demoPoints();

      const enriched = enrichResults(items);
      setResults(enriched);
      updateMarkers(enriched);
    } catch (err) {
      const demo = demoPoints();
      const enriched = enrichResults(demo);
      setResults(enriched);
      updateMarkers(enriched);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return alert("Geolocalização não suportada.");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setOrigin({ lat, lon });
        mapRef.current.setView([lat, lon], MAP_ZOOM_DEFAULT);

        let items = await queryOverpass(lat, lon);
        if (!items.length) items = demoPoints();

        const enriched = enrichResults(items);
        setResults(enriched);
        updateMarkers(enriched);
        setLoading(false);
      },
      () => {
        alert("Falha ao obter localização.");
        setLoading(false);
      }
    );
  };

  // FILTRAGEM DOS RESULTADOS
  const filteredResults = results.filter(item => {
    const matchesTab =
      activeTab === 'hospital' ? item.isHospital :
      activeTab === 'clinics' ? item.isClinic : true;

    const matchesSearch =
      !searchQuery ||
      item.tags.name?.toLowerCase().includes(searchQuery) ||
      item.tags["addr:street"]?.toLowerCase().includes(searchQuery) ||
      item.tags["addr:city"]?.toLowerCase().includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <p className={styles.kicker}>Encontre ajuda perto de você!</p>
            <h1 className={styles.heroTitle}>Procure Hospital e/ou Clínica mais próxima de você:</h1>

            <div className={styles.formCard}>
              <div className={styles.searchForm}>
                <input type="text" placeholder="Endereço:" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Número (opcional):" value={number} onChange={(e) => setNumber(e.target.value)} />
                <input type="text" placeholder="Cep:" value={cep} onChange={(e) => setCep(e.target.value)} />
                <div className={styles.row}>
                  <input type="text" placeholder="Cidade:" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                  <input type="text" placeholder="Bairro:" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </div>
                <div className={styles.searchActions}>
                  <button className={styles.btnSearch} onClick={handleSearch} disabled={loading}>
                    {loading ? "Buscando..." : "Pesquisar"}
                  </button>
                 <button className={styles.btnLocation} onClick={handleUseLocation} title="Usar minha localização" aria-label="Usar minha localização"
>               <MdMyLocation />
                </button>

                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={`${styles.robotWrap} ${ animateRobot ? styles.robotEnter : ""}`}>
              <img src="/assets/dermax2.png" alt="Robô médico DermaIA" />
            </div>
          </div>
        </div>

        <div className={styles.curveWrapper}>
          <svg className={styles.curveSvg} viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 Q360,0 720,30 T1440,60 L1440,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* MAPA + RESULTADOS */}
      <main className={styles.pageContent}>
        <section className={styles.mapSection}>
          <div className={styles.mapCard}>
            <div id="map" className={styles.map}></div>
          </div>

          <aside className={styles.resultsPanel}>
            <input
              type="text"
              placeholder="Pesquisa nome, endereço"
              className={styles.searchBox}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />

            <div className={styles.tabContainer}>
              <button
                className={`${styles.tab} ${activeTab === 'hospital' ? styles.active : ''}`}
                onClick={() => setActiveTab('hospital')}
              >
                Hospital
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'clinics' ? styles.active : ''}`}
                onClick={() => setActiveTab('clinics')}
              >
                Clínicas
              </button>
            </div>

            <div className={styles.resultsList}>
              {filteredResults.length === 0 ? (
                <p className={styles.noResults}>Nenhum resultado encontrado.</p>
              ) : (
                filteredResults.map((it, idx) => (
                  <div key={it.id} className={styles.resultItem}>
                    <div className={styles.resultInfo}>
                      <div className={styles.resultName}>{it.tags.name || `Unidade ${idx + 1}`}</div>
                      <div className={styles.resultAddress}>
                        {it.tags["addr:street"] || it.tags["addr:city"] || "Endereço não informado"}
                      </div>
                      {it.tags.phone && <div className={styles.resultPhone}>{it.tags.phone}</div>}
                      <span className={`${styles.tag} ${it.isPublic ? styles.public : styles.private}`}>
                        {it.isPublic ? "Público" : "Privado"}
                      </span>
                    </div>
                    <button
                      className={styles.routeBtn}
                      onClick={() => {
                        if (!origin) return;
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lon}&destination=${it.lat},${it.lon}&travelmode=driving`;
                        window.open(url, "_blank");
                      }}
                    >
                      Ver rota
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>
      </main>

      <AiSection />
    </>
  );
}
