"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Instagram, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setFormStatus("submitting");
    
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          service: formData.service,
          message: formData.message,
          source: "website",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit booking");
      
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", date: "", service: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 sm:pt-32 bg-brand-champagne relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-1/4 w-150 h-150 bg-brand-blush/20 rounded-full blur-[150px] -translate-y-1/2 mix-blend-multiply z-0 hidden sm:block"></div>
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-brand-cocoa/10 rounded-full blur-2xl z-0 hidden sm:block"></div>

      {/* Header */}
      <section className="pb-12 sm:pb-16 text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-sm font-sans tracking-[0.3em] text-brand-cocoa uppercase font-extrabold mb-3 sm:mb-4">Inquire</h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso mb-6 sm:mb-8">
          Let's Create Your <span className="text-brand-cocoa">Perfect Look</span>
        </h2>
        <p className="text-brand-espresso/80 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          For bookings, editorial inquiries, and bridal availability, please fill out the form below. I aim to respond to all inquiries within 48 hours.
        </p>
      </section>

      {/* Main Content */}
      <section className="pb-20 sm:pb-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="space-y-12 flex flex-col justify-center">
            <div className="bg-white/40 backdrop-blur-3xl p-10 border-2 border-white rounded-[3rem] shadow-[0_20px_60px_rgb(255,66,161,0.1)] transition-transform hover:-translate-y-2 duration-500">
              <h3 className="text-3xl font-serif text-brand-espresso mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-brand-blush/20 mr-6 group-hover:scale-110 transition-transform">
                    <Phone className="text-brand-cocoa" size={20} />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-brand-cocoa font-bold text-xs uppercase tracking-widest mb-1">Phone / WhatsApp</h4>
                    <p className="text-brand-espresso font-medium">+234 (0) 902 556 7874</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-brand-blush/20 mr-6 group-hover:scale-110 transition-transform">
                    <MapPin className="text-brand-cocoa" size={20} />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-brand-cocoa font-bold text-xs uppercase tracking-widest mb-1">Service Area</h4>
                    <p className="text-brand-espresso font-medium">Abuja, Nigeria.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 p-10 bg-brand-blush/10 rounded-[3rem] border border-white/50 text-center shadow-lg shadow-brand-blush/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-3xl font-serif text-brand-espresso relative z-10">Follow the Glam</h3>
              <p className="text-brand-espresso/80 font-medium relative z-10">Stay updated with my latest work, behind-the-scenes, and beauty tips.</p>
              <a href="https://www.instagram.com/mua.chii?igsh=MWQ3M2podGFiNmlscQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="inline-flex relative z-10 items-center px-10 py-5 bg-white text-brand-cocoa font-bold text-sm uppercase tracking-widest rounded-full hover:bg-brand-cocoa hover:text-white transition-all shadow-xl shadow-brand-blush/20 hover:scale-105">
                <Instagram size={20} className="mr-3" /> @mua.chii
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 shadow-[0_20px_60px_rgb(255,20,147,0.1)] rounded-[3rem] border-4 border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-nude/40 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            
            {formStatus === "success" ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6 py-20 relative z-10">
                <div className="w-24 h-24 bg-brand-blush/20 rounded-full flex items-center justify-center text-brand-cocoa mb-4">
                  <CheckCircle2 size={48} className="text-brand-blush" />
                </div>
                <h3 className="text-4xl font-serif text-brand-espresso">Fabulous!</h3>
                <p className="text-brand-espresso/80 font-medium text-lg w-4/5 mx-auto">
                  Your inquiry has been saved! Our glam team will contact you within 48 hours to confirm your session.
                </p>
                <button 
                  onClick={() => {
                    setFormStatus("idle");
                    setAgreed(false);
                    setFormData({ name: "", email: "", phone: "", date: "", service: "", message: "" });
                  }}
                  className="mt-8 px-8 py-4 bg-white border-2 border-brand-nude text-brand-cocoa text-sm uppercase tracking-widest font-bold rounded-full hover:border-brand-cocoa hover:bg-brand-cocoa hover:text-white transition-all shadow-lg"
                >
                  Send another message
                </button>
              </div>
            ) : formStatus === "error" ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6 py-20 relative z-10">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                  <Mail size={48} />
                </div>
                <h3 className="text-4xl font-serif text-brand-espresso">Oops!</h3>
                <p className="text-brand-espresso/80 font-medium text-lg w-4/5 mx-auto">
                  Something went wrong. Please try again or contact us directly at hello@muachii.com
                </p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 px-8 py-4 bg-white border-2 border-brand-nude text-brand-cocoa text-sm uppercase tracking-widest font-bold rounded-full hover:border-brand-cocoa hover:bg-brand-cocoa hover:text-white transition-all shadow-lg"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="text-3xl font-serif text-brand-espresso mb-8">Secure Your Date</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <input required type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all placeholder:text-brand-cocoa/50 font-medium text-brand-espresso" />
                  </div>
                  <div className="space-y-2">
                     <input required type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all placeholder:text-brand-cocoa/50 font-medium text-brand-espresso" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all placeholder:text-brand-cocoa/50 font-medium text-brand-espresso" />
                  </div>
                  <div className="space-y-2">
                     <input type="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all text-brand-espresso font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <select id="service" value={formData.service} onChange={handleChange} className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all font-medium text-brand-espresso cursor-pointer appearance-none">
                    <option value="" className="text-brand-cocoa/50">Select a glam service...</option>
                    <option value="bridal">Bridal Glam</option>
                    <option value="soft-glam">Soft Glam</option>
                    <option value="editorial">Editorial / Photoshoot</option>
                    <option value="event">Event / Group Glam</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <textarea required id="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell me about your event and desired look..." className="w-full bg-brand-nude/20 border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.2)] transition-all resize-none placeholder:text-brand-cocoa/50 font-medium text-brand-espresso"></textarea>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <input
                    type="checkbox"
                    id="policy"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 rounded text-brand-cocoa bg-white border-brand-blush focus:ring-brand-blush checked:bg-brand-cocoa transition-colors cursor-pointer accent-brand-cocoa"
                  />
                  <label htmlFor="policy" className="text-sm font-medium text-brand-espresso cursor-pointer">
                    I have read and agree to the <Link href="/policies" className="text-brand-cocoa underline hover:text-brand-blush">booking policies</Link>.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting" || !agreed}
                  className="w-full py-5 mt-2 bg-brand-cocoa text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:bg-brand-blush hover:text-brand-espresso hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgb(230,0,126,0.3)] hover:shadow-[0_15px_40px_rgb(255,105,180,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {formStatus === "submitting" ? "Securing Your Glam..." : "Reserve Your Glam"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
