"use client";

import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * @typedef {"Published" | "Draft"} AttractionStatus
 *
 * @typedef Attraction
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} location
 * @property {string} description
 * @property {string} image
 * @property {number} entryFee
 * @property {AttractionStatus} status
 * @property {string} updatedAtISO
 */

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @param {AttractionStatus} status */
function statusPillClasses(status) {
  if (status === "Published") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
}

const STATUS_OPTIONS = /** @type {const} */ (["Published", "Draft"]);

export default function DashboardAttractionsPage() {
  /** @type {[Attraction[], Function]} */
  const [attractions, setAttractions] = useState(() => [
    {
      id: createId(),
      name: "Lake Hora",
      category: "Lake",
      location: "Bishoftu",
      description:
        "Famous crater lake known for Irreecha celebrations and scenic views.",
      image: "/lakkk.jpg",
      entryFee: 50,
      status: "Published",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Lake Babogaya",
      category: "Lake",
      location: "Bishoftu",
      description: "Popular lakeside area with resorts and water activities.",
      image: "/lake babogaya.jpg",
      entryFee: 40,
      status: "Published",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Local Market Cultural Tour",
      category: "Cultural Site",
      location: "Bishoftu",
      description:
        "Guided visit through local markets with authentic Oromo culture.",
      image: "/local-market-cultural-tour.jpg",
      entryFee: 30,
      status: "Draft",
      updatedAtISO: new Date().toISOString(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(/** @type {string | null} */ (null));

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    image: "",
    entryFee: 0,
    status: /** @type {AttractionStatus} */ ("Draft"),
  });

  function openAdd() {
    setMode("add");
    setActiveId(null);
    setForm({
      name: "",
      category: "",
      location: "",
      description: "",
      image: "",
      entryFee: 0,
      status: "Draft",
    });
    setDialogOpen(true);
  }

  /** @param {Attraction} attraction */
  function openEdit(attraction) {
    setMode("edit");
    setActiveId(attraction.id);
    setForm({
      name: attraction.name,
      category: attraction.category,
      location: attraction.location,
      description: attraction.description,
      image: attraction.image,
      entryFee: attraction.entryFee,
      status: attraction.status,
    });
    setDialogOpen(true);
  }

  /** @param {Attraction} attraction */
  function openView(attraction) {
    setMode("view");
    setActiveId(attraction.id);
    setForm({
      name: attraction.name,
      category: attraction.category,
      location: attraction.location,
      description: attraction.description,
      image: attraction.image,
      entryFee: attraction.entryFee,
      status: attraction.status,
    });
    setDialogOpen(true);
  }

  function resetDialog() {
    setDialogOpen(false);
    setActiveId(null);
    setMode("add");
    setForm({
      name: "",
      category: "",
      location: "",
      description: "",
      image: "",
      entryFee: 0,
      status: "Draft",
    });
  }

  /**
   * CRUD helpers — easy to replace with real API calls later.
   */
  function addAttraction(next) {
    setAttractions((prev) => [
      {
        id: createId(),
        name: next.name.trim(),
        category: next.category.trim(),
        location: next.location.trim(),
        description: next.description.trim(),
        image: next.image.trim(),
        entryFee: next.entryFee,
        status: next.status,
        updatedAtISO: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function updateAttraction(id, next) {
    setAttractions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: next.name.trim(),
              category: next.category.trim(),
              location: next.location.trim(),
              description: next.description.trim(),
              image: next.image.trim(),
              entryFee: next.entryFee,
              status: next.status,
              updatedAtISO: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function deleteAttraction(id) {
    setAttractions((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      name: form.name,
      category: form.category,
      location: form.location,
      description: form.description,
      image: form.image,
      entryFee: form.entryFee,
      status: form.status,
    };

    if (!payload.name.trim() || !payload.location.trim()) return;

    if (mode === "add") {
      addAttraction(payload);
      resetDialog();
      return;
    }

    if (mode === "edit" && activeId) {
      updateAttraction(activeId, payload);
      resetDialog();
    }
  }

  const dialogTitle = (() => {
    if (mode === "add") return "Add Attraction";
    if (mode === "edit") return "Edit Attraction";
    return "Attraction Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add") return "Create a new attraction entry (mock).";
    if (mode === "edit") return "Update the attraction details (mock).";
    return "Preview how this attraction appears in the admin system (mock).";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Attractions</h1>
          <p className="text-muted-foreground">
            Manage key sites and experiences shown on the public Explore page.
          </p>
        </div>

        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Attraction
        </Button>
      </div>

      {/* Table/Card */}
      <div className="overflow-hidden rounded-xl bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-display text-lg font-semibold">
            Attraction List
          </h2>
          <p className="text-sm text-muted-foreground">
            {attractions.length} item{attractions.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Entry Fee</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attractions.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4 font-medium text-foreground">
                      {item.name}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.location}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.entryFee > 0 ? `ETB ${item.entryFee}` : "Free"}
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          statusPillClasses(item.status),
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openView(item)}
                          aria-label={`View ${item.name}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete attraction?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove <b>{item.name}</b> from the
                                list (local state only in this demo).
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteAttraction(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}

                {attractions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No attractions yet. Click “Add Attraction” to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit/View Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) resetDialog();
        }}
      >
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Lake Hora"
                  autoFocus={!readOnly}
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Lake, Cultural Site, Church..."
                  disabled={readOnly}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="Bishoftu, specific area, etc."
                disabled={readOnly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="/lake-hora.jpg"
                disabled={readOnly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Short description visitors will see."
                disabled={readOnly}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="entryFee">Entry Fee (ETB)</Label>
                <Input
                  id="entryFee"
                  type="number"
                  min={0}
                  value={form.entryFee}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      entryFee: Number(e.target.value) || 0,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      status: /** @type {AttractionStatus} */ (value),
                    }))
                  }
                  disabled={readOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={resetDialog}>
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && (
                <Button
                  type="submit"
                  disabled={!form.name.trim() || !form.location.trim()}
                >
                  {mode === "add" ? "Add Attraction" : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
