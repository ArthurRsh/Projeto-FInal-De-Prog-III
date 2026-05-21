import { useState } from "react";

function EditarViagem({ viagem, onSalvar, onCancelar }) {
  const [destino, setDestino] = useState(viagem.destino);
  const [data, setData] = useState(viagem.data);
  const [preco, setPreco] = useState(viagem.preco);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(viagem.id, { destino, data, preco });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-wrap gap-2 w-100 p-2 align-items-center"
    >
      <input
        type="text"
        className="form-control form-control-sm w-auto flex-grow-1"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        required
      />
      <input
        type="date"
        className="form-control form-control-sm w-auto"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />
      <input
        type="number"
        className="form-control form-control-sm w-auto"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-sm btn-success fw-bold">
        Salvar
      </button>
      <button
        type="button"
        className="btn btn-sm btn-secondary fw-bold"
        onClick={onCancelar}
      >
        Cancelar
      </button>
    </form>
  );
}

export default EditarViagem;
