import React, { useState } from "react";
import { useLocation } from "react-router";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";

export default function ProductDetail() {
  const { state: product } = useLocation();
  const { title, image, price, category, options, description, id } = product;
  const [selected, setSelected] = useState(options && options[0]);

  const { addOrUpdateItem } = useCarts();

  const [success, setSuccess] = useState("");

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = () => {
    const product = {
      id,
      image,
      title,
      option: selected,
      quantity: 1,
      price,
    };
    addOrUpdateItem.mutate(
      { product },
      {
        onSuccess: () => {
          setSuccess("장바구니에 추가되었습니다.");
          setTimeout(() => setSuccess(null), 3000);
        },
      }
    );
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2  border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dash border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="mr-2">{success}</p>}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
