#!/usr/bin/env python3
import json
import sys

PROJECT_ID = "f947a334-989d-408a-9e3c-03b73fe2f6e9"


def list_tasks():
    import urllib.request

    req = urllib.request.Request(
        f"http://localhost:62601/api/tasks?project_id={PROJECT_ID}"
    )
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data["data"]


def create_task(title, description):
    import urllib.request

    url = "http://localhost:62601/api/tasks"
    data = {"project_id": PROJECT_ID, "title": title, "description": description}
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode("utf-8"))
        return result["data"]


def update_task_status(task_id, status):
    import urllib.request

    url = f"http://localhost:62601/api/tasks/{task_id}"
    data = {"status": status}
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="PATCH",
    )
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode("utf-8"))
        return result["data"]


if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "list":
            tasks = list_tasks()
            print(f"Total Tasks: {len(tasks)}")
            print()
            for i, task in enumerate(tasks, 1):
                print(f"{i}. [{task['status']}] {task['title']}")
                if task.get("description"):
                    print(f"   └─ {task['description'][:60]}...")
        elif cmd == "move":
            if len(sys.argv) >= 3:
                task_id = sys.argv[2]
                new_status = sys.argv[3] if len(sys.argv) > 3 else "in_progress"
                result = update_task_status(task_id, new_status)
                print(f"Task {task_id[:8]} moved to [{result['status']}]")
        else:
            print("Usage: python3 api.py list|move <task_id> <status>")
    else:
        print("Usage: python3 api.py list|move <task_id> <status>")
        sys.exit(1)
