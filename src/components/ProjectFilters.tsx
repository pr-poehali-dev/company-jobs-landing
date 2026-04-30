import {
  PROJECT_CATEGORIES,
  PROJECT_LOCATIONS,
  PROJECT_DEPARTMENTS,
  PROJECT_EXPERIENCE_OPTIONS,
  PROJECT_WORK_FORMAT_OPTIONS,
  PROJECT_DURATION_OPTIONS,
} from "@/data/projects";
import Icon from "@/components/ui/icon";

export type ProjectFilters = {
  category: string;
  department: string;
  location: string;
  sortBy: "date_desc" | "date_asc";
  onlyNew: boolean;
  experience: string;
  workFormat: string;
  duration: string;
  showArchived: boolean;
};

type Props = {
  filters: ProjectFilters;
  onChange: (f: ProjectFilters) => void;
  total: number;
};

const selectClass = "border border-brand-gray bg-white text-sm text-brand-green-deep px-3 py-2 rounded-full focus:outline-none focus:border-brand-green";
const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

export default function ProjectFiltersPanel({ filters, onChange, total }: Props) {
  const set = (patch: Partial<ProjectFilters>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.category !== "Все",
    filters.department !== "Все",
    filters.location !== "Все",
    filters.onlyNew,
    filters.experience !== "Не имеет значения",
    filters.workFormat !== "Все",
    filters.duration !== "Любая",
  ].filter(Boolean).length;

  const reset = () =>
    onChange({
      category: "Все",
      department: "Все",
      location: "Все",
      sortBy: "date_desc",
      onlyNew: false,
      experience: "Не имеет значения",
      workFormat: "Все",
      duration: "Любая",
      showArchived: false,
    });

  return (
    <div className="bg-white border border-brand-gray p-5 mb-8">
      <div className="flex flex-wrap items-end gap-4">

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Категория</label>
          <select value={filters.category} onChange={(e) => set({ category: e.target.value })} className={selectClass}>
            {PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className={labelClass}>Департамент</label>
          <select value={filters.department} onChange={(e) => set({ department: e.target.value })} className={selectClass}>
            {PROJECT_DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Локация</label>
          <select value={filters.location} onChange={(e) => set({ location: e.target.value })} className={selectClass}>
            {PROJECT_LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[200px]">
          <label className={labelClass}>Требуемый опыт</label>
          <select value={filters.experience} onChange={(e) => set({ experience: e.target.value })} className={selectClass}>
            {PROJECT_EXPERIENCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[190px]">
          <label className={labelClass}>Формат работы</label>
          <select value={filters.workFormat} onChange={(e) => set({ workFormat: e.target.value })} className={selectClass}>
            {PROJECT_WORK_FORMAT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[190px]">
          <label className={labelClass}>Длительность</label>
          <select value={filters.duration} onChange={(e) => set({ duration: e.target.value })} className={selectClass}>
            {PROJECT_DURATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Сортировка</label>
          <select value={filters.sortBy} onChange={(e) => set({ sortBy: e.target.value as ProjectFilters["sortBy"] })} className={selectClass}>
            <option value="date_desc">Сначала новые</option>
            <option value="date_asc">Сначала старые</option>
          </select>
        </div>

        <div className="flex items-center gap-5 pb-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => set({ onlyNew: !filters.onlyNew })}
              className={`w-10 h-5 relative rounded-full transition-colors cursor-pointer ${filters.onlyNew ? "bg-brand-green" : "bg-brand-gray"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${filters.onlyNew ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-brand-green-deep font-medium">Только новые</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => set({ showArchived: !filters.showArchived })}
              className={`w-10 h-5 relative rounded-full transition-colors cursor-pointer ${filters.showArchived ? "bg-brand-green" : "bg-brand-gray"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${filters.showArchived ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-brand-green-deep font-medium">В архиве</span>
          </label>
        </div>

        <div className="flex items-center gap-3 ml-auto pb-0.5">
          {activeCount > 0 && (
            <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green-deep transition-colors">
              <Icon name="X" size={14} />
              Сбросить фильтры
            </button>
          )}
          <span className="text-sm font-bold text-brand-green-deep bg-brand-gray px-4 py-1.5 rounded-full font-sans">
            {total} {total === 1 ? "проект" : total < 5 ? "проекта" : "проектов"}
          </span>
        </div>

      </div>
    </div>
  );
}
