const token = JSON.parse(localStorage.getItem("user"))?.token;

const res = await fetch('/api/some-secured-endpoint', {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
