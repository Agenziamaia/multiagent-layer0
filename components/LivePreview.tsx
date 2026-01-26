"use client";

import { useStore } from "@/lib/store";
import Image from "next/image";
import type { ComponentConfig } from "@/lib/store";

export default function LivePreview() {
  const { pageComponents, config, updateConfig, logo, setLogo } = useStore();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeploy = () => {
    console.log("Deploying to Vercel...", {
      components: pageComponents,
      config,
      logo,
    });
    alert("Deployment started! This would deploy to Vercel in production.");
  };

  const handleGenerateCode = () => {
    console.log("Generating code...", {
      components: pageComponents,
      config,
      logo,
    });
    alert("Code generated! Check console for output.");
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30">
      <div className="border-b border-border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Live Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateCode}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              Generate Code
            </button>
            <button
              onClick={handleDeploy}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Deploy to Vercel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Business Name</label>
            <input
              type="text"
              value={config.businessName}
              onChange={(e) => updateConfig({ businessName: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
              placeholder="Enter business name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Industry</label>
            <select
              value={config.industry}
              onChange={(e) => updateConfig({ industry: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
            >
              <option value="">Select industry</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="services">Services</option>
              <option value="tech">Technology</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Color Scheme</label>
            <select
              value={config.colorScheme}
              onChange={(e) => updateConfig({ colorScheme: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
            >
              <option value="blue">Blue (Professional)</option>
              <option value="green">Green (Growth)</option>
              <option value="purple">Purple (Creative)</option>
              <option value="orange">Orange (Energetic)</option>
              <option value="red">Red (Bold)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Font</label>
            <select
              value={config.font}
              onChange={(e) => updateConfig({ font: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="open-sans">Open Sans</option>
              <option value="lato">Lato</option>
              <option value="poppins">Poppins</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Logo</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium cursor-pointer hover:bg-secondary/90 transition-colors"
              >
                Upload Logo
              </label>
              {logo && (
                <div className="relative w-10 h-10">
                  <Image
                    src={logo}
                    alt="Logo"
                    fill
                    className="object-contain rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg min-h-[800px] p-8">
          <div className="flex items-center justify-between mb-12 pb-4 border-b">
            {logo ? (
              <div className="relative w-12 h-12">
                <Image src={logo} alt="Logo" fill className="object-contain" />
              </div>
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {config.businessName || "Your Business"}
              </h1>
            )}
            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">
                Home
              </a>
              <a href="#" className="hover:text-gray-900">
                About
              </a>
              <a href="#" className="hover:text-gray-900">
                Services
              </a>
              <a href="#" className="hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>

          {pageComponents.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">
                Add components from the sidebar to build your page
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {pageComponents.map((component: ComponentConfig) => (
                <div
                  key={component.id}
                  className="border-l-4 border-primary pl-6 py-4"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {component.name} Section
                  </h3>
                  <p className="text-gray-600 mb-4">{component.description}</p>
                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
                    <p>This is a preview of the {component.name} component.</p>
                    <p>
                      In production, this would render actual component with
                      your content.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 pt-8 border-t text-center text-sm text-gray-500">
            <p>
              © 2026 {config.businessName || "Your Business"}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
