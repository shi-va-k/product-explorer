export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function toggleFavorite(id: number) {
  const favs = getFavorites();
  const updated = favs.includes(id)
    ? favs.filter(f => f !== id)
    : [...favs, id];
  localStorage.setItem("favorites", JSON.stringify(updated));
}
export function getPurchased(): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("purchased") || "[]");
}

export function togglePurchased(id: number) {
  const list = getPurchased();
  const updated = list.includes(id)
    ? list.filter(p => p !== id)
    : [...list, id];

  localStorage.setItem("purchased", JSON.stringify(updated));
}
