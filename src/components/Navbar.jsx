import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "./ui/Button";
import User from "./User";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <AiOutlineShopping />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">products</Link>
        {user && <Link to="/cart">cart</Link>}
        {user?.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsPencilSquare />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button onClick={login} text="Login" />}
        {user && <Button onClick={logout} text="Logout" />}
      </nav>
    </header>
  );
}
