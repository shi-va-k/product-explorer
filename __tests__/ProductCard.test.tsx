import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

test("renders product title", () => {
  render(
    <ProductCard
      product={{
        id: 1,
        title: "Test Product",
        price: 10,
        description: "",
        category: "",
        image: ""
      }}
    />
  );

  expect(screen.getByText("Test Product")).toBeInTheDocument();
});
