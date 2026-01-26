import type { Template } from "@/lib/templates";

export interface TemplateCardProps {
  template: Template;
  onSelect: (id: string) => void;
}

export default function TemplateCard({
  template,
  onSelect,
}: TemplateCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg hover:scale-[1.02]">
      <div className="relative aspect-video mb-4 overflow-hidden rounded-md bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">{template.icon}</div>
            <div className="text-sm font-semibold text-muted-foreground">
              {template.name}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
          <button
            onClick={() => onSelect(template.id)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Select Template
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            {template.industry}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 3).map((feature: string) => (
            <span
              key={feature}
              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-muted-foreground">
              +{template.features.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
