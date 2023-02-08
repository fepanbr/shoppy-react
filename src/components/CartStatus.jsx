import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import useCarts from "../hooks/useCarts";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCarts();
  return (
    <Link to="/cart" className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </Link>
  );
}
