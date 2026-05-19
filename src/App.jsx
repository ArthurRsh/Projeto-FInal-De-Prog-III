import { useEffect, useState } from "react";
import "./App.css";
import AdicionarViagem from "./components/AdicionarViagem.jsx";
import Viagem from "./components/Viagem.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Carrega as viagens do localStorage ou inicia um array vazio
  const [viagens, setViagens] = useState(() => {
    const salvas = localStorage.getItem("viagens");
    return salvas
      ? JSON.parse(salvas)
      : [
          // { id: 1, destino: "Paris", data: "2026-12-01", preco: 12000 },
          // { id: 2, destino: "Londres", data: "2026-06-14", preco: 15500 },
        ];
  });

  // Atualiza o localStorage sempre que a lista de viagens mudar
  useEffect(() => {
    localStorage.setItem("viagens", JSON.stringify(viagens));
  }, [viagens]);

  function adicionarViagem(viagem) {
    const novaViagem = { id: Date.now(), ...viagem };
    setViagens([...viagens, novaViagem]);
  }

  function deletarViagem(id) {
    const viagensAtualizadas = viagens.filter((viagem) => viagem.id !== id);
    setViagens(viagensAtualizadas);
  }

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h1 className="mb-4 text-center fw-bold text-primary">
        Planeje Sua Próxima Aventura
      </h1>

      <div className="card p-4 shadow-sm mb-4 bg-dark text-white rounded-4">
        <AdicionarViagem onAdicionarViagem={adicionarViagem} />
      </div>

      <hr className="my-4" />

      <h2 className="h3 mb-3 text-secondary fw-bold">Minhas Viagens</h2>
      {viagens.length > 0 ? (
        <Viagem viagens={viagens} onDeletarViagem={deletarViagem} />
      ) : (
        <p className="text-muted text-center py-4">
          Nenhuma viagem planejada ainda. Vamos começar?
        </p>
      )}
    </div>
  );
}

export default App;
