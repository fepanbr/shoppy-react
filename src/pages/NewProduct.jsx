import React, { useState } from "react";
import TextInput from "../components/ui/TextInput";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    options: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length === 0) return;
    setImageUrl(URL.createObjectURL(files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // validation 후 firebase로 업로드
    // validation 생략

    for (const key in form) {
      if (Object.hasOwnProperty.call(form, key)) {
        if (!form[key]) {
          return;
        }
      }
    }

    // TODO: firebase쓰기 추가
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h4 className="font-semibold text-3xl">새로운 제품 등록</h4>
      {imageUrl && <img className="w-72" src={imageUrl} alt="product" />}
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          className="border p-2"
          accept="image/*"
          onChange={handleFileChange}
          type="file"
          name="image"
          id=""
        />
        <TextInput
          value={form.name}
          onChange={handleInputChange}
          name="name"
          placeholder="제품명"
        />
        <TextInput
          value={form.price}
          onChange={handleInputChange}
          name="price"
          placeholder="가격"
        />
        <TextInput
          value={form.category}
          onChange={handleInputChange}
          name="category"
          placeholder="카테고리"
        />
        <TextInput
          value={form.description}
          onChange={handleInputChange}
          name="descripion"
          placeholder="제품설명"
        />
        <TextInput
          value={form.options}
          onChange={handleInputChange}
          name="options"
          placeholder=",로 구분하여 사이즈 입력 에) XS,S,M,L,XL"
        />
        <button type="submit">제품 등록하기</button>
      </form>
    </div>
  );
}
