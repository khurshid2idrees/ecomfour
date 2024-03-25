import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
export default function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile/>
      </Navbar>
    </div>
  );
}
