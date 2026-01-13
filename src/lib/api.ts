import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch products exception:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch product exception:", error);
    return null;
  }
}
