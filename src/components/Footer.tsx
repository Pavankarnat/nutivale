"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-green text-brand-cream border-t border-brand-green-light">
      {/* Top Banner: Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-brand-cream/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              Join the Nutivale Family
            </h3>
            <p className="text-sm text-brand-cream/70 max-w-xl">
              Subscribe to receive recipe ideas, exclusive seasonal offers, and 15% off your first purchase.
            </p>
          </div>
          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-brand-cream/10 border border-brand-cream/20 text-brand-cream px-4 py-3 rounded-full text-center text-sm font-semibold">
                Welcome to the family! Check your inbox for your 15% discount.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-brand-cream placeholder-brand-cream/50 px-5 py-3 rounded-full text-sm outline-none focus:border-brand-amber transition-colors focus:ring-1 focus:ring-brand-amber"
                />
                <button
                  type="submit"
                  className="bg-brand-amber text-brand-slate px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-cream hover:text-brand-green transition-all duration-300 font-sans uppercase tracking-wider text-center"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="font-serif text-3xl font-bold tracking-wide">
              Nutivale
            </Link>
            <p className="text-sm text-brand-cream/70 leading-relaxed max-w-sm">
              Delivering the purest farm-fresh raw milk, curd-clarified Vedic ghee, handmade paneer, and clay pot curd directly to your home.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {["instagram", "pinterest", "facebook", "twitter"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/nutivale.farms`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-brand-cream/20 flex items-center justify-center text-brand-cream hover:bg-brand-amber hover:text-brand-slate hover:border-brand-amber transition-all duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    {social.substring(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cream/60">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <Link href="/shop?category=milk" className="hover:text-brand-amber transition-colors">
                  Raw Milk
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ghee" className="hover:text-brand-amber transition-colors">
                  Curd Clarified Ghee
                </Link>
              </li>
              <li>
                <Link href="/shop?category=paneer" className="hover:text-brand-amber transition-colors">
                  Fresh Paneer
                </Link>
              </li>
              <li>
                <Link href="/shop?category=curd" className="hover:text-brand-amber transition-colors">
                  Clay Curd Pots
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cream/60">
              Our Journey
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <Link href="/story" className="hover:text-brand-amber transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/story#farms" className="hover:text-brand-amber transition-colors">
                  Sourcing Standards
                </Link>
              </li>
              <li>
                <Link href="/story#founders" className="hover:text-brand-amber transition-colors">
                  Founders
                </Link>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Careers</span>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cream/60">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <span className="opacity-50 cursor-not-allowed">FAQ & Support</span>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Shipping & Deliveries</span>
              </li>
              <li>
                <span className="opacity-50 cursor-not-allowed">Refund & Returns Policy</span>
              </li>
              <li>
                <a href="mailto:support@nutivale" className="hover:text-brand-amber transition-colors">
                  Email: support@nutivale
                </a>
              </li>
              <li>
                <a href="tel:+919951978549" className="hover:text-brand-amber transition-colors">
                  Call: +91 99519 78549
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between text-xs text-brand-cream/60 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <p>© {new Date().getFullYear()} Nutivale Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-amber"></span>
              <span className="font-medium text-brand-cream/80">FSSAI License No. 10125019000269</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <span className="opacity-50">Privacy Policy</span>
            <span className="opacity-50">Terms of Service</span>
            <span className="opacity-50">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
