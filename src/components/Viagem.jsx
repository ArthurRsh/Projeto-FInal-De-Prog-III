import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditarViagem from "./EditarViagem.jsx";

function Viagem(props) {
  const navigate = useNavigate();
  const [idEditando, setIdEditando] = useState(null);

  function verDetalhes(viagem) {
    const query = new URLSearchParams();
    query.set("title", viagem.destino);
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
    query.set("title", viagem.destino);
    navigate(`/mapa?${query.toString()}`);
  }

  function salvarEdicao(id, novosDados) {
    props.onEditarViagem(id, novosDados);
    setIdEditando(null);
  }

  return (
    <div>
      <ul className="list-group shadow-sm">
        {props.viagens.map((viagem) => (
          <li
            key={viagem.id}
            className="list-group-item bg-dark border-secondary d-flex justify-content-between align-items-center p-3 mb-2 rounded"
          >
            {idEditando === viagem.id ? (
              <EditarViagem
                viagem={viagem}
                onSalvar={salvarEdicao}
                onCancelar={() => setIdEditando(null)}
              />
            ) : (
              <>
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

                <button
                  onClick={() => setIdEditando(viagem.id)}
                  className="btn btn-sm btn-outline-success px-3 ms-2"
                >
                  Editar
                </button>

                <button
                  onClick={() => props.onDeletarViagem(viagem.id)}
                  className="btn btn-sm btn-outline-danger px-3 ms-2"
                >
                  Excluir
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Viagem;
