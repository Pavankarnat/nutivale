"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCartOpen, setIsCartOpen]);

  const freeShippingThreshold = 500; // Unlocked at ₹500
  const shippingLeft = freeShippingThreshold - cartTotal;
  const shippingPercentage = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  const handleCheckout = () => {
    const phoneNumber = "919951978549"; // User WhatsApp number
    
    // Compile order message text
    let orderDetails = `*New Order from Nutivale website* 🌿\n\n`;
    cartItems.forEach((item, index) => {
      orderDetails += `${index + 1}. *${item.name}* (${item.size})\n`;
      orderDetails += `   Quantity: ${item.quantity} | Price: ₹${item.price} each\n`;
      orderDetails += `   Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    orderDetails += `-------------------------\n`;
    orderDetails += `*Total Order Value:* ₹${cartTotal.toFixed(2)}\n`;
    if (cartTotal >= freeShippingThreshold) {
      orderDetails += `*Shipping:* Free Shipping 🎉\n`;
    } else {
      orderDetails += `*Shipping:* Standard Delivery charges apply\n`;
    }
    orderDetails += `-------------------------\n\n`;
    orderDetails += `Please confirm my order. Thank you! 🙏`;

    // Encode text for URL redirection
    const encodedText = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-slate/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-brand-green/10 shadow-2xl flex flex-col animate-fade-in h-full">
          {/* Header */}
          <div className="px-4 sm:px-6 py-5 border-b border-brand-green/10 flex items-center justify-between">
            <h2 className="text-lg font-bold font-serif text-brand-green">Your Selection</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-brand-green hover:text-brand-amber p-1 transition-colors"
              id="btn-close-cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Shipping Progress bar */}
          <div className="px-4 sm:px-6 py-4 bg-brand-green/5 border-b border-brand-green/10">
            {shippingLeft > 0 ? (
              <p className="text-xs font-medium text-brand-green">
                Add <span className="font-bold text-brand-amber">₹{shippingLeft.toFixed(2)}</span> more to unlock <span className="underline">Free Shipping</span>!
              </p>
            ) : (
              <p className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-brand-amber">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Congratulations! You qualified for free shipping.
              </p>
            )}
            <div className="w-full bg-brand-green/10 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-brand-amber h-full transition-all duration-500 ease-out"
                style={{ width: `${shippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 divide-y divide-brand-green/10 bg-white/50">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-white overflow-hidden mb-2">
                  <Image
                    src="/images/buffalo_milk.png"
                    alt="Nutivale Branded Bottle"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-brand-green text-brand-cream px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-2 shadow-sm">
                  Made with Real Milk
                </div>
                <h3 className="text-base font-bold text-brand-green">Your cart is empty</h3>
                <p className="text-xs text-brand-green/70">
                  Fill it with our premium farm raw milk, ghee, paneer, and clay pot curd.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-brand-green text-brand-cream font-medium text-xs px-5 py-2.5 rounded-full hover:bg-brand-green-light transition-colors uppercase tracking-wider"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-5 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-brand-cream-dark rounded-lg overflow-hidden border border-brand-green/5 flex-shrink-0 flex items-center justify-center bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-sm font-bold text-brand-green">
                        <h4 className="font-serif leading-tight">{item.name}</h4>
                        <p className="font-sans ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      {/* Show Selected Size & Category */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[9px] bg-brand-green text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.size}
                        </span>
                        <span className="text-[9px] text-brand-green/60 uppercase tracking-widest font-semibold">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-brand-green/20 rounded-full bg-white/50 px-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-brand-green hover:text-brand-amber text-xs font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-bold text-brand-green w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-brand-green hover:text-brand-amber text-xs font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-medium text-brand-green/50 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-brand-green/10 py-6 px-4 sm:px-6 bg-brand-cream-dark/40 space-y-4">
              <div className="flex justify-between text-base font-bold text-brand-green">
                <p className="font-serif">Subtotal</p>
                <p className="font-sans">₹{cartTotal.toFixed(2)}</p>
              </div>
              <p className="text-[10px] text-brand-green/60 leading-normal">
                Shipping and taxes calculated at checkout. Hand-packed and delivered with temperature-controlled shipping.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-green text-brand-cream py-3.5 px-6 rounded-full font-semibold uppercase tracking-wider text-xs shadow-md hover:bg-brand-green-light transition-all hover:shadow-lg text-center cursor-pointer"
                  id="btn-checkout"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs font-semibold text-brand-green hover:underline py-2 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
