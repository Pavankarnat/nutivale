"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const timelineSteps = [
  {
    phase: "01",
    title: "Grass-Fed Milking",
    subtitle: "Eco-Conscious Farms",
    description: "Our milk is sourced early morning from free-range cow and buffalo herds that graze on lush, certified natural pastures. No hormones are ever used.",
  },
  {
    phase: "02",
    title: "Cultured Curd Setting",
    subtitle: "Fermenting Whole Milk",
    description: "Warm whole milk is cultured slowly inside traditional porous clay pots. This ancient slow-setting process locks in natural probiotics and a rich texture.",
  },
  {
    phase: "03",
    title: "Vedic Bilona Churning",
    subtitle: "Wooden Hand Whisks",
    description: "Our team churns the set curd using bi-directional wooden whisks (traditional Bilona) to separate fresh white butter (makkhan) from the buttermilk.",
  },
  {
    phase: "04",
    title: "Woodfire Clarification",
    subtitle: "Pure Curd Ghee",
    description: "We heat the butter slowly in copper pots over dry woodfires. The water content evaporates, leaving golden-grained, aromatic ghee full of digestive nutrients.",
  },
];

const founders = [
  {
    name: "Vasimalli Raju",
    role: "Co-Founder & Sourcing Director",
    quote: "Dairy should be unadulterated. By establishing temperature-controlled direct routes from generational dairy farms, we guarantee raw freshness you can taste instantly in every glass.",
    signature: "V. Raju",
    initials: "VR",
  },
  {
    name: "Vasimalli Durga",
    role: "Co-Founder & Operations",
    quote: "We strive to preserve ancient wellness techniques. From setting curd in clay pots to churning butter with wooden shafts, we keep packaging plastic-free and carbon-neutral.",
    signature: "V. Durga",
    initials: "VD",
  },
];

export default function Story() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-green/5 to-transparent pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">
            Our Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-green max-w-4xl mx-auto leading-tight">
            From Farms to Table: The Nutivale Story
          </h1>
          <p className="text-base sm:text-lg text-brand-green/80 max-w-2xl mx-auto leading-relaxed">
            Reconnecting tables with clean, unprocessed dairy, raw milks, and curd-clarified ghee set in clay pots.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story copy */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-brand-green">
                Preserving Vedic Dairy Traditions
              </h2>
              <p className="text-sm sm:text-base text-brand-green/80 leading-relaxed font-sans">
                Most commercial dairy is homogenized and ultra-heat pasteurized, destroying original enzymes, vitamins, and natural gut bacteria. Furthermore, standard ghee is quickly extracted from industrial cream using high-pressure centrifuges.
              </p>
              <p className="text-sm text-brand-green/70 leading-relaxed font-sans">
                At Nutivale, we prioritize traditional methods. We partner with small farm cooperatives who pamper their cattle. Our buffalo and cow milk is packaged raw and delivered cold. Our ghee is crafted using the ancient Bilona method, churning curd directly to ensure premium digestibility and a rich, granular texture.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-brand-amber pl-4">
                  <h4 className="font-serif text-base font-bold text-brand-green">Zero Hormones</h4>
                  <p className="text-xs text-brand-green/60 mt-1">Our cattle are fed grass and natural fodder, ensuring milk completely free of artificial hormones.</p>
                </div>
                <div className="border-l-2 border-brand-amber pl-4">
                  <h4 className="font-serif text-base font-bold text-brand-green">Traditional Clay Pots</h4>
                  <p className="text-xs text-brand-green/60 mt-1">Our curd pot buffalo sets naturally inside clay vessels, providing mineral enrichment.</p>
                </div>
              </div>
            </div>

            {/* Side Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg border border-brand-green/5">
                <Image
                  src="/images/orchard.png"
                  alt="Dairy farm pasture"
                  fill
                  sizes="(max-w-7xl) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Timeline */}
      <section className="py-20 bg-brand-cream border-t border-b border-brand-green/10" id="farms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">Our Method</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-green">
              Orchard-to-Pantry Timeline
            </h2>
            <p className="text-sm text-brand-green/80">
              Tracing the clean journey of our raw milks, curd pots, and Vedic ghee from farms to your doorstep.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-green/5 p-8 rounded-2xl relative shadow-xs group hover:shadow-md transition-shadow"
              >
                <span className="absolute top-4 right-6 font-serif text-4xl font-extrabold text-brand-amber/15 group-hover:text-brand-amber/35 transition-colors">
                  {step.phase}
                </span>
                <div className="space-y-3 pt-4">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand-amber">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-green leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-green/70 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white" id="founders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-amber text-xs font-bold uppercase tracking-widest">The Founders</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-green">
              Behind the Brand
            </h2>
            <p className="text-sm text-brand-green/80">
              Meet Raju and Durga, who turned a passion for clean dairy into a premium quality standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-brand-cream border border-brand-green/5 p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <span className="text-5xl font-serif text-brand-amber/30 select-none absolute top-4 left-6">&ldquo;</span>
                  <p className="text-sm text-brand-green/80 italic leading-relaxed pt-4 font-sans relative z-10">
                    {founder.quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-brand-green/10">
                  <div className="w-12 h-12 bg-brand-green text-brand-cream font-serif font-bold text-base rounded-full flex items-center justify-center">
                    {founder.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-green">{founder.name}</h3>
                    <p className="text-[10px] text-brand-green/60 uppercase tracking-widest font-semibold">
                      {founder.role}
                    </p>
                    <p className="font-serif text-xs text-brand-amber/80 mt-1 italic font-semibold">
                      {founder.signature}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-brand-green text-brand-cream py-16 text-center border-t border-brand-green-light relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl mx-auto">
            Browse our dairy shop for raw milk, curd pots, fresh paneer, and curd-clarified Vedic cow and buffalo ghee.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block bg-brand-amber text-brand-slate px-8 py-4 rounded-full text-sm font-bold shadow-md hover:bg-brand-cream hover:text-brand-green hover:scale-102 transition-all font-sans uppercase tracking-wider"
            >
              Browse Dairy Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
