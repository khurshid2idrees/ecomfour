import React from "react";
import Navbar from "../features/navbar/Navbar";
import Product from "../features/product/components/Product";
import ProductDetails from "../features/product/components/ProductDetails";
import AdminProductDetails from "../features/admin/components/AdminProductDetails";
export default function AdminProductDetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetails></AdminProductDetails>
      </Navbar>
    </div>
  );
}
