"use client";

import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/api";
import { getFavorites, toggleFavorite, getPurchased, togglePurchased } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
const [product, setProduct] = useState<Product | null>(null);
  const [fav, setFav] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      fetchProductById(id).then((p: Product) => {
        setProduct(p);
        setFav(getFavorites().includes(p.id));
        setPurchased(getPurchased().includes(p.id));
      });
    });
  }, []);

if (!product) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-600">Loading product...</p>
    </div>
  );
}



function handleBuy() {
  if (!product) return;

  togglePurchased(product.id);
  setPurchased(true);
  setShowDialog(true);
  setTimeout(() => setShowDialog(false), 3000);
}

function handleFav() {
  if (!product) return;

  toggleFavorite(product.id);
  setFav(!fav);
}


  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-white dark:bg-gray-950 min-h-screen text-black dark:text-white transition">

<button
  onClick={() => router.back()}
  className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg
  bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
  hover:bg-gray-200 dark:hover:bg-gray-700 transition
  cursor-pointer"
>
  ← Back
</button>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-8 flex justify-center">
          <img src={product.image} className="h-80 object-contain" />
        </div>

        <div className="space-y-5">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-800">
            {product.category}
          </span>

          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

          <div className="flex items-center gap-4 pt-4">

            <button
  onClick={handleFav}
className={`px-5 py-3 rounded-lg transition-all duration-200
hover:scale-105 hover:shadow-md
cursor-pointer disabled:cursor-not-allowed
${fav
  ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}

>
  {fav ? "❤️ Favorited" : "🤍 Add Favorite"}
</button>

<button
  onClick={handleBuy}
  disabled={purchased}
className={`px-6 py-3 rounded-lg transition-all duration-200
hover:scale-105 hover:shadow-md
${purchased
  ? "bg-green-100 text-green-700 cursor-not-allowed"
  : "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 cursor-pointer"}`}

>
  {purchased ? "Purchased" : "Buy Now"}
</button>


          </div>
        </div>

      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center space-y-4 animate-bounce">
            <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
            <p>You have successfully purchased this product.</p>
          </div>
        </div>
      )}
    </div>
  );
}
