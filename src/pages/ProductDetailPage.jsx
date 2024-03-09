import React from "react";
import Navbar from "../features/navbar/Navbar";
import Product from "../features/product-list/components/Product";
import ProductDetails from "../features/product-list/components/ProductDetails";
export default function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
}
