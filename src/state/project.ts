// src/state/project.ts
export type ProjectId = string;

export interface ProjectMeta {
  id: ProjectId;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface ProjectData {
  id: ProjectId;
  name: string;
  // Haupt-Script – wir starten erstmal nur damit
  mainScad: string;
}

const STORAGE_KEY = "openscad-playground-projects";

function loadAll(): ProjectData[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ProjectData[];
  } catch {
    return [];
  }
}

function saveAll(projects: ProjectData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectMeta[] {
  return loadAll().map(p => ({
    id: p.id,
    name: p.name,
    createdAt: "", // optional: mit in ProjectData aufnehmen
    updatedAt: "",
  }));
}

export function getProject(id: ProjectId): ProjectData | undefined {
  return loadAll().find(p => p.id === id);
}

export function upsertProject(project: ProjectData) {
  const all = loadAll();
  const idx = all.findIndex(p => p.id === project.id);
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  saveAll(all);
}

export function deleteProject(id: ProjectId) {
  const all = loadAll().filter(p => p.id !== id);
  saveAll(all);
}