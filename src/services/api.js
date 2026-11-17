const isLocalhost = typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1");

export const fetchHeroes = async () => {
  const url = isLocalhost
    ? "http://localhost:3001/heroes"
    : "/data/heroes.json";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch heroes");
  return await response.json();
};

export const fetchFilters = async () => {
  const url = isLocalhost
    ? "http://localhost:3001/filters"
    : "/data/filters.json";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch filters");
  return await response.json();
};

export const addHero = async (hero) => {
  const url = isLocalhost
    ? "http://localhost:3001/heroes"
    : "/data/heroes.json";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hero),
  });
  if (!response.ok) throw new Error("Could not create hero");
  return await response.json();
};

export const deleteHero = async (id) => {
  const url = isLocalhost
    ? `http://localhost:3001/heroes/${id}`
    : `/data/heroes.json/${id}`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) throw new Error("Could not delete hero");
  return response;
};
