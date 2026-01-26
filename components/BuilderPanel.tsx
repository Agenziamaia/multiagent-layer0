"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { useStore } from "@/lib/store";
import type { ComponentConfig } from "@/lib/store";

export default function BuilderPanel() {
  const {
    availableComponents,
    pageComponents,
    addComponent,
    removeComponent,
    moveComponent,
  } = useStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveComponent(active.id as string, over.id as string);
    }
  };

  return (
    <aside className="w-80 border-r border-border bg-card p-6 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Components</h2>
          <p className="text-sm text-muted-foreground">
            Drag and drop to build your page
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Available
          </h3>
          <div className="space-y-2">
            {availableComponents.map((component: ComponentConfig) => (
              <button
                key={component.id}
                onClick={() => addComponent(component.id)}
                className="w-full text-left p-4 rounded-lg border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{component.icon}</span>
                  <div>
                    <div className="font-medium">{component.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {component.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {pageComponents.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Active ({pageComponents.length})
            </h3>
            <div className="space-y-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                {pageComponents.map(
                  (component: ComponentConfig, index: number) => (
                    <div
                      key={component.id}
                      className="p-3 rounded-lg border border-border bg-primary/5 hover:bg-primary/10 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            {index + 1}.
                          </span>
                          <span className="font-medium text-sm">
                            {component.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeComponent(component.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                          title="Remove"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </DndContext>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
