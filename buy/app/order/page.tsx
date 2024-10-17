"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types'; 
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; 

const OrderForm: React.FC = () => {
  const searchParams = useSearchParams(); // 取得查詢參數
  const productId = searchParams.get('productId'); // 從查詢參數中獲取 productId

  const [order, setOrder] = useState({ productId: Number(productId) || 0, quantity: 1 });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 用來存儲選中的產品

  useEffect(() => {
    axios.get('http://localhost:5186/api/products')
      .then(response => {
        setProducts(response.data);
        const foundProduct = response.data.find((product: Product) => product.id === Number(productId));
        if (foundProduct) setSelectedProduct(foundProduct); // 如果 URL 有指定 productId，就找到對應產品
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5186/api/orders', order);
      alert(`訂單提交成功！訂購產品 ID: ${response.data.productId}`);
    } catch (error) {
      console.error('提交訂單錯誤：', error);
      alert('提交失敗');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      {/* 顯示選中產品的圖片 */}
      {selectedProduct && (
        <div className="mb-4 flex justify-center">
          <Image 
            src={selectedProduct.imageUrl} 
            alt={selectedProduct.name} 
            width={300} 
            height={200} 
            objectFit="cover" 
            className="rounded-md"
          />
        </div>
      )}

      <label className="block mb-4">
        選擇產品:
        <select
          value={order.productId}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            setOrder({ ...order, productId: selectedId });
            const selected = products.find((product) => product.id === selectedId);
            setSelectedProduct(selected || null); // 更新選中的產品
          }}
          className="w-full p-2 mt-2 border rounded"
        >
          <option value="">請選擇產品</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.price}元
            </option>
          ))}
        </select>
      </label>
      
      <label className="block mb-4">
        數量:
        <input
          type="number"
          value={order.quantity}
          onChange={(e) => setOrder({ ...order, quantity: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </label>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        提交訂單
      </button>
    </form>
  );
};

export default OrderForm;
