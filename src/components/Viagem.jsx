import { useNavigate } from "react-router-dom"; // Corrigido para CamelCase

function Viagem(props) {
  const navigate = useNavigate();

  function verDetalhes(viagem) {
    const query = new URLSearchParams();
    query.set("title", viagem.destino);

    // Proteção caso o preço venha nulo ou indefinido
    const precoFormatado = viagem.preco
      ? Number(viagem.preco).toFixed(2)
      : "0.00";

    query.set(
      "description",
      `Data: ${viagem.data || "Não informada"}, Preço: R$ ${precoFormatado}`,
    );

    navigate(`/detalhes?${query.toString()}`);
  }

  function verNoMapa(viagem) {
    const query = new URLSearchParams();
    query.set("title", viagem.destino); // Passa o nome do destino (ex: Paris) para o mapa saber onde focar

    navigate(`/mapa?${query.toString()}`);
  }

  return (
    <div>
      <ul className="list-group shadow-sm">
        {props.viagens.map((viagem) => (
          <li
            key={viagem.id}
            className="list-group-item bg-dark border-secondary d-flex justify-content-between align-items-center p-3 mb-2 rounded"
          >
            {/* Botão de Detalhes (O que você já tinha) */}
            <button
              className="btn btn-link text-start text-decoration-none fw-bold text-light p-0 flex-grow-1 d-flex align-items-center gap-2"
              onClick={() => verDetalhes(viagem)}
            >
              <span
                className="material-symbols-outlined text-info"
                style={{ fontSize: "18px" }}
              >
                travel
              </span>
              {viagem.destino}
            </button>

            {/* NOVO: Botão de abrir o Mapa */}
            <button
              onClick={() => verNoMapa(viagem)}
              className="btn btn-sm btn-outline-info me-2 px-3 d-flex align-items-center gap-1"
            >
              <span
                className="material-symbols-outlined text-info"
                style={{ fontSize: "18px" }}
              >
                map_search
              </span>
              Ver Mapa
            </button>

            {/* Botão de Excluir (O que você já tinha) */}
            <button
              onClick={() => props.onDeletarViagem(viagem.id)}
              className="btn btn-sm btn-outline-danger px-3"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Viagem;
