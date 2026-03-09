export interface Product {
    id: number;
    title: string;
    category: string;
    company: string;
    organic?: boolean;
    region?: string;
    price: string;
    currency: string;
}