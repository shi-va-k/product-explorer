import { fetchProducts } from "@/lib/api";
import Dashboard from "./ui";

export default async function Home() {
  const products = await fetchProducts();
  return <Dashboard products={products} />;
}
