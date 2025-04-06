import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onSearch(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Digite o nome do usuário do GitHub"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;
