import { create } from "zustand";

export interface ComponentConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  industry: string;
  features: string[];
}

export interface SiteConfig {
  businessName: string;
  industry: string;
  colorScheme: string;
  font: string;
}

interface BuilderStore {
  availableComponents: ComponentConfig[];
  pageComponents: ComponentConfig[];

  config: SiteConfig;
  logo: string | null;

  addComponent: (id: string) => void;
  removeComponent: (id: string) => void;
  moveComponent: (dragId: string, dropId: string) => void;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  setLogo: (logo: string) => void;
}

const initialConfig: SiteConfig = {
  businessName: "",
  industry: "",
  colorScheme: "blue",
  font: "inter",
};

export const useStore = create<BuilderStore>((set) => ({
  availableComponents: [
    {
      id: "hero",
      name: "Hero Section",
      icon: "🎯",
      description: "Eye-catching hero with headline and CTA",
      industry: "all",
      features: ["Responsive", "Animation", "Customizable"],
    },
    {
      id: "services",
      name: "Services",
      icon: "⚡",
      description: "Showcase your services with cards",
      industry: "all",
      features: ["Grid Layout", "Icons", "Hover Effects"],
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: "💬",
      description: "Customer reviews and testimonials",
      industry: "all",
      features: ["Carousel", "Star Ratings", "Avatar"],
    },
    {
      id: "contact",
      name: "Contact Form",
      icon: "📧",
      description: "Contact form with validation",
      industry: "all",
      features: ["Form Validation", "Email Integration", "Google Maps"],
    },
    {
      id: "about",
      name: "About Us",
      icon: "👥",
      description: "Tell your story and mission",
      industry: "all",
      features: ["Team Section", "Timeline", "Statistics"],
    },
  ],

  pageComponents: [],

  config: initialConfig,

  logo: null,

  addComponent: (id) =>
    set((state) => {
      const component = state.availableComponents.find((c) => c.id === id);
      if (!component) return state;
      return {
        pageComponents: [
          ...state.pageComponents,
          { ...component, id: `${id}-${Date.now()}` },
        ],
      };
    }),

  removeComponent: (id) =>
    set((state) => ({
      pageComponents: state.pageComponents.filter((c) => c.id !== id),
    })),

  moveComponent: (dragId, dropId) =>
    set((state) => {
      const components = [...state.pageComponents];
      const dragIndex = components.findIndex((c) => c.id === dragId);
      const dropIndex = components.findIndex((c) => c.id === dropId);

      if (dragIndex === -1 || dropIndex === -1) return state;

      const [removed] = components.splice(dragIndex, 1);
      components.splice(dropIndex, 0, removed);

      return { pageComponents: components };
    }),

  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),

  setLogo: (logo) => set({ logo }),
}));
