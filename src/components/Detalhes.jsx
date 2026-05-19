import { useSearchParams, useNavigate } from "react-router-dom";

function Detalhes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <div className="card p-5 shadow rounded-4 bg-white text-center">
        <h1 className="fw-bold text-primary mb-3">🗺️ Detalhes do Destino</h1>
        <h2 className="h3 mb-4 text-dark">{title}</h2>
        <p className="lead text-muted mb-4">{description}</p>

        <button
          className="btn btn-secondary w-100"
          onClick={() => navigate("/")}
        >
          Voltar para viagems
        </button>
      </div>
    </div>
  );
}

export default Detalhes;
