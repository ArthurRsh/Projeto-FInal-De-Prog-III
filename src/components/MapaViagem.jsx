import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correção do bug dos ícones do Leaflet com o Vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Subcomponente auxiliar para mover a câmera do mapa dinamicamente
function AtualizarCentroMapa({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

function MapaViagem() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Nome do destino vindo do parâmetro da URL
  const destino = searchParams.get("title") || "Seu Destino";

  // Estados para a localização, controle de carregamento e o nome completo da API
  const [posicao, setPosicao] = useState([-23.55052, -46.633308]); // Começa em SP como padrão
  const [carregando, setCarregando] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState(destino);

  // Hook que faz a busca da localização real na API do OpenStreetMap (Nominatim)
  useEffect(() => {
    if (!destino || destino === "Seu Destino") return;

    setCarregando(true);

    // Buscando em português e limitando a 1 resultado
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destino)}&limit=1&accept-language=pt-br`;

    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          const { lat, lon, display_name } = dados[0];

          // Atualiza as coordenadas e o nome completo estruturado da localização
          setPosicao([parseFloat(lat), parseFloat(lon)]);
          setNomeCompleto(display_name);
        } else {
          console.warn("O radar não encontrou: " + destino);
        }
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar coordenadas:", erro);
        setCarregando(false);
      });
  }, [destino]);

  return (
    <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center py-4">
      {/* O Quadradão Estilizado */}
      <div
        className="card bg-dark border-secondary shadow-lg rounded-4 p-4 d-flex flex-column"
        style={{ width: "200vh", maxWidth: "1900px", height: "85vh" }}
      >
        {/* Cabeçalho do Card */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <span className="badge bg-info-subtle text-info mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase">
              {carregando ? "Buscando no mapa..." : "Geolocalização"}
            </span>
            <h2 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
              <span
                className="material-symbols-outlined text-info"
                style={{ fontSize: "40px" }}
              >
                map
              </span>
              {destino}
            </h2>
          </div>
          <button
            className="btn btn-outline-light fw-semibold px-4 py-2"
            onClick={() => navigate("/")}
          >
            Voltar para as Viagens
          </button>
        </div>

        {/* O MAPA INTERATIVO */}
        <div className="flex-grow-1 w-100 rounded-4 overflow-hidden border border-secondary shadow-sm">
          <MapContainer
            center={posicao}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            {/* Tema Escuro do Mapa */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Ativador do movimento da câmera */}
            <AtualizarCentroMapa center={posicao} />

            {/* Marcador na posição real */}
            <Marker position={posicao}>
              <Popup>
                <div className="text-dark">
                  <span className="fw-bold fs-6">{destino}</span> <br />
                  <span className="text-secondary small d-block my-1">
                    {nomeCompleto}
                  </span>
                  <span>Seu ponto de partida planejado!</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Rodapé com Dica */}
        <div className="mt-3 text-light small d-flex align-items-center justify-content-center gap-2">
          <span
            className="material-symbols-outlined text-info"
            style={{ fontSize: "30px" }}
          >
            lightbulb_2
          </span>
          <span>
            Dica: Você pode arrastar, usar o scroll do mouse para dar zoom e
            clicar no marcador azul!
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapaViagem;
