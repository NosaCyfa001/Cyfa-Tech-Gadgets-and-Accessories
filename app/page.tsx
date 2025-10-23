import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripe } from "@/lib/stripe";
import {
  Zap,
  Smartphone,
  Headphones,
  Watch,
  Battery,
  Gamepad,
  Laptop,
  Shield,
  Truck,
  ArrowRight,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";
import TestimonialsSlider from "@/components/testimonialsSlider";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products Available" },
    { number: "24/7", label: "Customer Support" },
    { number: "99.8%", label: "Satisfaction Rate" },
  ];

  const productCategories = [
    { icon: <Smartphone className="w-6 h-6" />, name: "Smartphones" },
    { icon: <Headphones className="w-6 h-6" />, name: "Audio" },
    { icon: <Watch className="w-6 h-6" />, name: "Smartwatches" },
    { icon: <Battery className="w-6 h-6" />, name: "Power Banks" },
    { icon: <Gamepad className="w-6 h-6" />, name: "Games" },
    { icon: <Laptop className="w-6 h-6" />, name: "Laptops" },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Secure Payment",
      description: "Your transactions are protected with advanced encryption",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Free shipping on orders above ₦500,000 within Nigeria",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Quality Guarantee",
      description: "1-year warranty on all electronics and gadgets",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Expert Support",
      description: "Get help from our tech specialists anytime",
    },
  ];

  const faqs = [
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, we provide 1-year warranty on all electronic products and 6 months on accessories.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major cards, bank transfers, and mobile money payments including Paystack.",
    },
    {
      question: "How fast is delivery?",
      answer:
        "Lagos deliveries within 24 hours. Other states 2-3 working days.",
    },
    {
      question: "Can I return products?",
      answer:
        "Yes, 14-day return policy for unopened items in original packaging.",
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center cursor-pointer gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-yellow-500" />
            Powering Your Digital Life
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">
              Cyfa Tech
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Unlock the future with cutting-edge tech, gadgets & accessories for
            everyday life.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                {category.icon}
                <span className="text-gray-700 font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/products"}
              className="flex items-center justify-center"
            >
              <Button className="text-white px-8 py-3 rounded-full font-semibold hover:text-gray-300 transition-colors duration-300 flex items-center justify-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href={"/about"} className="flex items-center justify-center">
              <Button className="text-white px-8 py-3 rounded-full font-semibold hover:text-gray-300 transition-colors duration-300 flex items-center justify-center gap-2">
                Learn More <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-gray-800">
              <h2 className="text-3xl font-bold">{stat.number}</h2>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
            Featured Products
          </h2>
          <p className="text-gray-600 text-center">
            Discover our most popular tech items
          </p>
        </div>
        <Carousel products={products.data} />
      </section>

      {/* Features Section with Animated Icons */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">
            Why Choose Cyfa Tech?
          </h2>
          <p className="text-gray-600 text-center mb-12">
            We make tech shopping simple and reliable
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {/* Option 1: Bounce Animation */}
                    <div className="animate-bounce hover:animate-pulse transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialsSlider />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-blue-400 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Experience the future of tech today — add your favorites to your
              cart and head to checkout to make them yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={"/checkout"}
                className="flex items-center justify-center"
              >
                <Button className="text-white hover:text-gray-300 px-8 py-3 rounded-full font-semibold  transition-colors duration-300 flex items-center justify-center gap-2">
                  Go to Checkout <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
