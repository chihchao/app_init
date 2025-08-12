
import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>打招呼平台</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="請輸入使用者名稱"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "送出中..." : "送出"}
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App
