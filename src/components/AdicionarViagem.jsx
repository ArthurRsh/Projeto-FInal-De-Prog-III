import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AdicionarViagem(props) {
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destino || !data || !preco) {
      alert("Por favor, preencha todos os campos para planejar sua viagem!");
      return;
    }

    props.onAdicionarViagem({ destino, data, preco: Number(preco) });

    setDestino("");
    setData("");
    setPreco("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <h3 className="h4 text-secondary mb-4 fw-bold">Nova Viagem</h3>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label small fw-bold text-muted">
            Aonde você vai?
          </label>
          <input
            type="text"
            className="form-control form-control-lg bg-light border-0 shadow-sm"
            placeholder="Ex: Paris, Buenos Aires..."
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">Quando?</label>
          <input
            type="date"
            className="form-control form-control-lg bg-light border-0 shadow-sm"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">
            Orçamento Estimado
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0 shadow-sm fw-bold text-muted">
              R$
            </span>
            <input
              type="number"
              className="form-control form-control-lg bg-light border-0 shadow-sm"
              placeholder="0,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 shadow-sm fw-bold py-3"
          >
            Adicionar ao Planejador
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdicionarViagem;
