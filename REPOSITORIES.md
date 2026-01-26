# 🗺️ MAIA Ecosystem: Repository Architecture

This document defines the purpose and usage of the core repositories in the ecosystem. Agents should use these to locate logic, assets, and deployment targets.

---

## 1. `multiagent-layer0` (/Users/g/Desktop/multiagent-layer0)
**Role:** The "Brain" / Logic Engine.
- **Purpose**: Contains the core agent definitions, strategic scripts, and synchronization logic.
- **Key Folders**:
  - `.opencode/agents/`: Source of truth for agent behavior (SISYPHUS, MAIA, GIUZU).
  - `.opencode/scripts/`: Automation scripts for syncing the ecosystem.
- **When to Use**: Modifying agent identity, updating global orchestration strategies, or performing maintenance across the platform.

## 2. `MAIA opencode` (/Users/g/Desktop/MAIA opencode)
**Role:** The "Ecosystem" / Production Target.
- **Purpose**: The user-facing deployment of the agents. This is where active projects are often managed.
- **Key Folders**:
  - `.opencode/`: Active agent instances for the ecosystem.
- **When to Use**: Running agents in production, managing the "MAIA" brand droids, and user-facing feature development.

## 3. `MAIA_Layer0` (/Users/g/Desktop/MAIA_Layer0)
**Role:** The "Archive" / Redundancy Layer.
- **Purpose**: Redundant copy of the layer0 logic to ensure system survival and versioning safety.
- **When to Use**: Emergency recovery, cross-reference testing, or legacy logic archival.

---

## 🛰️ Synchronization Protocol
The **MAIA Orchestrator** and **SISYPHUS Manager** coordinate to keep these repositories in sync.
- **Logic updates** begin in `multiagent-layer0`.
- **Scripts** push these updates to `MAIA opencode` and `MAIA_Layer0`.
- **GitHub Sync**: All repositories are pushed to their respective GitHub remotes to ensure global availability.

## 📋 Repository Usage Strategy for Agents
- **@maia**: Should prioritize `MAIA opencode` for production execution but consult `multiagent-layer0` for behavioral updates.
- **@sisyphus**: Uses `multiagent-layer0` as the master registry for project charters and execution reports across all layers.
- **@coder**: Performs builds in the repository specified by the task context (usually the user's current directory).
