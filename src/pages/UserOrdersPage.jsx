import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";
import UserOrders from "../features/user/components/UserOrders";
export default function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrders/>
      </Navbar>
    </div>
  );
}
