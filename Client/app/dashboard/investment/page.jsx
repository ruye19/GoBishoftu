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
 * @typedef {"Active" | "Draft" | "Closed"} InvestmentStatus
 *
 * @typedef Investment
 * @property {string} id
 * @property {string} title
 * @property {string} sector
 * @property {string} location
 * @property {number} requiredCapital
 * @property {number} roi
 * @property {string} description
 * @property {InvestmentStatus} status
 * @property {string} updatedAtISO
 */

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @param {InvestmentStatus} status */
function statusPillClasses(status) {
  if (status === "Active") return "bg-primary/10 text-primary";
  if (status === "Closed") return "bg-muted text-muted-foreground line-through";
  return "bg-muted text-muted-foreground";
}

const STATUS_OPTIONS = /** @type {const} */ (["Active", "Draft", "Closed"]);

export default function DashboardInvestmentPage() {
  /** @type {[Investment[], Function]} */
  const [investments, setInvestments] = useState(() => [
    {
      id: createId(),
      title: "Lakeside Resort Development",
      sector: "Hospitality & Tourism",
      location: "Lake Babogaya, Bishoftu",
      requiredCapital: 2200000,
      roi: 15,
      description:
        "Luxury eco-resort on Lake Babogaya with 50 rooms, spa, restaurants, and adventure facilities.",
      status: "Active",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      title: "Retail & Services Hub",
      sector: "Retail & Services",
      location: "Central Bishoftu",
      requiredCapital: 950000,
      roi: 14,
      description:
        "Mixed retail and services complex serving both residents and growing visitor traffic.",
      status: "Draft",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      title: "Agro-tourism Farm Experience",
      sector: "Agriculture & Agro-tourism",
      location: "Bishoftu Peri-Urban Belt",
      requiredCapital: 600000,
      roi: 16,
      description:
        "Organic farm with farm-stay experiences, local produce, and educational tourism programs.",
      status: "Active",
      updatedAtISO: new Date().toISOString(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(
    /** @type {string | null} */ (null),
  );

  const [form, setForm] = useState({
    title: "",
    sector: "",
    location: "",
    requiredCapital: 0,
    roi: 0,
    description: "",
    status: /** @type {InvestmentStatus} */ ("Draft"),
  });

  function openAdd() {
    setMode("add");
    setActiveId(null);
    setForm({
      title: "",
      sector: "",
      location: "",
      requiredCapital: 0,
      roi: 0,
      description: "",
      status: "Draft",
    });
    setDialogOpen(true);
  }

  /** @param {Investment} investment */
  function openEdit(investment) {
    setMode("edit");
    setActiveId(investment.id);
    setForm({
      title: investment.title,
      sector: investment.sector,
      location: investment.location,
      requiredCapital: investment.requiredCapital,
      roi: investment.roi,
      description: investment.description,
      status: investment.status,
    });
    setDialogOpen(true);
  }

  /** @param {Investment} investment */
  function openView(investment) {
    setMode("view");
    setActiveId(investment.id);
    setForm({
      title: investment.title,
      sector: investment.sector,
      location: investment.location,
      requiredCapital: investment.requiredCapital,
      roi: investment.roi,
      description: investment.description,
      status: investment.status,
    });
    setDialogOpen(true);
  }

  function resetDialog() {
    setDialogOpen(false);
    setActiveId(null);
    setMode("add");
    setForm({
      title: "",
      sector: "",
      location: "",
      requiredCapital: 0,
      roi: 0,
      description: "",
      status: "Draft",
    });
  }

  /**
   * CRUD helpers — replace these with real API calls later.
   */
  function addInvestment(next) {
    setInvestments((prev) => [
      {
        id: createId(),
        title: next.title.trim(),
        sector: next.sector.trim(),
        location: next.location.trim(),
        requiredCapital: next.requiredCapital,
        roi: next.roi,
        description: next.description.trim(),
        status: next.status,
        updatedAtISO: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function updateInvestment(id, next) {
    setInvestments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: next.title.trim(),
              sector: next.sector.trim(),
              location: next.location.trim(),
              requiredCapital: next.requiredCapital,
              roi: next.roi,
              description: next.description.trim(),
              status: next.status,
              updatedAtISO: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function deleteInvestment(id) {
    setInvestments((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      title: form.title,
      sector: form.sector,
      location: form.location,
      requiredCapital: form.requiredCapital,
      roi: form.roi,
      description: form.description,
      status: form.status,
    };

    if (!payload.title.trim() || !payload.location.trim()) return;

    if (mode === "add") {
      addInvestment(payload);
      resetDialog();
      return;
    }

    if (mode === "edit" && activeId) {
      updateInvestment(activeId, payload);
      resetDialog();
    }
  }

  const dialogTitle = (() => {
    if (mode === "add") return "Add Investment Opportunity";
    if (mode === "edit") return "Edit Investment Opportunity";
    return "Investment Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add")
      return "Capture a new investment opportunity for Bishoftu (mock data only).";
    if (mode === "edit")
      return "Refine headline figures and positioning before publishing.";
    return "Review the full investment profile as decision-makers will see it.";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Investment</h1>
          <p className="text-muted-foreground">
            Curate investment-ready projects with clear capital needs and
            returns.
          </p>
        </div>

        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Investment
        </Button>
      </div>

      {/* Table/Card */}
      <div className="overflow-hidden rounded-xl bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-display text-lg font-semibold">
            Investment Pipeline
          </h2>
          <p className="text-sm text-muted-foreground">
            {investments.length} opportunity
            {investments.length === 1 ? "" : "ies"}
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Sector</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">
                    Required Capital (USD)
                  </th>
                  <th className="pb-3 font-medium">Target ROI</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {investments.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4 font-medium text-foreground">
                      {item.title}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.sector}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.location}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      ${item.requiredCapital.toLocaleString()}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.roi}%
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
                          aria-label={`View ${item.title}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          aria-label={`Edit ${item.title}`}
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${item.title}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove investment?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove <b>{item.title}</b> from the
                                pipeline (local state only in this demo).
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteInvestment(item.id)}
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

                {investments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No investment opportunities yet. Click “Add Investment” to
                      capture one.
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
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Lakeside Resort Development"
                  autoFocus={!readOnly}
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Input
                  id="sector"
                  value={form.sector}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sector: e.target.value }))
                  }
                  placeholder="Hospitality & Tourism"
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
                placeholder="Bishoftu, Ethiopia"
                disabled={readOnly}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="requiredCapital">Required Capital (USD)</Label>
                <Input
                  id="requiredCapital"
                  type="number"
                  min={0}
                  value={form.requiredCapital}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      requiredCapital: Number(e.target.value) || 0,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roi">Target ROI (%)</Label>
                <Input
                  id="roi"
                  type="number"
                  min={0}
                  step={0.1}
                  value={form.roi}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      roi: Number(e.target.value) || 0,
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
                      status: /** @type {InvestmentStatus} */ (value),
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
                placeholder="Concise investment thesis and value proposition."
                disabled={readOnly}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={resetDialog}>
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && (
                <Button
                  type="submit"
                  disabled={!form.title.trim() || !form.location.trim()}
                >
                  {mode === "add" ? "Add Investment" : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

