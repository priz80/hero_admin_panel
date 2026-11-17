const isLocalhost = typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1");

const BASE_PATH = isLocalhost
  ? ""
  : window.location.pathname.replace(/\/$/, "");

export const fetchHeroes = async () => {
  const url = isLocalhost
    ? "http://localhost:3001/heroes"
    : `${BASE_PATH}/data/heroes.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch heroes");
  return await response.json();
};

export const fetchFilters = async () => {
  const url = isLocalhost
    ? "http://localhost:3001/filters"
    : `${BASE_PATH}/data/filters.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch filters");
  return await response.json();
};
