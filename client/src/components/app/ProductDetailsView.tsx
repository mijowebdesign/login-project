import React from 'react';
import type { Product } from '@/types/Products';
import { Tag, Euro, Trash2 } from 'lucide-react';

interface ProductDetailsViewProps {
  product: Product;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product, onEditClick, onDeleteClick }) => {
  return (
    <div className="md:w-2/3 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Detalji proizvoda</h1>
        <div className="flex space-x-2">
          {onEditClick && (
            <button
              onClick={onEditClick}
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Izmeni
            </button>
          )}
          {onDeleteClick && (
            <button
              onClick={onDeleteClick}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 " />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Naslov</label>
          <p className="text-gray-900 py-2">{product.title}</p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Opis</label>
          <p className="text-gray-900 py-2 whitespace-pre-wrap">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-1">
              <Tag className="w-4 h-4 mr-2" />
              Kategorija
            </label>
            <p className="text-gray-900 py-2">{product.category}</p>
          </div>
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-1">
              <Euro className="w-4 h-4 mr-2" />
              Cena
            </label>
            <p className="text-gray-900 py-2">{product.price} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
