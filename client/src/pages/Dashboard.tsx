import React from "react";
import { SidebarFilters } from "@/components/app/SidebarFilters";
import DashboardCard from "@/components/app/DashboardCard";
import { allProducts } from "@/fakeData/data";
import type { Product } from "@/types/Products";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-1 h-full">
        <SidebarFilters />

        <main className="flex-1 py-8 mb-4">
          <div className="flex flex-wrap  justify-start mb-4 gap-4">
          {allProducts.map((product: Product) => (
            <DashboardCard
              key={product.id}
              title={product.title}
              category={product.category}
              organic={product.organic}
            />
          ))}
           </div>
        </main>
       
      </div>
    </>
  );
};

export default Dashboard;
