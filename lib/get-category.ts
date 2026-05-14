// /lib/get-category.ts
import Stripe from "stripe";

export const getCategory = (product: Stripe.Product) => {
  const name = product.name.toLowerCase();

  // 📱 SMARTPHONES
  if (
    name.includes("iphone") ||
    name.includes("samsung") ||
    name.includes("oppo") ||
    name.includes("reno")
  ) {
    return "smartphones";
  }

  // 💻 LAPTOPS / TABLETS
  if (
    name.includes("macbook") ||
    name.includes("hp") ||
    name.includes("laptop") ||
    name.includes("ipad")
  ) {
    return "laptops";
  }

  // 🎧 AUDIO
  if (
    name.includes("airpods") ||
    name.includes("earbuds") ||
    name.includes("speaker") ||
    name.includes("headset") ||
    name.includes("jbl") ||
    name.includes("harman")
  ) {
    return "audio";
  }

  // 🎮 GAMING
  if (
    name.includes("ps5") ||
    name.includes("playstation") ||
    name.includes("controller") ||
    name.includes("game") ||
    name.includes("fifa") ||
    name.includes("spiderman") ||
    name.includes("nba")
  ) {
    return "gaming";
  }

  // ⌚ WEARABLES / SMART TECH
  if (
    name.includes("watch") ||
    name.includes("airtag") ||
    name.includes("glasses")
  ) {
    return "accessories"; // or create "wearables" if you want
  }

  // 🌐 NETWORK
  if (name.includes("mifi")) {
    return "accessories";
  }

  // 🔌 DEFAULT
  return "accessories";
};