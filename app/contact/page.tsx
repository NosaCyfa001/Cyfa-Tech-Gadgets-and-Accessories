"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Cyfa Tech, my name is ${form.name || "a client"}.\nI’d like to work with you.${
      form.message ? `\n\nMessage: ${form.message}` : ""
    }`,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* HERO */}
      <div className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
          Get in Touch with{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">
            Cyfa Tech
          </span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-xl">
          Need help choosing the right gadget or accessory? Our team is ready to
          assist you with the latest tech solutions.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Info
            </h2>

            <div className="text-gray-600 text-base space-y-2">
              <p>📍 Lagos, Abuja (Nigeria)</p>
              <p>📧 cyfatechgadgets@gmail.com</p>
              <p>📱 +234 913 249 6929</p>
              <p>📱 +234 803 653 1186 </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What We Offer
            </h2>

            <ul className="text-gray-600 text-base space-y-2">
              <li>• Latest Smartphones & Accessories</li>
              <li>• High-Quality Audio Devices</li>
              <li>• Smartwatches & Wearables</li>
              <li>• Reliable Power & Charging Solutions</li>
              <li>• Gaming Gear & Tech Gadgets</li>
              <li>• Laptops for Work & Productivity</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-yellow-500 to-blue-500 text-white shadow-xl">
            <h2 className="text-2xl font-semibold mb-3">Cyfa Tech</h2>

            <p className="text-white/90 text-base leading-relaxed">
              Unlock the future with cutting-edge tech, gadgets & accessories
              for everyday life.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border p-4 rounded-md text-base focus:ring-2 focus:ring-black text-black outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Your email"
              className="w-full border p-4 rounded-md text-base focus:ring-2 focus:ring-black text-black outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <textarea
              placeholder="Your message"
              className="w-full border p-4 rounded-md text-base h-40 focus:ring-2 focus:ring-black text-black outline-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-white py-4 rounded-md text-base font-semibold hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {success && <p className="text-green-600 text-sm mt-3">{success}</p>}
        </div>
      </div>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/2349132496929?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
