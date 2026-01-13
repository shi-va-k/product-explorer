"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

export default function FavoriteToggle({ id }: { id: number }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(getFavorites().includes(id));
  }, [id]);

  function handle() {
    toggleFavorite(id);
    setFav(!fav);
  }

  return (
 <button
  aria-label="Toggle favorite"
  onClick={handle}
className={`px-4 py-2 rounded-lg text-sm transition-all duration-200
hover:scale-105 hover:shadow-md
cursor-pointer disabled:cursor-not-allowed
${fav
  ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
>
  {fav ? "❤️ Favorited" : "🤍 Add Favorite"}
</button>


  );
}
