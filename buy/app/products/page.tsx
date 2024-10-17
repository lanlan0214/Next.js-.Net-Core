"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';
import Link from 'next/link'; 
import Image from 'next/image'; 

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5186/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">購買電腦</h1>
      <div className="flex justify-center space-x-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col items-center">
            {/* 設置圖片的固定大小並且在上方顯示 */}
            <div className="w-full h-48 mb-4 relative flex justify-center items-center">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={200}  // 固定寬度
                height={150} // 固定高度
                objectFit="contain"  // 確保圖片不會變形，根據容器自適應
                className="rounded-md" 
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{product.name}</h2>
            <p className="text-center">{product.description}</p>
            <p className="text-lg font-bold text-center">價格: {product.price}元</p>
            <Link href={`/order?productId=${product.id}`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                購買
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
