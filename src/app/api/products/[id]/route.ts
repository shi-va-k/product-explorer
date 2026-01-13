import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
