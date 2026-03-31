import type{ Product } from "@/types/Products";

export const allProducts: Product[] = [
  {
    _id: "1",
    title: "Tikvice",
    description: "Sveže domaće tikvice sa ekoloških plantaža.",
    imageUrl: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=500",
    category: "Povrće",
    price: 200,
  },
  {
    _id: "2",
    title: "Jabuke",
    description: "Slatke i sočne crvene jabuke iz domaćih voćnjaka.",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=500",
    category: "Voće",
    price: 150,
  },
  {
    _id: "3",
    title: "Mleko",
    description: "Punomasno mleko sa pašnjaka zapadne Srbije.",
    imageUrl: "https://images.unsplash.com/photo-1550583726-2248277c2166?q=80&w=500",
    category: "Mlečni proizvodi",
    price: 300,
  },
];
