import React, { useEffect } from "react";
import { SidebarFilters } from "@/components/app/SidebarFilters";
import DashboardCard from "@/components/app/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/state/store";
import type { Product } from "@/types/Products";
import { fetchProducts } from "@/state/product/productSlice";

const Dashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-1 h-full">
        <SidebarFilters />

        <main className="flex-1 py-8 mb-4">
          <div className="flex flex-wrap  justify-start mb-4 gap-4">
          {products.map((product: Product) => (
            <DashboardCard
              key={product._id}
              id={product._id}
              title={product.title}
              category={product.category}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))}
           </div>
        </main>
       
      </div>
    </>
  );
};

export default Dashboard;
