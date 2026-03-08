// src/components/ProjectPicker.tsx
import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export interface ProjectMeta {
  id: string;
  name: string;
  updatedAt: string;
}

export interface ProjectPickerProps {
  visible: boolean;
  newProjectName: string;
  projects: ProjectMeta[];
  onHide: () => void;
  onChangeProjectName: (value: string) => void;
  onCreateFromCurrent: () => void;
  onOpenProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectPicker(props: ProjectPickerProps) {
  const {
    visible,
    newProjectName,
    projects,
    onHide,
    onChangeProjectName,
    onCreateFromCurrent,
    onOpenProject,
    onDeleteProject,
  } = props;

  return (
    <Dialog
      header="Local projects"
      visible={visible}
      style={{ width: "30rem" }}
      onHide={onHide}
    >
      <div className="flex flex-column gap-2" style={{ marginBottom: "1rem" }}>
        <span>Neues Projekt anlegen (aus aktuellem Editor-Inhalt):</span>
        <input
          type="text"
          placeholder="Projektname"
          value={newProjectName}
          onChange={e => onChangeProjectName(e.target.value)}
        />
        <Button
          label="Als neues Projekt speichern"
          icon="pi pi-save"
          onClick={onCreateFromCurrent}
        />
      </div>

      <DataTable value={projects} size="small">
        <Column field="name" header="Name" />
        <Column field="updatedAt" header="Updated" />
        <Column
          body={row => (
            <>
              <Button
                label="Open"
                size="small"
                onClick={() => onOpenProject(row.id)}
              />
              <Button
                icon="pi pi-trash"
                size="small"
                text
                severity="danger"
                onClick={() => onDeleteProject(row.id)}
              />
            </>
          )}
        />
      </DataTable>
    </Dialog>
  );
}