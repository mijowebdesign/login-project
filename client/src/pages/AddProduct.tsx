import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import AddProductForm from '@/components/app/AddProductForm';

const AddProduct: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 px-4 py-2">
        <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
          <Home className="w-4 h-4 mr-1" />
          Početna
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-gray-900">
          Novi proizvod
        </span>
      </nav>

      <AddProductForm />
    </div>
  );
};

export default AddProduct;
