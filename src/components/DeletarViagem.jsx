import { useState } from "react";

function DeletarViagem(props) {
  const [confirmado, setConfirmado] = useState(false);

  if (!confirmado) {
    return (
      <div>
        <p>Tem certeza que deseja excluir esta viagem?</p>
        <button onClick={() => setConfirmado(true)}>Sim</button>
        <button onClick={props.onCancelar}>Não</button>
      </div>
    );
  }

  return (
    <div>
      <p>Tem certeza que deseja excluir esta viagem?</p>
      <button onClick={props.onDeletarViagem}>Sim</button>
      <button onClick={() => setConfirmado(false)}>Não</button>
    </div>
  );
}

export default DeletarViagem;
