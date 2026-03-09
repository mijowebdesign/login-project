import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


const DashboardCard: React.FC<{ title: string; category: string, organic?: boolean }> = ({ title, category, organic  }) => {
  return (
   <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 max-w-sm max-h-80">
      {/* 1. Link koji prekriva celu karticu */}
      <Link 
        to="/tvoja-destinacija" 
        className="absolute inset-0 z-10" 
        aria-label="Pogledaj detalje"
      >
        <span className="sr-only">Pogledaj detalje</span>
      </Link>

      {/* 2. Slika */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=500"
          alt="Opis slike"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 3. Sadržaj kartice */}
      <CardHeader>
        <CardAction>
             <Badge variant="secondary">{category}</Badge>
          {organic && <Badge className="bg-green-400" variant="outline">Organic</Badge>}
          
        </CardAction>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Ovo je primer klikabilne kartice koja koristi shadcn i Next.js Link. 
          Cela površina je interaktivna.
        </p>
      </CardContent>

     
    </Card>
  );
};

export default DashboardCard;