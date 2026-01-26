/**
 * Professional Business Website Templates
 * Built for React + Tailwind CSS
 * All templates support contenteditable for easy customization
 */

// ============================================================================
// TYPES
// ============================================================================

export interface TemplateComponent {
  id: string;
  name: string;
  render: () => string; // Returns HTML string with Tailwind classes
}

export interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  components: TemplateComponent[];
  defaultColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  defaultFont: string;
  previewImage: string;
  features: string[]; // For backward compatibility
  icon: string; // For backward compatibility with TemplateCard
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const editable = (text: string, className: string = ""): string => {
  return `<span contenteditable="true" class="${className}" style="outline: 2px dashed rgba(0,0,0,0.1) transparent; min-width: 10px; min-height: 1em; display: inline-block;">${text}</span>`;
};

const editableBlock = (html: string, className: string = ""): string => {
  return `<div contenteditable="true" class="${className}" style="outline: 2px dashed rgba(0,0,0,0.1) transparent; min-height: 1em;">${html}</div>`;
};

// ============================================================================
// TEMPLATE 1: RESTAURANT
// ============================================================================

const restaurantComponents: TemplateComponent[] = [
  {
    id: "hero",
    name: "Hero Section",
    render: () => `
      <section class="relative bg-gradient-to-br from-orange-50 to-amber-100 py-20 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                ${editable("Welcome to")}
              </h1>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-600 mb-6">
                ${editable("La Bella Cucina")}
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                ${editable("Authentic Italian cuisine made with love and the finest ingredients")}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" class="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-lg">
                  ${editable("Make Reservation")}
                </a>
                <a href="#menu" class="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors">
                  ${editable("View Menu")}
                </a>
              </div>
            </div>
            <div class="relative">
              <img src="https://placehold.co/600x400/orange/white?text=Delicious+Food" alt="Restaurant Food" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-2">
                    <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4.9</div>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">${editable("500+ Reviews")}</p>
                    <p class="text-sm text-gray-500">${editable("5-Star Rated")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "menu",
    name: "Menu Section",
    render: () => `
      <section id="menu" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Our Menu")}</h2>
            <p class="text-xl text-gray-600">${editable("Discover our signature dishes")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${[
              {
                name: "Margherita Pizza",
                desc: "Fresh mozzarella, tomatoes, basil",
                price: "$18",
                image: "https://placehold.co/400x300/orange/white?text=Pizza",
              },
              {
                name: "Spaghetti Carbonara",
                desc: "Guanciale, pecorino, egg, black pepper",
                price: "$22",
                image: "https://placehold.co/400x300/amber/white?text=Pasta",
              },
              {
                name: "Osso Buco",
                desc: "Braised veal shanks with gremolata",
                price: "$32",
                image: "https://placehold.co/400x300/red/white?text=Osso+Buco",
              },
              {
                name: "Tiramisu",
                desc: "Classic Italian dessert",
                price: "$12",
                image: "https://placehold.co/400x300/pink/white?text=Tiramisu",
              },
              {
                name: "Bruschetta",
                desc: "Grilled bread, tomatoes, garlic, basil",
                price: "$9",
                image:
                  "https://placehold.co/400x300/green/white?text=Bruschetta",
              },
              {
                name: "Risotto Milanese",
                desc: "Saffron risotto with parmesan",
                price: "$26",
                image: "https://placehold.co/400x300/yellow/white?text=Risotto",
              },
            ]
              .map(
                (item) => `
              <div class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
                <div class="relative overflow-hidden">
                  <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full font-bold">
                    ${editable(item.price)}
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${editable(item.name)}</h3>
                  <p class="text-gray-600">${editable(item.desc)}</p>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "reservation",
    name: "Reservation Form",
    render: () => `
      <section class="py-20 bg-gradient-to-br from-orange-50 to-amber-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div class="text-center mb-10">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${editable("Make a Reservation")}</h2>
              <p class="text-lg text-gray-600">${editable("Book your table for an unforgettable dining experience")}</p>
            </div>
            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Name")}</label>
                  <input type="text" placeholder="${editable("Your name")}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Email")}</label>
                  <input type="email" placeholder="${editable("your@email.com")}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Date")}</label>
                  <input type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Time")}</label>
                  <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                    <option>${editable("12:00 PM")}</option>
                    <option>${editable("1:00 PM")}</option>
                    <option>${editable("7:00 PM")}</option>
                    <option>${editable("8:00 PM")}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Guests")}</label>
                  <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                    <option>${editable("2 People")}</option>
                    <option>${editable("4 People")}</option>
                    <option>${editable("6 People")}</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg">
                ${editable("Confirm Reservation")}
              </button>
            </form>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "contact",
    name: "Contact Info",
    render: () => `
      <section class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-12">
            <div class="text-center md:text-left">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 class="text-xl font-bold mb-2">${editable("Location")}</h3>
              <p class="text-gray-400">${editable("123 Italian Street, Food City, FC 12345")}</p>
            </div>
            <div class="text-center md:text-left">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 class="text-xl font-bold mb-2">${editable("Contact")}</h3>
              <p class="text-gray-400">${editable("+1 (555) 123-4567")}</p>
              <p class="text-gray-400">${editable("info@labellacucina.com")}</p>
            </div>
            <div class="text-center md:text-left">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 class="text-xl font-bold mb-2">${editable("Hours")}</h3>
              <p class="text-gray-400">${editable("Mon - Thu: 11:00 AM - 10:00 PM")}</p>
              <p class="text-gray-400">${editable("Fri - Sun: 11:00 AM - 11:00 PM")}</p>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "mobile-nav",
    name: "Mobile Navigation",
    render: () => `
      <nav class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <span class="text-2xl font-bold text-orange-600">${editable("La Bella Cucina")}</span>
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="#" class="text-gray-700 hover:text-orange-600 font-medium transition-colors">${editable("Home")}</a>
              <a href="#menu" class="text-gray-700 hover:text-orange-600 font-medium transition-colors">${editable("Menu")}</a>
              <a href="#reservation" class="text-gray-700 hover:text-orange-600 font-medium transition-colors">${editable("Reservations")}</a>
              <a href="#contact" class="text-gray-700 hover:text-orange-600 font-medium transition-colors">${editable("Contact")}</a>
            </div>
            <button class="md:hidden text-gray-700">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>
    `,
  },
];

export const restaurantTemplate: Template = {
  id: "restaurant",
  name: "Restaurant Template",
  industry: "Hospitality",
  description:
    "A complete restaurant website with menu, reservations, and contact information",
  components: restaurantComponents,
  defaultColors: {
    primary: "#ea580c", // orange-600
    secondary: "#f59e0b", // amber-500
    accent: "#dc2626", // red-600
    background: "#ffffff",
    text: "#111827",
  },
  defaultFont: "Inter, sans-serif",
  previewImage:
    "https://placehold.co/1200x800/orange/white?text=Restaurant+Template",
  features: [
    "Hero Section",
    "Menu Section",
    "Reservation Form",
    "Contact Info",
    "Mobile Navigation",
  ],
  icon: "🍽️",
};

// ============================================================================
// TEMPLATE 2: RETAIL STORE
// ============================================================================

const retailComponents: TemplateComponent[] = [
  {
    id: "hero",
    name: "Hero Section",
    render: () => `
      <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                ${editable("Summer Collection")}
              </h1>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
                ${editable("2024")}
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                ${editable("Discover the latest trends in fashion. Limited time offers available now.")}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                  ${editable("Shop Now")}
                </a>
                <a href="#" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  ${editable("View Lookbook")}
                </a>
              </div>
              <div class="mt-8 flex items-center gap-4 justify-center lg:justify-start">
                <div class="flex -space-x-2">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4.8</div>
                  <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">4.9</div>
                  <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">5.0</div>
                </div>
                <p class="text-sm text-gray-600">${editable("Trusted by 10,000+ customers")}</p>
              </div>
            </div>
            <div class="relative">
              <img src="https://placehold.co/600x700/blue/white?text=Fashion+Model" alt="Fashion Collection" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-full font-bold animate-pulse">
                ${editable("50% OFF")}
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "products",
    name: "Product Grid",
    render: () => `
      <section id="products" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Trending Products")}</h2>
            <p class="text-xl text-gray-600">${editable("Our most popular items this season")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${[
              {
                name: "Premium Denim Jacket",
                price: "$149",
                originalPrice: "$299",
                image:
                  "https://placehold.co/400x400/blue/white?text=Denim+Jacket",
                badge: "Best Seller",
              },
              {
                name: "Silk Blouse",
                price: "$89",
                originalPrice: "$129",
                image:
                  "https://placehold.co/400x400/pink/white?text=Silk+Blouse",
                badge: "New Arrival",
              },
              {
                name: "Leather Handbag",
                price: "$199",
                originalPrice: "$349",
                image:
                  "https://placehold.co/400x400/brown/white?text=Leather+Bag",
                badge: "Limited",
              },
              {
                name: "Summer Dress",
                price: "$79",
                originalPrice: "$119",
                image:
                  "https://placehold.co/400x400/green/white?text=Summer+Dress",
                badge: "Hot",
              },
              {
                name: "Running Shoes",
                price: "$129",
                originalPrice: "$179",
                image:
                  "https://placehold.co/400x400/gray/white?text=Running+Shoes",
                badge: "Popular",
              },
              {
                name: "Wool Sweater",
                price: "$69",
                originalPrice: "$99",
                image:
                  "https://placehold.co/400x400/indigo/white?text=Wool+Sweater",
                badge: "Sale",
              },
            ]
              .map(
                (item) => `
              <div class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group">
                <div class="relative overflow-hidden">
                  <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ${editable(item.badge)}
                  </div>
                  <button class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold text-gray-900">${editable(item.name)}</h3>
                    <div class="flex items-center gap-2">
                      <span class="text-2xl font-bold text-blue-600">${editable(item.price)}</span>
                      <span class="text-sm text-gray-400 line-through">${editable(item.originalPrice)}</span>
                    </div>
                  </div>
                  <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    ${editable("Add to Cart")}
                  </button>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "featured",
    name: "Featured Product",
    render: () => `
      <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="relative">
                <img src="https://placehold.co/600x500/white/blue?text=Featured+Product" alt="Featured Product" class="rounded-2xl shadow-2xl w-full" />
                <div class="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-xl shadow-xl">
                  ${editable("BEST SELLER")}
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2 text-center lg:text-left">
              <span class="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ${editable("Featured Product")}
              </span>
              <h2 class="text-4xl md:text-5xl font-bold mb-6">
                ${editable("Premium Quality Cashmere Coat")}
              </h2>
              <p class="text-xl text-blue-100 mb-8">
                ${editable("Luxuriously soft, warm, and timeless. The perfect addition to your winter wardrobe.")}
              </p>
              <div class="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div class="flex">
                  ${[1, 2, 3, 4, 5].map(() => `<svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`).join("")}
                </div>
                <span class="text-white">${editable("4.9 (2,456 reviews)")}</span>
              </div>
              <div class="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <span class="text-4xl font-bold">${editable("$399")}</span>
                <span class="text-2xl text-blue-200 line-through">${editable("$599")}</span>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                  ${editable("Buy Now")}
                </button>
                <button class="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  ${editable("Learn More")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "newsletter",
    name: "Newsletter Signup",
    render: () => `
      <section class="py-20 bg-gray-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            ${editable("Get 15% Off Your First Order")}
          </h2>
          <p class="text-xl text-gray-400 mb-8">
            ${editable("Subscribe to our newsletter for exclusive deals and style tips")}
          </p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input type="email" placeholder="${editable("Enter your email")}" class="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button type="submit" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              ${editable("Subscribe")}
            </button>
          </form>
          <p class="text-sm text-gray-500 mt-4">
            ${editable("By subscribing, you agree to our Privacy Policy")}
          </p>
        </div>
      </section>
    `,
  },
  {
    id: "social",
    name: "Social Media Links",
    render: () => `
      <section class="py-12 bg-gray-50 border-t">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-gray-600">${editable("Follow us on social media")}</p>
            <div class="flex gap-4">
              <a href="#" class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" class="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" class="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    `,
  },
];

export const retailTemplate: Template = {
  id: "retail",
  name: "Retail Store Template",
  industry: "E-commerce & Retail",
  description:
    "Modern e-commerce template with product showcase and shopping features",
  components: retailComponents,
  defaultColors: {
    primary: "#2563eb", // blue-600
    secondary: "#4f46e5", // indigo-600
    accent: "#dc2626", // red-600
    background: "#ffffff",
    text: "#111827",
  },
  defaultFont: "Inter, sans-serif",
  previewImage:
    "https://placehold.co/1200x800/blue/white?text=Retail+Store+Template",
  features: [
    "Hero Section",
    "Product Grid",
    "Featured Product",
    "Newsletter Signup",
    "Social Media Links",
  ],
  icon: "🛍️",
};

// ============================================================================
// TEMPLATE 3: SERVICE BUSINESS
// ============================================================================

const serviceComponents: TemplateComponent[] = [
  {
    id: "hero",
    name: "Hero Section",
    render: () => `
      <section class="relative bg-gradient-to-br from-emerald-50 to-teal-100 py-20 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                ${editable("Professional Services")}
              </h1>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-600 mb-6">
                ${editable("You Can Trust")}
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                ${editable("Expert solutions for your business needs. Fast, reliable, and affordable services tailored to your goals.")}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contact" class="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg">
                  ${editable("Get a Free Quote")}
                </a>
                <a href="#services" class="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors">
                  ${editable("Our Services")}
                </a>
              </div>
              <div class="mt-8 grid grid-cols-3 gap-4 justify-center lg:justify-start">
                <div class="text-center">
                  <div class="text-3xl font-bold text-emerald-600">${editable("500+")}</div>
                  <div class="text-sm text-gray-600">${editable("Projects")}</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-emerald-600">${editable("98%")}</div>
                  <div class="text-sm text-gray-600">${editable("Satisfaction")}</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-emerald-600">${editable("10+")}</div>
                  <div class="text-sm text-gray-600">${editable("Years")}</div>
                </div>
              </div>
            </div>
            <div class="relative">
              <img src="https://placehold.co/600x500/emerald/white?text=Professional+Team" alt="Professional Team" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div class="flex items-center gap-3">
                  <div class="flex">
                    ${[1, 2, 3, 4, 5].map(() => `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`).join("")}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">${editable("5.0 Rated")}</p>
                    <p class="text-sm text-gray-500">${editable("Google Reviews")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "services",
    name: "Services Grid",
    render: () => `
      <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Our Services")}</h2>
            <p class="text-xl text-gray-600">${editable("Comprehensive solutions for your business")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${[
              {
                icon: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
                title: "Web Development",
                desc: "Custom websites and web applications tailored to your needs",
              },
              {
                icon: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
                title: "Mobile Apps",
                desc: "Native and cross-platform mobile applications",
              },
              {
                icon: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>`,
                title: "UI/UX Design",
                desc: "User-centered design that drives engagement",
              },
              {
                icon: `<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
                title: "Data Analytics",
                desc: "Turn your data into actionable insights",
              },
            ]
              .map(
                (service) => `
              <div class="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow group">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-xl mb-6 group-hover:bg-emerald-600 transition-colors">
                  <div class="text-emerald-600 group-hover:text-white transition-colors">${service.icon}</div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">${editable(service.title)}</h3>
                <p class="text-gray-600">${editable(service.desc)}</p>
                <a href="#" class="inline-flex items-center text-emerald-600 font-semibold mt-4 hover:text-emerald-700">
                  ${editable("Learn More")}
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "testimonials",
    name: "Testimonials",
    render: () => `
      <section class="py-20 bg-gradient-to-br from-emerald-50 to-teal-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("What Our Clients Say")}</h2>
            <p class="text-xl text-gray-600">${editable("Don't just take our word for it")}</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            ${[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                quote:
                  "Outstanding service! The team delivered beyond our expectations. Our new website has increased conversions by 40%.",
                avatar: "https://placehold.co/100x100/emerald/white?text=SJ",
              },
              {
                name: "Michael Chen",
                role: "Founder, InnovateCo",
                quote:
                  "Professional, responsive, and truly expert. They understood our vision and brought it to life perfectly.",
                avatar: "https://placehold.co/100x100/teal/white?text=MC",
              },
              {
                name: "Emily Rodriguez",
                role: "Director, GrowthHub",
                quote:
                  "The best decision we made was partnering with this team. They're now our go-to for all digital needs.",
                avatar: "https://placehold.co/100x100/cyan/white?text=ER",
              },
            ]
              .map(
                (testimonial) => `
              <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex mb-4">
                  ${[1, 2, 3, 4, 5].map(() => `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`).join("")}
                </div>
                <p class="text-gray-700 mb-6 italic">"${editable(testimonial.quote)}"</p>
                <div class="flex items-center gap-4">
                  <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full" />
                  <div>
                    <div class="font-bold text-gray-900">${editable(testimonial.name)}</div>
                    <div class="text-sm text-gray-500">${editable(testimonial.role)}</div>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "about",
    name: "About Section",
    render: () => `
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="relative">
              <img src="https://placehold.co/600x500/emerald/white?text=Our+Story" alt="About Us" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                <div class="text-4xl font-bold">${editable("10+")}</div>
                <div class="text-emerald-100">${editable("Years Experience")}</div>
              </div>
            </div>
            <div>
              <span class="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ${editable("About Us")}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ${editable("We're a Team of Passionate Professionals")}
              </h2>
              <p class="text-xl text-gray-600 mb-6">
                ${editable("Founded in 2014, we've grown from a small startup to a full-service digital agency. Our mission is simple: help businesses succeed in digital age.")}
              </p>
              <p class="text-gray-600 mb-8">
                ${editable("We believe in building long-term relationships with our clients, understanding their unique challenges, and delivering solutions that drive real results.")}
              </p>
              <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span class="font-semibold text-gray-900">${editable("Expert Team")}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span class="font-semibold text-gray-900">${editable("On-Time Delivery")}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span class="font-semibold text-gray-900">${editable("24/7 Support")}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span class="font-semibold text-gray-900">${editable("Affordable Pricing")}</span>
                </div>
              </div>
              <a href="#contact" class="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                ${editable("Get Started Today")}
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "contact",
    name: "Contact Form",
    render: () => `
      <section id="contact" class="py-20 bg-gray-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${editable("Ready to Get Started?")}</h2>
            <p class="text-xl text-gray-400">${editable("Fill out the form below and we'll get back to you within 24 hours")}</p>
          </div>
          <form class="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-2">${editable("Full Name")}</label>
                <input type="text" placeholder="${editable("John Doe")}" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-2">${editable("Email Address")}</label>
                <input type="email" placeholder="${editable("john@example.com")}" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-2">${editable("Phone Number")}</label>
                <input type="tel" placeholder="${editable("+1 (555) 123-4567")}" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-2">${editable("Service Needed")}</label>
                <select class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all">
                  <option>${editable("Web Development")}</option>
                  <option>${editable("Mobile Apps")}</option>
                  <option>${editable("UI/UX Design")}</option>
                  <option>${editable("Data Analytics")}</option>
                </select>
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-300 mb-2">${editable("Project Details")}</label>
              <textarea rows="5" placeholder="${editable("Tell us about your project...")}" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"></textarea>
            </div>
            <button type="submit" class="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
              ${editable("Send Message")}
            </button>
          </form>
        </div>
      </section>
    `,
  },
];

export const serviceTemplate: Template = {
  id: "service",
  name: "Service Business Template",
  industry: "Professional Services",
  description:
    "Complete service business website with services, testimonials, and contact forms",
  components: serviceComponents,
  defaultColors: {
    primary: "#059669", // emerald-600
    secondary: "#0d9488", // teal-600
    accent: "#0891b2", // cyan-600
    background: "#ffffff",
    text: "#111827",
  },
  defaultFont: "Inter, sans-serif",
  previewImage:
    "https://placehold.co/1200x800/emerald/white?text=Service+Business+Template",
  features: [
    "Hero Section",
    "Services Grid",
    "Testimonials",
    "About Section",
    "Contact Form",
  ],
  icon: "🛠️",
};

// ============================================================================
// TEMPLATE 4: REAL ESTATE
// ============================================================================

const realEstateComponents: TemplateComponent[] = [
  {
    id: "hero",
    name: "Hero with Search",
    render: () => `
      <section class="relative bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-20 lg:py-32">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ${editable("Find Your Dream Home")}
            </h1>
            <p class="text-xl text-purple-200 mb-8">
              ${editable("Discover the perfect property from our extensive listings")}
            </p>
          </div>
          <div class="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
            <div class="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Location")}</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>${editable("All Locations")}</option>
                  <option>${editable("New York")}</option>
                  <option>${editable("Los Angeles")}</option>
                  <option>${editable("Miami")}</option>
                  <option>${editable("Chicago")}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Property Type")}</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>${editable("All Types")}</option>
                  <option>${editable("House")}</option>
                  <option>${editable("Apartment")}</option>
                  <option>${editable("Condo")}</option>
                  <option>${editable("Villa")}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Price Range")}</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>${editable("Any Price")}</option>
                  <option>${editable("$0 - $200,000")}</option>
                  <option>${editable("$200,000 - $500,000")}</option>
                  <option>${editable("$500,000 - $1,000,000")}</option>
                  <option>${editable("$1,000,000+")}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">${editable("Bedrooms")}</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>${editable("Any")}</option>
                  <option>${editable("1+")}</option>
                  <option>${editable("2+")}</option>
                  <option>${editable("3+")}</option>
                  <option>${editable("4+")}</option>
                </select>
              </div>
            </div>
            <button class="w-full bg-purple-600 text-white py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              ${editable("Search Properties")}
            </button>
          </div>
          <div class="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold">${editable("1,500+")}</div>
              <div class="text-purple-200">${editable("Properties")}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold">${editable("800+")}</div>
              <div class="text-purple-200">${editable("Happy Clients")}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold">${editable("50+")}</div>
              <div class="text-purple-200">${editable("Expert Agents")}</div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "listings",
    name: "Featured Listings",
    render: () => `
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Featured Listings")}</h2>
            <p class="text-xl text-gray-600">${editable("Explore our handpicked premium properties")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${[
              {
                title: "Modern Luxury Villa",
                location: "Beverly Hills, CA",
                price: "$2,450,000",
                beds: "5",
                baths: "4",
                sqft: "4,200",
                image:
                  "https://placehold.co/600x400/purple/white?text=Luxury+Villa",
                badge: "Featured",
              },
              {
                title: "Downtown Penthouse",
                location: "Manhattan, NY",
                price: "$3,200,000",
                beds: "3",
                baths: "3",
                sqft: "2,800",
                image:
                  "https://placehold.co/600x400/indigo/white?text=Penthouse",
                badge: "New",
              },
              {
                title: "Beachfront Estate",
                location: "Malibu, CA",
                price: "$5,800,000",
                beds: "6",
                baths: "5",
                sqft: "5,500",
                image:
                  "https://placehold.co/600x400/blue/white?text=Beach+Estate",
                badge: "Premium",
              },
            ]
              .map(
                (property) => `
              <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
                <div class="relative">
                  <img src="${property.image}" alt="${property.title}" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ${editable(property.badge)}
                  </div>
                  <button class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-2 text-gray-500 mb-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span class="text-sm">${editable(property.location)}</span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${editable(property.title)}</h3>
                  <div class="text-2xl font-bold text-purple-600 mb-4">${editable(property.price)}</div>
                  <div class="flex justify-between text-gray-600 border-t pt-4">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      <span>${editable(property.beds)} Beds</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                      <span>${editable(property.baths)} Baths</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      <span>${editable(property.sqft)} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="text-center mt-12">
            <a href="#" class="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              ${editable("View All Listings")}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "agents",
    name: "Agent Profiles",
    render: () => `
      <section class="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Meet Our Expert Agents")}</h2>
            <p class="text-xl text-gray-600">${editable("Our experienced team is here to help you find your perfect home")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${[
              {
                name: "Jennifer Williams",
                role: "Senior Agent",
                deals: "250+",
                image: "https://placehold.co/300x300/purple/white?text=JW",
                phone: "(555) 123-4567",
              },
              {
                name: "Michael Torres",
                role: "Property Specialist",
                deals: "180+",
                image: "https://placehold.co/300x300/indigo/white?text=MT",
                phone: "(555) 234-5678",
              },
              {
                name: "Sarah Chen",
                role: "Luxury Expert",
                deals: "200+",
                image: "https://placehold.co/300x300/violet/white?text=SC",
                phone: "(555) 345-6789",
              },
              {
                name: "David Kim",
                role: "Investment Advisor",
                deals: "150+",
                image: "https://placehold.co/300x300/fuchsia/white?text=DK",
                phone: "(555) 456-7890",
              },
            ]
              .map(
                (agent) => `
              <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow text-center">
                <div class="p-8">
                  <img src="${agent.image}" alt="${agent.name}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${editable(agent.name)}</h3>
                  <p class="text-purple-600 font-semibold mb-4">${editable(agent.role)}</p>
                  <div class="flex justify-center gap-4 text-sm text-gray-600 mb-6">
                    <div>
                      <div class="font-bold text-purple-600">${editable(agent.deals)}</div>
                      <div>${editable("Deals")}</div>
                    </div>
                  </div>
                  <div class="flex justify-center gap-3">
                    <a href="tel:${agent.phone}" class="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </a>
                    <a href="#" class="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "stats",
    name: "Market Stats",
    render: () => `
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Market Insights")}</h2>
            <p class="text-xl text-gray-600">${editable("Stay informed about real estate market trends")}</p>
          </div>
          <div class="grid md:grid-cols-4 gap-8">
            ${[
              {
                icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
                value: "+15%",
                label: "Avg Price Growth",
                desc: "Year over year",
              },
              {
                icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                value: "89%",
                label: "Sold Properties",
                desc: "This quarter",
              },
              {
                icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
                value: "23 days",
                label: "Avg Time to Sell",
                desc: "Market average",
              },
              {
                icon: `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
                value: "1,245",
                label: "New Listings",
                desc: "This month",
              },
            ]
              .map(
                (stat) => `
              <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-xl mb-4">
                  ${stat.icon}
                </div>
                <div class="text-3xl font-bold text-gray-900 mb-2">${editable(stat.value)}</div>
                <div class="text-lg font-semibold text-purple-600 mb-1">${editable(stat.label)}</div>
                <div class="text-sm text-gray-500">${editable(stat.desc)}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "contact",
    name: "Contact Form",
    render: () => `
      <section class="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${editable("Ready to Find Your Home?")}</h2>
            <p class="text-xl text-purple-200">${editable("Contact us and our agents will help you find your dream property")}</p>
          </div>
          <form class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-purple-100 mb-2">${editable("Full Name")}</label>
                <input type="text" placeholder="${editable("John Doe")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-purple-100 mb-2">${editable("Email Address")}</label>
                <input type="email" placeholder="${editable("john@example.com")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-purple-100 mb-2">${editable("Phone Number")}</label>
                <input type="tel" placeholder="${editable("+1 (555) 123-4567")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-purple-100 mb-2">${editable("Looking For")}</label>
                <select class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all">
                  <option>${editable("Buy Property")}</option>
                  <option>${editable("Sell Property")}</option>
                  <option>${editable("Rent Property")}</option>
                  <option>${editable("Investment")}</option>
                </select>
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-semibold text-purple-100 mb-2">${editable("Message")}</label>
              <textarea rows="5" placeholder="${editable("Tell us what you're looking for...")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none"></textarea>
            </div>
            <button type="submit" class="w-full bg-white text-purple-600 py-4 rounded-lg font-bold hover:bg-purple-50 transition-colors">
              ${editable("Send Inquiry")}
            </button>
          </form>
        </div>
      </section>
    `,
  },
];

export const realEstateTemplate: Template = {
  id: "realestate",
  name: "Real Estate Template",
  industry: "Real Estate",
  description:
    "Professional real estate website with property listings and agent profiles",
  components: realEstateComponents,
  defaultColors: {
    primary: "#9333ea", // purple-600
    secondary: "#4f46e5", // indigo-600
    accent: "#7c3aed", // violet-600
    background: "#ffffff",
    text: "#111827",
  },
  defaultFont: "Inter, sans-serif",
  previewImage:
    "https://placehold.co/1200x800/purple/white?text=Real+Estate+Template",
  features: [
    "Hero with Search",
    "Featured Listings",
    "Agent Profiles",
    "Market Stats",
    "Contact Form",
  ],
  icon: "🏠",
};

// ============================================================================
// TEMPLATE 5: PROFESSIONAL SERVICES
// ============================================================================

const professionalComponents: TemplateComponent[] = [
  {
    id: "hero",
    name: "Hero with Value Prop",
    render: () => `
      <section class="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <span class="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ${editable("Award-Winning Agency")}
              </span>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                ${editable("Transform Your Business")}
              </h1>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-6">
                ${editable("With Expert Strategy")}
              </h1>
              <p class="text-xl text-slate-300 mb-8">
                ${editable("We help businesses achieve their goals through strategic consulting, innovative solutions, and measurable results.")}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contact" class="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
                  ${editable("Schedule Consultation")}
                </a>
                <a href="#case-studies" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  ${editable("View Case Studies")}
                </a>
              </div>
              <div class="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
                ${["Strategy", "Growth", "Innovation", "Results"]
                  .map(
                    (item) => `
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-slate-300">${editable(item)}</span>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            <div class="relative">
              <img src="https://placehold.co/600x500/slate/white?text=Strategic+Meeting" alt="Business Strategy" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute -bottom-6 -left-6 bg-blue-500 text-white p-6 rounded-xl shadow-xl">
                <div class="text-3xl font-bold">${editable("98%")}</div>
                <div class="text-blue-100">${editable("Client Retention")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "case-studies",
    name: "Case Studies",
    render: () => `
      <section id="case-studies" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Case Studies")}</h2>
            <p class="text-xl text-gray-600">${editable("Real results from real clients")}</p>
          </div>
          <div class="space-y-8">
            ${[
              {
                title: "TechStartup: From $1M to $10M ARR",
                client: "SaaS Company",
                result: "+900% Revenue Growth",
                description:
                  "Helped a startup scale from $1M to $10M annual recurring revenue in 18 months through strategic partnerships and go-to-market optimization.",
                metrics: [
                  { label: "Revenue Growth", value: "900%" },
                  { label: "Customer Acquisition", value: "+250%" },
                  { label: "Market Expansion", value: "3 New Markets" },
                ],
                image:
                  "https://placehold.co/800x400/blue/white?text=TechStartup+Case",
              },
              {
                title: "RetailCo: E-commerce Transformation",
                client: "Retail Chain",
                result: "+300% Online Sales",
                description:
                  "Transformed traditional retail operations into a digital-first approach, resulting in 3x online sales growth.",
                metrics: [
                  { label: "Online Sales", value: "+300%" },
                  { label: "Customer Satisfaction", value: "95%" },
                  { label: "Operational Efficiency", value: "+40%" },
                ],
                image:
                  "https://placehold.co/800x400/indigo/white?text=RetailCo+Case",
              },
              {
                title: "HealthPlus: Digital Patient Experience",
                client: "Healthcare Provider",
                result: "+500% Patient Engagement",
                description:
                  "Implemented digital patient portal and telemedicine solutions, dramatically improving patient engagement and satisfaction.",
                metrics: [
                  { label: "Patient Engagement", value: "+500%" },
                  { label: "Appointment Bookings", value: "+400%" },
                  { label: "Patient Satisfaction", value: "4.9/5" },
                ],
                image:
                  "https://placehold.co/800x400/cyan/white?text=HealthPlus+Case",
              },
            ]
              .map(
                (study, index) => `
              <div class="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div class="grid lg:grid-cols-2 gap-8 items-center">
                  <div class="relative overflow-hidden">
                    <img src="${study.image}" alt="${study.title}" class="w-full h-64 lg:h-full object-cover" />
                    <div class="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ${editable("Case Study " + (index + 1))}
                    </div>
                  </div>
                  <div class="p-8 lg:p-12">
                    <div class="flex items-center gap-2 text-blue-600 font-semibold mb-4">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span>${editable(study.client)}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">${editable(study.title)}</h3>
                    <p class="text-gray-600 mb-6">${editable(study.description)}</p>
                    <div class="grid grid-cols-3 gap-4 mb-6">
                      ${study.metrics
                        .map(
                          (metric) => `
                        <div class="text-center bg-white p-4 rounded-lg">
                          <div class="text-2xl font-bold text-blue-600">${editable(metric.value)}</div>
                          <div class="text-xs text-gray-500">${editable(metric.label)}</div>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                    <a href="#" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                      ${editable("Read Full Case Study")}
                      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "team",
    name: "Team Section",
    render: () => `
      <section class="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Meet Our Team")}</h2>
            <p class="text-xl text-gray-600">${editable("Industry experts dedicated to your success")}</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${[
              {
                name: "Alexandra Mitchell",
                role: "CEO & Founder",
                bio: "20+ years in strategic consulting",
                image: "https://placehold.co/300x350/slate/white?text=AM",
              },
              {
                name: "James Rodriguez",
                role: "Chief Strategy Officer",
                bio: "Former Fortune 500 executive",
                image: "https://placehold.co/300x350/blue/white?text=JR",
              },
              {
                name: "Emily Watson",
                role: "Head of Innovation",
                bio: "Tech industry thought leader",
                image: "https://placehold.co/300x350/indigo/white?text=EW",
              },
              {
                name: "Michael Chang",
                role: "Client Success Director",
                bio: "Expert in business transformation",
                image: "https://placehold.co/300x350/cyan/white?text=MC",
              },
            ]
              .map(
                (member) => `
              <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div class="relative overflow-hidden">
                  <img src="${member.image}" alt="${member.name}" class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div class="flex gap-3">
                      <a href="#" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-blue-500 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                      <a href="#" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-blue-500 hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="p-6 text-center">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${editable(member.name)}</h3>
                  <p class="text-blue-600 font-semibold mb-2">${editable(member.role)}</p>
                  <p class="text-sm text-gray-500">${editable(member.bio)}</p>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "faq",
    name: "FAQ Accordion",
    render: () => `
      <section class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">${editable("Frequently Asked Questions")}</h2>
            <p class="text-xl text-gray-600">${editable("Got questions? We've got answers")}</p>
          </div>
          <div class="space-y-4">
            ${[
              {
                question: "What services do you offer?",
                answer:
                  "We offer a comprehensive range of services including strategic consulting, digital transformation, marketing strategy, operational optimization, and technology implementation. Our solutions are tailored to meet your specific business needs and goals.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project duration varies based on scope and complexity. Most engagements range from 3-12 months. We provide detailed timelines during our initial consultation and maintain transparency throughout project lifecycle.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "We offer flexible pricing models including project-based, retainer, and hourly rates. During our initial discovery call, we'll recommend the most cost-effective approach for your specific needs and provide a detailed proposal.",
              },
              {
                question: "Do you work with startups?",
                answer:
                  "Absolutely! We have extensive experience working with startups at various stages. From early-stage strategy to scaling operations, we provide the expertise needed to accelerate growth and navigate common challenges.",
              },
              {
                question: "What industries do you specialize in?",
                answer:
                  "We work across multiple industries including technology, healthcare, finance, retail, and professional services. Our cross-industry expertise allows us to bring best practices and innovative approaches to every engagement.",
              },
              {
                question: "How do I get started?",
                answer:
                  "Getting started is easy! Simply schedule a free consultation through our contact form or give us a call. We'll discuss your needs, goals, and determine how we can best help you achieve your objectives.",
              },
            ]
              .map(
                (faq, index) => `
              <div class="border border-gray-200 rounded-xl overflow-hidden">
                <button class="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors" onclick="document.getElementById('faq-${index}').classList.toggle('hidden')">
                  <span class="font-semibold text-gray-900">${editable(faq.question)}</span>
                  <svg class="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div id="faq-${index}" class="hidden px-6 py-4 bg-white">
                  <p class="text-gray-600">${editable(faq.answer)}</p>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `,
  },
  {
    id: "contact",
    name: "Consultation Form",
    render: () => `
      <section id="contact" class="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${editable("Ready to Transform Your Business?")}</h2>
            <p class="text-xl text-slate-300">${editable("Schedule a free consultation with our experts")}</p>
          </div>
          <form class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("Full Name")}</label>
                <input type="text" placeholder="${editable("John Doe")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("Email Address")}</label>
                <input type="email" placeholder="${editable("john@company.com")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("Company Name")}</label>
                <input type="text" placeholder="${editable("Your Company")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("Phone Number")}</label>
                <input type="tel" placeholder="${editable("+1 (555) 123-4567")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("How Can We Help?")}</label>
              <select class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>${editable("Strategic Consulting")}</option>
                <option>${editable("Digital Transformation")}</option>
                <option>${editable("Marketing Strategy")}</option>
                <option>${editable("Operations Optimization")}</option>
                <option>${editable("Technology Implementation")}</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-semibold text-slate-200 mb-2">${editable("Tell Us About Your Goals")}</label>
              <textarea rows="5" placeholder="${editable("Describe your business challenges and goals...")}" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors">
              ${editable("Schedule Free Consultation")}
            </button>
            <p class="text-center text-sm text-slate-400 mt-4">
              ${editable("No obligation. We'll get back to you within 24 hours.")}
            </p>
          </form>
        </div>
      </section>
    `,
  },
];

export const professionalTemplate: Template = {
  id: "professional",
  name: "Professional Services Template",
  industry: "Consulting & Professional Services",
  description:
    "Premium consulting template with case studies, team profiles, and FAQ sections",
  components: professionalComponents,
  defaultColors: {
    primary: "#0f172a", // slate-900
    secondary: "#3b82f6", // blue-500
    accent: "#6366f1", // indigo-500
    background: "#ffffff",
    text: "#111827",
  },
  defaultFont: "Inter, sans-serif",
  previewImage:
    "https://placehold.co/1200x800/slate/white?text=Professional+Services+Template",
  features: [
    "Hero with Value Prop",
    "Case Studies",
    "Team Section",
    "FAQ Accordion",
    "Consultation Form",
  ],
  icon: "📠",
};

// ============================================================================
// EXPORTS
// ============================================================================

export const templates: Template[] = [
  restaurantTemplate,
  retailTemplate,
  serviceTemplate,
  realEstateTemplate,
  professionalTemplate,
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

export const getTemplateByIndustry = (industry: string): Template[] => {
  return templates.filter((template) =>
    template.industry.toLowerCase().includes(industry.toLowerCase()),
  );
};
