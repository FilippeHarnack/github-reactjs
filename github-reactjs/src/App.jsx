import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
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
    <div
      className="d-flex justify-content-center align-items-center bg-dark text-white"
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        padding: '1rem',
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          width: '90%',
          maxWidth: '600px',
          borderRadius: '20px',
          backgroundColor: '#1e1e1e',
          minHeight: '500px', // Aumentado para dar mais espaço
        }}
      >
        <h2 className="title-custom mb-4 d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub Icon"
            className="me-2"
            style={{ width: "32px", height: "32px" }}
          />
          Perfil GitHub
        </h2>

        <form
          className="search-form position-relative mb-4"
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
            style={{
              borderRadius: '6px',
              backgroundColor: '#fff',
              color: '#000',
              paddingRight: '40px'
            }}
          />
          <button
            type="submit"
            className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
            style={{ zIndex: 2 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/751/751381.png"
              alt="Buscar"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </form>

        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {!loading && data && (
          <div className="card bg-light text-dark p-3 github-user d-flex flex-column align-items-center mt-3 fade-in">
            <img
              src={data.avatar_url}
              alt={data.name}
              className="rounded-circle shadow"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <h5 className="mt-2">{data.name || "Sem nome"}</h5>
            <p className="text-muted text-center mb-0">
              {data.bio || "Sem bio pública."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
