import { tool } from "@opencode-ai/plugin";

/**
 * Vibe Kanban HTTP API Tools
 * Direct access to Vibe Kanban for faster operations
 * Requires VIBE_KANBAN_URL environment variable (default: http://localhost:62601)
 */

const getBaseUrl = () =>
  process.env.VIBE_KANBAN_URL || "http://localhost:62601";

interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  name: string;
  default_agent_working_dir: string;
  created_at: string;
  updated_at: string;
}

export const vk_list_projects = tool({
  description: "List all Vibe Kanban projects",
  args: {},
  async execute() {
    const res = await fetch(`${getBaseUrl()}/api/projects`);
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    return data.data
      .map((p: Project) => `• ${p.name} (${p.id.slice(0, 8)}...)`)
      .join("\n");
  },
});

export const vk_list_tasks = tool({
  description: "List tasks in a Vibe Kanban project",
  args: {
    project_id: tool.schema.string().describe("Project ID"),
    status: tool.schema
      .string()
      .optional()
      .describe("Filter by status: todo, in_progress, in_review, done"),
  },
  async execute(args) {
    const url = new URL(`${getBaseUrl()}/api/tasks`);
    url.searchParams.set("project_id", args.project_id);
    if (args.status) url.searchParams.set("status", args.status);

    const res = await fetch(url.toString());
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;

    return (
      data.data
        .map(
          (t: Task) =>
            `[${t.status}] ${t.title}${t.description ? `\n   └─ ${t.description.slice(0, 60)}...` : ""}`,
        )
        .join("\n") || "No tasks found"
    );
  },
});

export const vk_create_task = tool({
  description: "Create a new task in Vibe Kanban",
  args: {
    project_id: tool.schema.string().describe("Project ID to create task in"),
    title: tool.schema.string().describe("Task title"),
    description: tool.schema.string().optional().describe("Task description"),
    status: tool.schema
      .string()
      .optional()
      .describe("Initial status (default: todo)"),
  },
  async execute(args) {
    const res = await fetch(`${getBaseUrl()}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: args.project_id,
        title: args.title,
        description: args.description,
        status: args.status || "todo",
      }),
    });
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    return `✅ Task created: ${data.data.title} (${data.data.id.slice(0, 8)}...)`;
  },
});

export const vk_update_task = tool({
  description: "Update a task (move to different status column)",
  args: {
    task_id: tool.schema.string().describe("Task ID to update"),
    title: tool.schema.string().optional().describe("New title"),
    description: tool.schema.string().optional().describe("New description"),
    status: tool.schema
      .string()
      .optional()
      .describe("New status: todo, in_progress, in_review, done, cancelled"),
  },
  async execute(args) {
    const res = await fetch(`${getBaseUrl()}/api/tasks/${args.task_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: args.title,
        description: args.description,
        status: args.status,
      }),
    });
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    return `✅ Task updated: ${data.data.title} → [${data.data.status}]`;
  },
});

export const vk_get_task = tool({
  description: "Get detailed information about a task",
  args: {
    task_id: tool.schema.string().describe("Task ID to retrieve"),
  },
  async execute(args) {
    const res = await fetch(`${getBaseUrl()}/api/tasks/${args.task_id}`);
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    const t = data.data;
    return `📋 ${t.title}\nStatus: [${t.status}]\n${t.description || ""}\nID: ${t.id}\nCreated: ${t.created_at}`;
  },
});

export const vk_delete_task = tool({
  description: "Delete a task from Vibe Kanban",
  args: {
    task_id: tool.schema.string().describe("Task ID to delete"),
  },
  async execute(args) {
    const res = await fetch(`${getBaseUrl()}/api/tasks/${args.task_id}`, {
      method: "DELETE",
    });
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    return `✅ Task deleted`;
  },
});

export const vk_start_workspace = tool({
  description:
    "Start a workspace session for a task (triggers agent execution)",
  args: {
    task_id: tool.schema.string().describe("Task ID to start workspace for"),
    agent: tool.schema
      .string()
      .describe("Agent to use: coder, ops, researcher, reviewer"),
    variant: tool.schema
      .string()
      .optional()
      .describe("Agent variant (e.g., DEFAULT, PLAN)"),
  },
  async execute(args) {
    const res = await fetch(`${getBaseUrl()}/api/workspaces`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: args.task_id,
        agent: args.agent,
        variant: args.variant || "DEFAULT",
      }),
    });
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;
    return `🚀 Workspace started for task ${args.task_id.slice(0, 8)}...\nAgent: ${args.agent}${args.variant ? ` (${args.variant})` : ""}`;
  },
});

export const vk_board_status = tool({
  description: "Get a quick summary of all tasks across columns in a project",
  args: {
    project_id: tool.schema.string().describe("Project ID to show board for"),
  },
  async execute(args) {
    const url = new URL(`${getBaseUrl()}/api/tasks`);
    url.searchParams.set("project_id", args.project_id);

    const res = await fetch(url.toString());
    if (!res.ok) return `❌ Error: ${res.status}`;
    const data = await res.json();
    if (!data.success) return `❌ API Error: ${data.error_data}`;

    const tasks = data.data as Task[];
    const counts = { todo: 0, in_progress: 0, in_review: 0, done: 0 };
    tasks.forEach((t) => {
      if (counts[t.status as keyof typeof counts] !== undefined)
        counts[t.status as keyof typeof counts]++;
    });

    return `📊 Board Status: ${tasks.length} tasks
┌─────────────────────────────────┐
│ TODO        │ ${counts.todo.toString().padStart(2)} │ IN PROGRESS │ ${counts.in_progress.toString().padStart(2)} │ IN REVIEW │ ${counts.in_review.toString().padStart(2)} │ DONE │ ${counts.done.toString().padStart(2)} │
└─────────────────────────────────┘`;
  },
});
