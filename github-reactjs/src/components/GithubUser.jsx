import { useState } from "react";

const GithubUser = () => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!username) return;

    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuário não encontrado");
        }
        return response.json();
      })
      .then((userData) => {
        setData(userData);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ minHeight: '100vh' }}>
      <div className="card bg-secondary text-white p-4 shadow" style={{ width: '100%', maxWidth: '480px' }}>
        <h2 className="text-center mb-4 d-flex align-items-center justify-content-center">
          <i className="bi bi-github fs-3 me-2"></i>
          Perfil GitHub
        </h2>

        <form
          className="input-group mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {data && !loading && (
          <div className="card bg-light text-dark p-3 d-flex flex-row align-items-center gap-3">
            <img
              src={data.avatar_url}
              alt={data.name}
              className="rounded-circle border border-primary"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-1">{data.name || "Sem nome"}</h5>
              <p className="mb-0 text-muted">{data.bio || "Sem bio pública."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubUser;
