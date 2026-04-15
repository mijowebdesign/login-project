import React, { useEffect } from "react";
import { SidebarFilters } from "@/components/app/SidebarFilters";
import DashboardCard from "@/components/app/ProductCard";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import type { Product } from "@/types/Products";
import { fetchProducts } from "@/state/product/productSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Dashboard: React.FC = () => {
  const { products, loading, currentPage, totalPages } = useAppSelector(
    (state) => state.product
  );

  const PRODUTS_PER_PAGE = 9;
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: PRODUTS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchProducts({ page, limit: PRODUTS_PER_PAGE }));
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-1 h-full min-h-screen">
       Dashboard
      </div>
    </>
  );
};

export default Dashboard;
