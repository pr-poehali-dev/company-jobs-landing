import { useState, useRef, useEffect } from "react";
import {
  PROJECT_DEPARTMENTS,
  PROJECT_LOCATIONS,
  PROJECT_WORK_FORMAT_OPTIONS,
  PROJECT_DURATION_OPTIONS,
} from "@/data/projects";
import Icon from "@/components/ui/icon";

export type ProjectFilters = {
  department: string[];
  location: string[];
  sortBy: "date_desc" | "date_asc";
  onlyNew: boolean;
  workFormat: string[];
  duration: string[];
  showArchived: boolean;
};

type Props = {
  filters: ProjectFilters;
  onChange: (f: ProjectFilters) => void;
  total: number;
};

const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

const LOCATION_OPTIONS = PROJECT_LOCATIONS.filter((l) => l !== "Удалённо" && l !== "Все регионы" && l !== "Все");

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };

  const displayLabel =
    selected.length === 0 ? "Все" : selected.length === 1 ? selected[0] : `${selected[0]} +${selected.length - 1}`;

  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0 relative" ref={ref}>
      <label className={labelClass}>{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-2 border border-brand-gray bg-white text-sm text-brand-green-deep px-3 py-2 rounded-full focus:outline-none focus:border-brand-green w-full"
      >
        <span className="truncate">{displayLabel}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={14} className="shrink-0 text-gray-400" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-brand-gray rounded-lg shadow-lg z-50 min-w-full py-1">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="accent-brand-green w-3.5 h-3.5 shrink-0"
              />
              <span className="text-sm text-brand-green-deep whitespace-nowrap">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectFiltersPanel({ filters, onChange, total }: Props) {
  const set = (patch: Partial<ProjectFilters>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.department.length > 0,
    filters.location.length > 0,
    filters.onlyNew,
    filters.workFormat.length > 0,
    filters.duration.length > 0,
  ].filter(Boolean).length;

  const reset = () =>
    onChange({
      department: [],
      location: [],
      sortBy: "date_desc",
      onlyNew: false,
      workFormat: [],
      duration: [],
      showArchived: false,
    });

  return (
    <div className="bg-white border border-brand-gray p-5 mb-8 flex flex-col gap-3">
      <div className="flex items-end gap-3 w-full">

        <MultiSelect
          label="Направления"
          options={PROJECT_DEPARTMENTS.filter((d) => d !== "Все")}
          selected={filters.department}
          onChange={(v) => set({ department: v })}
        />

        <MultiSelect
          label="Формат работы"
          options={PROJECT_WORK_FORMAT_OPTIONS.filter((o) => o !== "Все")}
          selected={filters.workFormat}
          onChange={(v) => set({ workFormat: v })}
        />

        <MultiSelect
          label="Локация"
          options={LOCATION_OPTIONS}
          selected={filters.location}
          onChange={(v) => set({ location: v })}
        />

        <MultiSelect
          label="Длительность"
          options={PROJECT_DURATION_OPTIONS.filter((o) => o !== "Любая")}
          selected={filters.duration}
          onChange={(v) => set({ duration: v })}
        />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <label className={labelClass}>Сортировка</label>
          <select
            value={filters.sortBy}
            onChange={(e) => set({ sortBy: e.target.value as ProjectFilters["sortBy"] })}
            className="border border-brand-gray bg-white text-sm text-brand-green-deep px-3 py-2 rounded-full focus:outline-none focus:border-brand-green w-full"
          >
            <option value="date_desc">Сначала новые</option>
            <option value="date_asc">Сначала старые</option>
          </select>
        </div>

      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => set({ onlyNew: !filters.onlyNew })}
              className={`w-10 h-5 relative rounded-full transition-colors cursor-pointer ${filters.onlyNew ? "bg-brand-green" : "bg-brand-gray"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${filters.onlyNew ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-brand-green-deep font-medium whitespace-nowrap">Только новые</span>
          </label>


        </div>

        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green-deep transition-colors whitespace-nowrap">
              <Icon name="X" size={14} />
              Сбросить фильтры
            </button>
          )}
          <span className="text-sm font-bold text-brand-green-deep bg-brand-gray px-4 py-1.5 rounded-full font-sans whitespace-nowrap">
            {total} {total === 1 ? "проект" : total < 5 ? "проекта" : "проектов"}
          </span>
        </div>
      </div>

    </div>
  );
}