import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    if (!username) return;

    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Usuário não encontrado");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
        setUserData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-dark text-white py-5 px-3">
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{
          maxWidth: "900px",
          backgroundColor: "#121212",
          borderRadius: "20px",
          padding: "60px 40px",
          minHeight: "80vh",
          margin: "0 auto",
        }}
      >
        {/* Título */}
        <div className="text-center mb-4">
          <h2 className="fw-bold d-flex justify-content-center align-items-center">
            <span
              style={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "8px",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                style={{ width: "24px", height: "24px" }}
              />
            </span>
            Perfil GitHub
          </h2>
        </div>

        {/* Campo de busca */}
        <div className="input-group mb-4 justify-content-center w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Digite o nome do usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/751/751381.png"
              alt="Buscar"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>

        {/* Spinner de loading */}
        {loading && (
          <div className="mb-3 text-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {/* Resultado do perfil */}
        {userData && !loading && (
          <div className="d-flex bg-light text-dark rounded shadow p-4 profile-card">
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="rounded-circle me-4 profile-img"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h5 className="fw-bold">{userData.name || "Sem nome"}</h5>
              <p className="mb-0">{userData.bio || "Sem bio disponível"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
