import { useState, useRef, useEffect } from "react";
import { DEPARTMENTS, LOCATIONS, EXPERIENCE_OPTIONS, WORK_FORMAT_OPTIONS, EMPLOYMENT_TYPE_OPTIONS } from "@/data/vacancies";
import Icon from "@/components/ui/icon";

export type Filters = {
  department: string[];
  location: string[];
  sortBy: "date_desc" | "date_asc";
  onlyInternal: boolean;
  onlyNew: boolean;
  experience: string[];
  workFormat: string[];
  employmentType: string[];
};

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
};

const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

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

export default function VacancyFilters({ filters, onChange, total }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.department.length > 0,
    filters.location.length > 0,
    filters.onlyInternal,
    filters.onlyNew,
    filters.experience.length > 0,
    filters.workFormat.length > 0,
    filters.employmentType.length > 0,
  ].filter(Boolean).length;

  const reset = () =>
    onChange({
      department: [],
      location: [],
      sortBy: "date_desc",
      onlyInternal: false,
      onlyNew: false,
      experience: [],
      workFormat: [],
      employmentType: [],
    });

  return (
    <div className="bg-white border border-brand-gray p-5 mb-8 flex flex-col gap-3">
      <div className="flex items-end gap-3 w-full">

        <MultiSelect
          label="Департамент"
          options={DEPARTMENTS.filter((d) => d !== "Все")}
          selected={filters.department}
          onChange={(v) => set({ department: v })}
        />

        <MultiSelect
          label="Локация"
          options={LOCATIONS.filter((l) => l !== "Все" && l !== "Удалённо")}
          selected={filters.location}
          onChange={(v) => set({ location: v })}
        />

        <MultiSelect
          label="Опыт работы"
          options={EXPERIENCE_OPTIONS.filter((o) => o !== "Любой")}
          selected={filters.experience}
          onChange={(v) => set({ experience: v })}
        />

        <MultiSelect
          label="Формат работы"
          options={WORK_FORMAT_OPTIONS.filter((o) => o !== "Любой")}
          selected={filters.workFormat}
          onChange={(v) => set({ workFormat: v })}
        />

        <MultiSelect
          label="Тип занятости"
          options={EMPLOYMENT_TYPE_OPTIONS.filter((o) => o !== "Любой" && o !== "Проектная работа")}
          selected={filters.employmentType}
          onChange={(v) => set({ employmentType: v })}
        />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <label className={labelClass}>Сортировка</label>
          <select
            value={filters.sortBy}
            onChange={(e) => set({ sortBy: e.target.value as Filters["sortBy"] })}
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

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => set({ onlyInternal: !filters.onlyInternal })}
              className={`w-10 h-5 relative rounded-full transition-colors cursor-pointer ${filters.onlyInternal ? "bg-brand-green" : "bg-brand-gray"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${filters.onlyInternal ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-brand-green-deep font-medium whitespace-nowrap">Только внутренние</span>
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
            {total} {total === 1 ? "вакансия" : total < 5 ? "вакансии" : "вакансий"}
          </span>
        </div>
      </div>

    </div>
  );
}