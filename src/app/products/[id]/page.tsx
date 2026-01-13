"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProductById } from "@/lib/api";
import {
  getFavorites,
  toggleFavorite,
  getPurchased,
  togglePurchased,
} from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [fav, setFav] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    params.then(async ({ id }) => {
      const data = await fetchProductById(id);
      setProduct(data);
      setFav(getFavorites().includes(data.id));
      setPurchased(getPurchased().includes(data.id));
    });
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading product...
        </div>
      </div>
    );
  }

const productId = product?.id;

function handleBuy() {
  if (!productId) return;

  togglePurchased(productId);
  setPurchased(true);
  setShowDialog(true);
  setTimeout(() => setShowDialog(false), 3000);
}

function handleFav() {
  if (!productId) return;

  toggleFavorite(productId);
  setFav(prev => !prev);
}




  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-white min-h-screen">

      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-xl p-8 flex justify-center">
          <img src={product.image} className="h-80 object-contain" />
        </div>

        <div className="space-y-5">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-200">
            {product.category}
          </span>

          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleFav}
              className={`px-5 py-3 rounded-lg transition hover:scale-105 ${
                fav
                  ? "bg-pink-100 text-pink-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {fav ? "❤️ Favorited" : "🤍 Add Favorite"}
            </button>

            <button
              onClick={handleBuy}
              disabled={purchased}
              className={`px-6 py-3 rounded-lg transition hover:scale-105 ${
                purchased
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              {purchased ? "Purchased" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-10 text-center space-y-4 animate-bounce">
            <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
            <p>You have successfully purchased this product.</p>
          </div>
        </div>
      )}
    </div>
  );
}
