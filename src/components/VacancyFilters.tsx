import { DEPARTMENTS, LOCATIONS, EXPERIENCE_OPTIONS, WORK_FORMAT_OPTIONS, EMPLOYMENT_TYPE_OPTIONS } from "@/data/vacancies";
import Icon from "@/components/ui/icon";

export type Filters = {
  department: string;
  location: string;
  sortBy: "date_desc" | "date_asc";
  onlyInternal: boolean;
  onlyNew: boolean;
  experience: string;
  workFormat: string;
  employmentType: string;
};

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
};

const selectClass = "border border-brand-gray bg-white text-sm text-brand-green-deep px-3 py-2 rounded-full focus:outline-none focus:border-brand-green";
const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

export default function VacancyFilters({ filters, onChange, total }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const activeCount = [
    filters.department !== "Все",
    filters.location !== "Все",
    filters.onlyInternal,
    filters.onlyNew,
    filters.experience !== "Любой",
    filters.workFormat !== "Любой",
    filters.employmentType !== "Любой",
  ].filter(Boolean).length;

  const reset = () =>
    onChange({
      department: "Все",
      location: "Все",
      sortBy: "date_desc",
      onlyInternal: false,
      onlyNew: false,
      experience: "Любой",
      workFormat: "Любой",
      employmentType: "Любой",
    });

  return (
    <div className="bg-white border border-brand-gray p-5 mb-8">
      <div className="flex flex-wrap items-end gap-4">

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Департамент</label>
          <select value={filters.department} onChange={(e) => set({ department: e.target.value })} className={selectClass}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Локация</label>
          <select value={filters.location} onChange={(e) => set({ location: e.target.value })} className={selectClass}>
            {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className={labelClass}>Опыт работы</label>
          <select value={filters.experience} onChange={(e) => set({ experience: e.target.value })} className={selectClass}>
            {EXPERIENCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[200px]">
          <label className={labelClass}>Формат работы</label>
          <select value={filters.workFormat} onChange={(e) => set({ workFormat: e.target.value })} className={selectClass}>
            {WORK_FORMAT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[200px]">
          <label className={labelClass}>Тип занятости</label>
          <select value={filters.employmentType} onChange={(e) => set({ employmentType: e.target.value })} className={selectClass}>
            {EMPLOYMENT_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className={labelClass}>Сортировка</label>
          <select value={filters.sortBy} onChange={(e) => set({ sortBy: e.target.value as Filters["sortBy"] })} className={selectClass}>
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
              onClick={() => set({ onlyInternal: !filters.onlyInternal })}
              className={`w-10 h-5 relative rounded-full transition-colors cursor-pointer ${filters.onlyInternal ? "bg-brand-green" : "bg-brand-gray"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${filters.onlyInternal ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-brand-green-deep font-medium">Внутренний отбор</span>
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
            {total} {total === 1 ? "вакансия" : total < 5 ? "вакансии" : "вакансий"}
          </span>
        </div>

      </div>
    </div>
  );
}
