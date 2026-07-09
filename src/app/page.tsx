"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Sizing & Pricing Map
const sizePrices: Record<string, Record<string, number>> = {
  "buffalo-milk": {
    "1/2 Ltr": 40,
    "1 Ltr": 90,
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
    "1/2 Ltr": 70,
    "1 Ltr": 130,
    "5 Ltr": 600,
  },
};

const bestsellers = [
  {
    id: "buffalo-milk",
    name: "Raw Buffalo Milk",
    rating: 4.9,
    reviews: 145,
    image: "/images/buffalo_milk.png",
    category: "Milk",
    description: "Rich, full-fat, and creamy raw buffalo milk directly from free-range herds.",
    sizes: ["1/2 Ltr", "1 Ltr"],
  },
  {
    id: "cow-milk",
    name: "Raw Cow Milk",
    rating: 4.8,
    reviews: 112,
    image: "/images/cow_milk.png",
    category: "Milk",
    description: "Pure, light, and easy-to-digest raw cow milk.",
    sizes: ["1/2 Ltr", "1 Ltr"],
  },
  {
    id: "cow-ghee",
    name: "Cow Ghee (Curd Clarified)",
    rating: 4.9,
    reviews: 215,
    image: "/images/cow_ghee.png?v=2",
    category: "Ghee",
    description: "Traditional Vedic Bilona cow ghee churned from cultured curd, not cream.",
    sizes: ["250 grms", "500 grms", "1 kg"],
  },
  {
    id: "paneer",
    name: "Fresh Handmade Paneer",
    rating: 4.8,
    reviews: 84,
    image: "/images/paneer.png",
    category: "Paneer",
    description: "Soft, spongy cottage cheese cubes pressed fresh using pure whole milk.",
    sizes: ["250 grms", "500 grms", "1 kg"],
  },
];

const promises = [
  {
    title: "100% Raw & Pure",
    description: "Untreated, unpasteurized, and completely natural whole milk with all enzymes and nutrients intact.",
    icon: (
      <svg className="w-6 h-6 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    title: "From Cultured Curd",
    description: "Our premium cow and buffalo ghee is churned using traditional Bilona methods directly from rich curd.",
    icon: (
      <svg className="w-6 h-6 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Clay Curd Pots",
    description: "Traditional buffalo curd set slowly in porous clay pots, lending a unique earthy aroma and thick texture.",
    icon: (
      <svg className="w-6 h-6 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Ethically Sourced",
    description: "Sourced directly from family farms who pamper grass-fed cows and buffaloes, ensuring zero hormones.",
    icon: (
      <svg className="w-6 h-6 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
];

interface Recipe {
  id: string;
  name: string;
  shortDesc: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    sugar: string;
    calcium: string;
  };
  tip: string;
  themeColor: string;
  themeBg: string;
  borderColor: string;
  image: string; // Dynamic path of generated recipe image
}

const recipesData: Recipe[] = [
  {
    id: "rice-pudding",
    name: "Classic Creamy Rice Pudding",
    shortDesc: "Make the ultimate comfort dessert with our easy creamy rice pudding recipe. Using fresh whole milk, this classic treat is thick, velvety, and delicious.",
    prepTime: "10 mins",
    cookTime: "35 mins",
    servings: 4,
    ingredients: [
      "1 litre whole buffalo/cow milk",
      "1/2 cup short-grain rice",
      "1/2 cup sugar",
      "1 tsp vanilla extract",
      "1/2 tsp cinnamon powder",
      "Pinch of salt",
      "Optional: raisins"
    ],
    instructions: [
      "Rinse rice thoroughly under cold water.",
      "Bring milk to a gentle simmer in a heavy-bottomed pan.",
      "Add rinsed rice and a pinch of salt.",
      "Cook on low heat for 30-35 minutes, stirring frequently to prevent sticking.",
      "Add sugar and vanilla extract. Stir well and cook for 2 more minutes.",
      "Sprinkle with cinnamon powder and add raisins if using. Serve warm or chilled."
    ],
    nutrition: {
      calories: "265 kcal",
      protein: "9 g",
      fat: "8 g",
      carbs: "39 g",
      sugar: "23 g",
      calcium: "310 mg"
    },
    tip: "Stir frequently to get a creamy texture and prevent rice from sticking to the bottom.",
    themeColor: "text-blue-900 border-blue-900",
    themeBg: "bg-blue-50/70 border-blue-100 text-blue-950",
    borderColor: "border-blue-200",
    image: "/images/recipe_rice_pudding.png"
  },
  {
    id: "paneer-recipe",
    name: "Fresh Homemade Paneer (Cottage Cheese)",
    shortDesc: "Learn how to make soft, fresh homemade paneer in just 20 minutes! This easy 2-ingredient recipe uses high-quality whole milk for the perfect cheese.",
    prepTime: "5 mins",
    cookTime: "15 mins",
    servings: 4,
    ingredients: [
      "2 litres fresh whole milk",
      "4 tbsp lemon juice or white vinegar"
    ],
    instructions: [
      "Boil the milk in a deep pan.",
      "Once it starts boiling, reduce heat and add lemon juice slowly while stirring gently.",
      "The milk will curdle and green whey will separate. Turn off the heat.",
      "Strain the curdled milk immediately through a muslin cloth or clean cheesecloth.",
      "Rinse the paneer under cold tap water to wash away the sour lemon flavor.",
      "Squeeze out excess moisture, tie the cloth tightly and hang it for 20-30 minutes.",
      "Cut into neat cubes and store in chilled water to keep it soft."
    ],
    nutrition: {
      calories: "210 kcal",
      protein: "15 g",
      fat: "16 g",
      carbs: "3 g",
      sugar: "0 g",
      calcium: "420 mg"
    },
    tip: "Use fresh full-fat milk for the best soft, fluffy, and creamy homemade paneer.",
    themeColor: "text-emerald-800 border-emerald-800",
    themeBg: "bg-emerald-50/70 border-emerald-100 text-emerald-950",
    borderColor: "border-emerald-200",
    image: "/images/recipe_paneer.png"
  },
  {
    id: "hot-chocolate",
    name: "Rich European-Style Hot Chocolate",
    shortDesc: "Ditch the powder! Discover how to make rich, European-style hot chocolate at home using real chocolate and fresh whole milk for a thick, cozy drink.",
    prepTime: "5 mins",
    cookTime: "8 mins",
    servings: 2,
    ingredients: [
      "2 cups whole raw milk",
      "100 g dark chocolate (chopped)",
      "1 tbsp cocoa powder",
      "1 tbsp sugar",
      "Pinch of salt",
      "1/2 tsp vanilla extract"
    ],
    instructions: [
      "Heat raw milk in a saucepan over medium heat.",
      "Add cocoa powder, sugar, and a pinch of salt. Whisk vigorously.",
      "Add chopped dark chocolate. Stir constantly until completely melted and glossy.",
      "Continue cooking on low heat until thick and velvety (do not let it boil).",
      "Remove from heat, stir in vanilla extract.",
      "Pour into thick mugs and serve immediately while hot!"
    ],
    nutrition: {
      calories: "360 kcal",
      protein: "9 g",
      fat: "22 g",
      carbs: "33 g",
      sugar: "27 g",
      calcium: "290 mg"
    },
    tip: "Use high-quality dark chocolate (60% or higher cacao) for the richest, deepest flavor.",
    themeColor: "text-rose-900 border-rose-900",
    themeBg: "bg-rose-50/70 border-rose-100 text-rose-950",
    borderColor: "border-rose-200",
    image: "/images/recipe_hot_chocolate.png"
  },
  {
    id: "milkshake",
    name: "The Perfect Vanilla Milkshake",
    shortDesc: "Blend up the perfect vanilla milkshake with just 3 ingredients. Our easy recipe uses premium whole milk and ice cream for a thick, classic diner treat.",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 2,
    ingredients: [
      "2 cups chilled whole milk",
      "3 large scoops premium vanilla ice cream",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Place chilled whole milk, vanilla ice cream, and vanilla extract into a blender.",
      "Blend on high speed until completely smooth, aerated, and thick.",
      "Pour into chilled tall diner glasses.",
      "Top with whipped cream or a cherry if desired, and serve immediately!"
    ],
    nutrition: {
      calories: "345 kcal",
      protein: "10 g",
      fat: "15 g",
      carbs: "44 g",
      sugar: "38 g",
      calcium: "330 mg"
    },
    tip: "For an extra thick milkshake, chill your glasses beforehand and add more ice cream instead of ice.",
    themeColor: "text-purple-950 border-purple-950",
    themeBg: "bg-purple-50/70 border-purple-100 text-purple-950",
    borderColor: "border-purple-200",
    image: "/images/buffalo_milk.png"
  },
  {
    id: "turmeric-milk",
    name: "Soothing Golden Turmeric Milk",
    shortDesc: "Relax with a warm mug of soothing golden turmeric milk. This easy, healthy recipe uses whole milk and earthy spices for the perfect bedtime wellness drink.",
    prepTime: "3 mins",
    cookTime: "7 mins",
    servings: 2,
    ingredients: [
      "2 cups fresh whole milk",
      "1/2 tsp turmeric powder",
      "1/4 tsp cinnamon powder",
      "Pinch of freshly ground black pepper",
      "1 tsp honey or jaggery (optional)"
    ],
    instructions: [
      "Heat whole milk in a small saucepan over medium heat.",
      "Whisk in turmeric powder, cinnamon, and black pepper.",
      "Let the mixture simmer gently for 5 minutes (do not boil).",
      "Remove from heat, let cool slightly, then stir in honey or jaggery.",
      "Pour into warm mugs, sprinkle extra cinnamon if desired, and enjoy."
    ],
    nutrition: {
      calories: "165 kcal",
      protein: "8 g",
      fat: "8 g",
      carbs: "14 g",
      sugar: "13 g",
      calcium: "300 mg"
    },
    tip: "Black pepper contains piperine, which dramatically helps your body absorb the healthy curcumin in turmeric.",
    themeColor: "text-amber-800 border-amber-800",
    themeBg: "bg-amber-50/70 border-amber-100 text-amber-950",
    borderColor: "border-amber-200",
    image: "/images/cow_milk.png"
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Keep track of chosen sizes for bestseller products on Home page
  const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({
    "buffalo-milk": "1 Ltr",
    "cow-milk": "1 Ltr",
    "cow-ghee": "500 grms",
    "paneer": "250 grms",
  });

  const handleSizeChange = (productId: string, size: string) => {
    setChosenSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-12 bg-gradient-to-b from-brand-green/5 to-transparent overflow-hidden">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-amber/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-block bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                Farm Fresh Dairy
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-green leading-tight">
                Pure, Raw Milk & Cultured Dairy
              </h1>
              <p className="text-base sm:text-lg text-brand-green/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Hand-delivered raw buffalo and cow milk, artisanal paneer, and rich ghee clarified directly from cultured curd. Wholesome goodness from happy cattle.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="bg-brand-green text-brand-cream px-8 py-4 rounded-full text-sm font-bold shadow-md hover:bg-brand-green-light hover:scale-102 transition-all font-sans uppercase tracking-wider text-center"
                >
                  Shop Fresh Dairy
                </Link>
                <a
                  href="#recipes"
                  className="border border-brand-green/30 text-brand-green px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-green/5 hover:border-brand-green transition-all font-sans uppercase tracking-wider text-center"
                >
                  Explore Recipes
                </a>
              </div>
              {/* Trust Badge Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-green/10 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <h4 className="text-2xl font-bold font-serif text-brand-green">100%</h4>
                  <p className="text-[10px] text-brand-green/60 uppercase tracking-wider font-semibold">Raw & Pure</p>
                </div>
                <div className="text-center lg:text-left">
                  <h4 className="text-2xl font-bold font-serif text-brand-green">Traditional</h4>
                  <p className="text-[10px] text-brand-green/60 uppercase tracking-wider font-semibold">Curd Ghee</p>
                </div>
                <div className="text-center lg:text-left">
                  <h4 className="text-2xl font-bold font-serif text-brand-green">Raw Milk</h4>
                  <p className="text-[10px] text-brand-green/60 uppercase tracking-wider font-semibold">Grass-Fed</p>
                </div>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square bg-gradient-to-tr from-brand-green/10 to-brand-sage/20 rounded-full p-6 shadow-inner">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-brand-green/5 shadow-xl bg-white">
                  <Image
                    src="/images/buffalo_milk.png"
                    alt="Nutivale Fresh Raw Milk Glass Bottle"
                    fill
                    priority
                    sizes="(max-w-7xl) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-brand-cream p-4 rounded-2xl shadow-lg border border-brand-green/10 flex items-center gap-3 animate-bounce duration-[5000ms]">
                  <div className="bg-brand-green/10 p-2 rounded-full text-brand-green">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-green">Chilled Delivery</p>
                    <p className="text-[10px] text-brand-green/60">Delivered within 4 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Our Roots Categories section right after hero page */}
      <section className="py-10 md:py-12 bg-brand-cream border-t border-brand-green/5" id="roots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-amber text-xs font-bold uppercase tracking-widest block mb-1">
            THE ESSENCE OF NATURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green mb-16 tracking-tight">
            Discover Our Roots
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-center max-w-5xl mx-auto">
            {/* Category circles */}
            {[
              {
                name: "Milk",
                subtext: "FARM FRESH",
                image: "/images/buffalo_milk.png",
                link: "/shop?category=milk",
              },
              {
                name: "Ghee",
                subtext: "HERITAGE GOLD",
                image: "/images/cow_ghee.png?v=2",
                link: "/shop?category=ghee",
              },
              {
                name: "Paneer",
                subtext: "ARTISANAL",
                image: "/images/paneer.png",
                link: "/shop?category=paneer",
              },
              {
                name: "Curd",
                subtext: "NATURAL PROBIOTIC",
                image: "/images/curd_pot.png",
                link: "/shop?category=curd",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.link}
                className="group flex flex-col items-center space-y-4 hover:scale-105 transition-all duration-300"
              >
                {/* Rounded frame exactly as requested */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-6 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300 bg-white">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-w-7xl) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-lg font-bold text-brand-green group-hover:text-brand-amber transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-brand-green/60 font-semibold tracking-wider uppercase mt-0.5">
                    {cat.subtext}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dairy Bestsellers Section */}
      <section className="py-12 md:py-16 bg-white" id="bestsellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-green">
                Our Dairy Best Sellers
              </h2>
              <p className="text-sm text-brand-green/70 max-w-xl">
                Rich, chemical-free dairy products prepared using traditional Vedic methods.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-brand-amber hover:text-brand-green transition-colors"
            >
              Browse Full Dairy Shop
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => {
              const currentSize = chosenSizes[product.id] || product.sizes[0];
              const currentPrice = sizePrices[product.id][currentSize];

              return (
                <div
                  key={product.id}
                  className="group bg-brand-cream border border-brand-green/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative w-full aspect-square bg-brand-cream-dark/60 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-w-7xl) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
                    />
                    <span className="absolute top-3 left-3 bg-brand-green text-brand-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <div className="flex text-brand-amber">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
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

                      {/* Size Selectors exactly as requested */}
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

                    {/* Pricing in Indian Rupees (₹) */}
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
        </div>
      </section>

      {/* Quality Promises */}
      <section className="py-12 md:py-16 bg-brand-cream border-t border-b border-brand-green/10" id="quality">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">Our Promise</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-green">
              Uncompromised Dairy Purity
            </h2>
            <p className="text-sm text-brand-green/80">
              Raw, whole milk processed with zero chemicals, packaged sanitarily, and chilled immediately for delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promises.map((promise, index) => (
              <div
                key={index}
                className="bg-white border border-brand-green/5 p-8 rounded-2xl shadow-xs text-center space-y-4 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-green/5 rounded-full flex items-center justify-center mx-auto mb-2 text-brand-amber">
                  {promise.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-green">{promise.title}</h3>
                <p className="text-xs text-brand-green/70 leading-relaxed font-sans">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="py-12 md:py-16 bg-white" id="recipes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">From Our Kitchen</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-green" id="recipes-headline">
              Homemade Milk Recipes
            </h2>
            <p className="text-sm text-brand-green/80">
              Transform our raw whole milk into these classic, wholesome treats. Click any recipe card below to see ingredients, step-by-step instructions, and complete nutrition values!
            </p>
          </div>

          {/* Recipes Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipesData.map((recipe, index) => (
              <article
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`bg-brand-cream/40 border ${recipe.borderColor} rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:scale-101 transition-all duration-300 group flex flex-col h-full`}
              >
                {/* Recipe Image Banner */}
                <div className="w-full aspect-video bg-brand-cream-dark flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold text-brand-amber">
                        Recipe #{index + 1}
                      </span>
                      <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {recipe.prepTime} Prep
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight text-brand-green group-hover:text-brand-amber transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-brand-green/75 leading-relaxed line-clamp-3">
                      {recipe.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-green/10 text-xs font-semibold text-brand-green">
                    <span>View Full Recipe</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Timeline Info */}
      <section className="py-12 md:py-16 bg-brand-green/5 border-t border-brand-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Dairy Story Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-brand-green/5">
                <Image
                  src="/images/orchard.png"
                  alt="Dairy farming landscape"
                  fill
                  sizes="(max-w-7xl) 100vw, 40vw"
                  className="object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-brand-amber text-brand-slate py-3 px-5 rounded-full text-xs font-bold shadow-md transform rotate-3 font-sans">
                Fresh & Raw
              </div>
            </div>

            {/* Dairy Story Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-amber text-xs font-bold uppercase tracking-widest block">Ethical Dairy</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green leading-tight">
                Cultured With Devotion, Delivered Fresh
              </h2>
              <p className="text-sm sm:text-base text-brand-green/80 leading-relaxed font-sans">
                We believe dairy should be unadulterated. Our cow and buffalo milk is pasteurization-free and delivered in temperature-controlled boxes straight to your door.
              </p>
              <p className="text-sm text-brand-green/70 leading-relaxed font-sans">
                Our ghee is made using the traditional Ayurvedic Bilona method: we first ferment the fresh milk into curd, churn the curd to separate the white butter (makkhan), and clarify the butter on slow woodfire. This method preserves nutrients, offering rich digestion benefits.
              </p>
              <div className="pt-4">
                <Link
                  href="/story"
                  className="bg-brand-green text-brand-cream px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:bg-brand-green-light transition-all font-sans uppercase tracking-wider"
                >
                  Read Our Sourcing Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-DETAIL RECIPE OVERLAY MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="recipe-modal">
          <div
            className="fixed inset-0 bg-brand-slate/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedRecipe(null)}
          />

          <div className="flex items-center justify-center min-h-screen p-4 md:p-10 relative">
            <div className="bg-white border border-brand-green/10 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fade-in relative z-10">
              
              {/* Modal Top Header Band */}
              <div className="bg-brand-green/5 border-b border-brand-green/10 px-6 md:px-8 py-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-amber">
                    Full Recipe Card
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-green mt-0.5">
                    {selectedRecipe.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-brand-green hover:text-brand-amber p-1.5 rounded-full hover:bg-brand-green/5 transition-all"
                  aria-label="Close Recipe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Recipe Modal Header Image */}
              <div className="w-full h-48 sm:h-64 bg-brand-cream-dark flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Core Contents */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Ingredients & Instructions */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Ingredients */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-brand-green border-b border-brand-green/10 pb-1">
                      Ingredients
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-brand-green/85 font-medium font-sans">
                          <span className="text-brand-amber mt-0.5">✔</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-brand-green border-b border-brand-green/10 pb-1">
                      Instructions
                    </h3>
                    <ol className="space-y-3.5">
                      {selectedRecipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-3 text-xs text-brand-green/80 leading-relaxed font-sans">
                          <span className="flex-shrink-0 w-5.5 h-5.5 rounded-full bg-brand-green text-brand-cream text-[10px] font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right Side: Information Panel & Nutrition Card */}
                <div className="lg:col-span-4 space-y-6 bg-brand-cream/40 border border-brand-green/5 p-5 rounded-2xl">
                  {/* Times Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center pb-4 border-b border-brand-green/10">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-brand-green/50 font-bold">Prep Time</p>
                      <p className="text-xs font-bold text-brand-green mt-1">{selectedRecipe.prepTime}</p>
                    </div>
                    <div className="border-l border-r border-brand-green/10">
                      <p className="text-[9px] uppercase tracking-wider text-brand-green/50 font-bold">Cook Time</p>
                      <p className="text-xs font-bold text-brand-green mt-1">{selectedRecipe.cookTime}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-brand-green/50 font-bold">Servings</p>
                      <p className="text-xs font-bold text-brand-green mt-1">{selectedRecipe.servings}</p>
                    </div>
                  </div>

                  {/* Nutrition Card */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green/50">
                      Nutrition (Per Serving)
                    </h4>
                    <div className="bg-white border border-brand-green/10 rounded-xl p-4 space-y-2.5 shadow-2xs">
                      {[
                        { label: "Calories", val: selectedRecipe.nutrition.calories },
                        { label: "Protein", val: selectedRecipe.nutrition.protein },
                        { label: "Fat", val: selectedRecipe.nutrition.fat },
                        { label: "Carbohydrates", val: selectedRecipe.nutrition.carbs },
                        { label: "Sugar", val: selectedRecipe.nutrition.sugar },
                        { label: "Calcium", val: selectedRecipe.nutrition.calcium },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs border-b border-brand-green/5 last:border-b-0 pb-1.5 last:pb-0 font-medium">
                          <span className="text-brand-green/70">{item.label}</span>
                          <span className="font-bold text-brand-green">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chef's Tip Banner */}
              <div className={`border-t border-brand-green/5 p-5 md:px-8 flex items-start gap-3 ${selectedRecipe.themeBg}`}>
                <span className="text-lg">💡</span>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider">Chef&apos;s Secret Tip</p>
                  <p className="text-xs leading-normal mt-0.5">{selectedRecipe.tip}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
