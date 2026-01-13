"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { getFavorites } from "@/lib/storage";
import Logo from "@/components/Logo";

export default function Dashboard({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showFav, setShowFav] = useState(false);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [usePagination, setUsePagination] = useState(true);

  const favorites = getFavorites();

  const categories = [...new Set(products.map(p => p.category))];

  let filtered = products.filter(p => {
    if (showFav && !favorites.includes(p.id)) return false;
    if (category && p.category !== category) return false;
    return p.title.toLowerCase().includes(search.toLowerCase());
  });

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  const displayedProducts = usePagination
  ? filtered.slice((page - 1) * pageSize, page * pageSize)
  : filtered;
  const isSearching = search.trim().length > 0;


  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
   <div className="w-full min-h-screen bg-gray-50">
<div className="w-full bg-white shadow-sm px-8 py-5 flex flex-col gap-4
md:flex-row md:items-center md:justify-between sticky top-0 z-10">
  <Logo />

        <SearchBar value={search} onChange={setSearch} />

        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />

        <select
         className="border p-2 rounded-lg
transition-all duration-200
focus:ring-2 focus:ring-black/20 focus:outline-none
hover:shadow-sm"
          value={sort}
          onChange={e => setSort(e.target.value)}
          aria-label="Sort by price"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

<button
  className={`px-4 py-2 rounded-lg transition-all duration-200
  hover:scale-105 hover:shadow-md cursor-pointer
  ${showFav
    ? "bg-black text-white hover:bg-gray-900"
    : "bg-white border text-gray-700 hover:bg-gray-100"}`}
  onClick={() => {
    setShowFav(prev => !prev);
    setPage(1);
  }}
>
  {showFav ? "Showing Favorites" : "Showing All"}
</button>



      </div>

  <div className="max-w-7xl mx-auto px-4">

  {displayedProducts.length === 0 ? (
  <div className="text-center py-20 text-gray-500">
    <p className="text-xl">No products found for</p>
    <p className="font-semibold mt-1">"{search}"</p>
  </div>
) : (
  <>
   <ProductGrid products={displayedProducts} />
   
  <div className="flex justify-center items-center gap-4 my-6">


  <button
    className="border px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
    onClick={() => setPage(p => Math.max(1, p - 1))}
    disabled={!usePagination || filtered.length === 0 || page === 1}
  >
    Prev
  </button>

  <input
    type="number"
    min={1}
    className="border w-16 text-center py-2 rounded"
    value={pageSize}
    onChange={(e) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    }}
    aria-label="Items per page"
  />

  <button
    className="border px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
    disabled={!usePagination || filtered.length === 0 || page >= totalPages}
  >
    Next
  </button>

      </div>
  </>
 
)}
</div>

    </div>
  );
}
