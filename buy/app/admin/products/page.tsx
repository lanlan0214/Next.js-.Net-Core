"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'; 
import { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', description: '', price: 0, imageUrl: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5186/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    // 檢查必填欄位是否為空
    if (
      (editingProduct ? editingProduct.name : newProduct.name).trim() === '' ||
      (editingProduct ? editingProduct.description : newProduct.description).trim() === '' ||
      (editingProduct ? editingProduct.price : newProduct.price) <= 0
    ) {
      alert('產品名稱、描述和價格不能為空，且價格必須大於0');
      return; // 如果有未填寫的欄位，阻止提交
    }
  
    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`http://localhost:5186/api/products/${editingProduct.id}`, editingProduct);
      } else {
        // Create new product
        await axios.post('http://localhost:5186/api/products', newProduct);
      }
      fetchProducts();
      setNewProduct({ id: 0, name: '', description: '', price: 0, imageUrl: '' });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };
  

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5186/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">產品管理</h1>

      <div className="mb-6">
        <h2>{editingProduct ? '編輯產品' : '新增產品'}</h2>
        <input
          type="text"
          placeholder="產品名稱"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="產品描述"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, description: e.target.value })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="價格"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
              : setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
          className="w-full mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="圖片連結"
          value={editingProduct ? editingProduct.imageUrl : newProduct.imageUrl}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
              : setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
          className="w-full mb-4 p-2 border"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingProduct ? '更新產品' : '新增產品'}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">產品列表</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} className="mb-4 p-4 border rounded shadow">
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}元</p>
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              width={80}  // 設定圖片的寬度，根據需要調整
              height={80} // 設定圖片的高度，根據需要調整
              className="object-cover" 
            />
            <button
              onClick={() => handleEdit(product)}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              編輯
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
