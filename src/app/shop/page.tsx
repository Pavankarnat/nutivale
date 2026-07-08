"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  organic: boolean;
  description: string;
  sizes: string[];
}

const sizePrices: Record<string, Record<string, number>> = {
  "buffalo-milk": {
    "1/2 Ltr": 40,
    "1 Ltr": 75,
  },
  "cow-milk": {
    "1/2 Ltr": 40,
    "1 Ltr": 75,
  },
  "buffalo-ghee": {
    "250 grms": 300,
    "500 grms": 550,
    "1 kg": 1000,
  },
  "cow-ghee": {
    "250 grms": 450,
    "500 grms": 800,
    "1 kg": 1500,
  },
  "paneer": {
    "250 grms": 150,
    "500 grms": 280,
    "1 kg": 540,
  },
  "curd-pot": {
    "1/2 Ltr": 60,
    "1 Ltr": 110,
    "5 Ltr": 500,
  },
};

const productsData: Product[] = [
  {
    id: "buffalo-milk",
    name: "Raw Buffalo Milk",
    rating: 4.9,
    reviews: 145,
    image: "/images/buffalo_milk.png",
    category: "milk",
    organic: true,
    description: "Farm fresh, rich, high-fat raw buffalo milk directly from free-range herds.",
    sizes: ["1/2 Ltr", "1 Ltr"],
  },
  {
    id: "cow-milk",
    name: "Raw Cow Milk",
    rating: 4.8,
    reviews: 112,
    image: "/images/cow_milk.png",
    category: "milk",
    organic: true,
    description: "Pure, light, and easy-to-digest raw cow milk.",
    sizes: ["1/2 Ltr", "1 Ltr"],
  },
  {
    id: "buffalo-ghee",
    name: "Buffalo Ghee (Curd Clarified)",
    rating: 4.8,
    reviews: 92,
    image: "/images/buffalo_ghee.png?v=2",
    category: "ghee",
    organic: true,
    description: "Rich, aromatic buffalo ghee, slow-clarified from cultured buffalo curd.",
    sizes: ["250 grms", "500 grms", "1 kg"],
  },
  {
    id: "cow-ghee",
    name: "Cow Ghee (Curd Clarified)",
    rating: 4.9,
    reviews: 215,
    image: "/images/cow_ghee.png?v=2",
    category: "ghee",
    organic: true,
    description: "Traditional Vedic Bilona cow ghee churned from cultured curd, not cream.",
    sizes: ["250 grms", "500 grms", "1 kg"],
  },
  {
    id: "paneer",
    name: "Fresh Handmade Paneer",
    rating: 4.8,
    reviews: 84,
    image: "/images/paneer.png",
    category: "paneer",
    organic: true,
    description: "Soft, spongy cottage cheese cubes pressed fresh using pure whole milk.",
    sizes: ["250 grms", "500 grms", "1 kg"],
  },
  {
    id: "curd-pot",
    name: "Curd Pot Buffalo",
    rating: 4.9,
    reviews: 138,
    image: "/images/curd_pot.png",
    category: "curd",
    organic: true,
    description: "Traditional buffalo curd set slowly in porous clay pots, thick and creamy.",
    sizes: ["1/2 Ltr", "1 Ltr", "5 Ltr"],
  },
];

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number>(1200);
  // Keep track of selected sizes for each product card in catalog
  const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({
    "buffalo-milk": "1 Ltr",
    "cow-milk": "1 Ltr",
    "buffalo-ghee": "500 grms",
    "cow-ghee": "500 grms",
    "paneer": "250 grms",
    "curd-pot": "1 Ltr",
  });

  const handleSizeChange = (productId: string, size: string) => {
    setChosenSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }
        // Price check based on chosen size
        const currentSize = chosenSizes[product.id] || product.sizes[0];
        const currentPrice = sizePrices[product.id][currentSize];
        if (currentPrice > priceRange) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const sizeA = chosenSizes[a.id] || a.sizes[0];
        const priceA = sizePrices[a.id][sizeA];
        const sizeB = chosenSizes[b.id] || b.sizes[0];
        const priceB = sizePrices[b.id][sizeB];

        if (sortBy === "price-low") {
          return priceA - priceB;
        }
        if (sortBy === "price-high") {
          return priceB - priceA;
        }
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        return a.id.localeCompare(b.id);
      });
  }, [selectedCategory, sortBy, priceRange, chosenSizes]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("featured");
    setPriceRange(1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-brand-green/5 to-transparent pt-28 pb-8 border-b border-brand-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">
            Dairy Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-green">
            Shop Fresh Dairy & Ghee
          </h1>
          <p className="text-sm text-brand-green/70 max-w-xl mx-auto">
            100% natural, chemical-free raw farm goods. Traditional curd-clarified ghee, clay pot curd, and fresh paneer.
          </p>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="py-8 flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 bg-brand-cream/60 border border-brand-green/5 p-6 rounded-2xl space-y-8 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-brand-green/10">
                <h2 className="text-base font-bold font-serif text-brand-green">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-brand-amber hover:text-brand-green transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green/60">
                  Categories
                </h3>
                <div className="flex flex-col space-y-2">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "milk", label: "Raw Milk" },
                    { id: "ghee", label: "Curd Ghee" },
                    { id: "paneer", label: "Fresh Paneer" },
                    { id: "curd", label: "Clay Curd Pots" },
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors font-medium ${
                        selectedCategory === category.id
                          ? "bg-brand-green text-brand-cream"
                          : "text-brand-green/80 hover:bg-brand-green/5 hover:text-brand-green"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range in Indian Rupees */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green/60">
                    Max Price
                  </h3>
                  <span className="text-sm font-bold text-brand-green">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="1200"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-brand-green bg-brand-green/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-green/50 font-bold">
                  <span>₹40</span>
                  <span>₹1,200</span>
                </div>
              </div>
            </aside>

            {/* Product Grid and Header */}
            <main className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-brand-green/5">
                <p className="text-sm text-brand-green/75 font-medium">
                  Showing <span className="font-bold text-brand-green">{filteredProducts.length}</span> of{" "}
                  <span className="font-bold text-brand-green">{productsData.length}</span> products
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-brand-green/60 uppercase tracking-wider">
                    Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-brand-cream border border-brand-green/15 text-brand-green text-xs font-semibold py-2 px-4 rounded-full outline-none focus:border-brand-amber cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Grid Layout */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-brand-cream/20 rounded-3xl border border-dashed border-brand-green/10 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-green">No products match filters</h3>
                  <p className="text-xs text-brand-green/60 max-w-xs mx-auto">
                    Try adjusting your price range slider or clearing category selection filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 bg-brand-green text-brand-cream font-medium text-xs px-5 py-2.5 rounded-full hover:bg-brand-green-light transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const currentSize = chosenSizes[product.id] || product.sizes[0];
                    const currentPrice = sizePrices[product.id][currentSize];

                    return (
                      <div
                        key={product.id}
                        className="group bg-brand-cream border border-brand-green/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                      >
                        {/* Product Image */}
                        <div className="relative w-full aspect-square bg-brand-cream-dark/60 flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-w-7xl) 100vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            <span className="bg-brand-green text-brand-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-center">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Product Detail */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1">
                              <div className="flex text-brand-amber">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-xs">★</span>
                                ))}
                              </div>
                              <span className="text-[10px] text-brand-green/60 font-semibold mt-0.5">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>

                            <h3 className="font-serif text-lg font-bold text-brand-green leading-snug group-hover:text-brand-amber transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs text-brand-green/70 leading-normal line-clamp-2">
                              {product.description}
                            </p>

                            {/* Size Selection pills */}
                            <div className="pt-2">
                              <p className="text-[9px] uppercase tracking-wider text-brand-green/50 font-bold mb-1.5">
                                Select Size
                              </p>
                              <div className="flex gap-1.5 flex-wrap">
                                {product.sizes.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => handleSizeChange(product.id, size)}
                                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-bold ${
                                      currentSize === size
                                        ? "bg-brand-green border-brand-green text-brand-cream shadow-sm"
                                        : "bg-white border-brand-green/15 text-brand-green hover:border-brand-green"
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-brand-green/5">
                            <p className="text-lg font-bold text-brand-green">₹{currentPrice}</p>
                            <button
                              onClick={() =>
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: currentPrice,
                                  image: product.image,
                                  category: product.category,
                                  size: currentSize,
                                })
                              }
                              className="bg-brand-green text-brand-cream px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-brand-green-light transition-all cursor-pointer font-sans uppercase tracking-wider"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
