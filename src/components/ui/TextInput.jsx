import React from "react";

export default function TextInput({ name, placeholder, value, onChange }) {
  return (
    <input
      className="border p-2"
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
