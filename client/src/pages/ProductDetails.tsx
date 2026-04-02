import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/state/useAppDispatch';
import type { RootState } from '@/state/store';
import { fetchProductById, updateProduct, deleteProduct } from '@/state/product/productSlice';
import type { Product } from '@/types/Products';
import { Loader2, ChevronRight, Home } from 'lucide-react';
import ProductDetailsForm from '@/components/app/ProductDetailsForm';
import ProductDetailsView from '@/components/app/ProductDetailsView';
import { useAuth } from '@/context/AuthContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const canManageProducts = user && (user.role === 'admin' || user.role === 'manager');

  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.product);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async (data: Partial<Product>) => {
    if (id) {
      await dispatch(updateProduct({ id, data }));
      setIsEditing(false);
    }
  };

 const handleDelete = () => {
  if (id && window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Greška pri brisanju:', error);
      });
  }
};

  if (loading && !selectedProduct) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md max-w-7xl mx-auto m-6">
        Greška: {error}
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="p-4 text-gray-500 max-w-7xl mx-auto m-6">
        Proizvod nije pronađen.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 px-4 py-2">
        <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
          <Home className="w-4 h-4 mr-1" />
          Početna
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-gray-900 truncate max-w-[200px]">
          {selectedProduct.title || 'Detalji proizvoda'}
        </span>
      </nav>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-2 border-b">
            <img
              src={selectedProduct.imageUrl || 'https://via.placeholder.com/400'}
              alt={selectedProduct.title}
              className="w-full object-cover h-[300px] border rounded-sm p-3"
            />
          </div>
          <div className="md:w-2/3 p-8">
            {isEditing ? (
              <ProductDetailsForm
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
                loading={loading}
              />
            ) : (
              <ProductDetailsView
                product={selectedProduct}
                onEditClick={canManageProducts ? () => setIsEditing(true) : undefined}
                onDeleteClick={canManageProducts ? handleDelete : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
