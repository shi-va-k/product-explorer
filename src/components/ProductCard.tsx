import { Product } from "@/types/product";
import FavoriteToggle from "./FavoriteToggle";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
<div className="group border rounded-xl p-5 bg-white dark:bg-gray-900
text-black dark:text-white transition hover:shadow-lg flex flex-col mt-4">
      <Link href={`/products/${product.id}`}>
        <div className="h-40 flex justify-center items-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition"
          />
        </div>
      </Link>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {product.category}
      </p>

      <h3 className="font-semibold leading-tight line-clamp-2 mb-2">
        {product.title}
      </h3>
<div className="mt-auto pt-4 flex items-center justify-between">
  <span className="font-semibold text-lg">${product.price}</span>
  <FavoriteToggle id={product.id} />
</div>

    </div>
  );
}
