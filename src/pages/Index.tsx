import { useState, useMemo } from "react";
import { vacancies } from "@/data/vacancies";
import VacancyCard from "@/components/VacancyCard";
import VacancyFilters, { Filters } from "@/components/VacancyFilters";
import VacancyDetail from "@/components/VacancyDetail";
import Icon from "@/components/ui/icon";

const defaultFilters: Filters = {
  department: "Все",
  location: "Все",
  sortBy: "date_desc",
  onlyInternal: false,
  onlyNew: false,
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

const Index = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [openId, setOpenId] = useState<number | null>(null);

  const openVacancy = vacancies.find((v) => v.id === openId) ?? null;

  const filtered = useMemo(() => {
    let list = [...vacancies];

    if (filters.department !== "Все") {
      list = list.filter((v) => v.department === filters.department);
    }
    if (filters.location !== "Все") {
      list = list.filter((v) => v.location === filters.location);
    }
    if (filters.onlyNew) {
      list = list.filter((v) => daysSince(v.addedDate) <= 7);
    }
    if (filters.onlyInternal) {
      list = list.filter((v) => v.isInternal);
    }

    list.sort((a, b) => {
      const da = new Date(a.addedDate).getTime();
      const db = new Date(b.addedDate).getTime();
      return filters.sortBy === "date_desc" ? db - da : da - db;
    });

    return list;
  }, [filters]);

  const newCount = vacancies.filter((v) => daysSince(v.addedDate) <= 7).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-brand-green-deep text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-green flex items-center justify-center">
                <Icon name="Briefcase" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide leading-none">
                  Карьера внутри компании
                </p>
                <p className="text-xs text-white/50 leading-none mt-0.5 font-mono">
                  внутренний портал вакансий
                </p>
              </div>
            </div>
            {newCount > 0 && (
              <div className="flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs font-medium text-brand-green">
                  {newCount} {newCount === 1 ? "новая вакансия" : "новые вакансии"}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="border-b border-brand-gray bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {openVacancy ? (
            <div>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">
                Вакансия
              </p>
              <h1 className="text-xl font-bold text-brand-green-deep">{openVacancy.title}</h1>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">
                Открытые позиции
              </p>
              <h1 className="text-2xl font-bold text-brand-green-deep">Вакансии компании</h1>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {openVacancy ? (
          <VacancyDetail vacancy={openVacancy} onBack={() => setOpenId(null)} />
        ) : (
          <>
            <VacancyFilters filters={filters} onChange={setFilters} total={filtered.length} />

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 bg-brand-gray flex items-center justify-center mb-4">
                  <Icon name="SearchX" size={24} className="text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-brand-green-deep mb-2">
                  Вакансий не найдено
                </p>
                <p className="text-sm text-gray-500 mb-5">
                  Попробуйте изменить условия фильтрации
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="text-sm text-brand-green hover:underline"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((v) => (
                  <VacancyCard key={v.id} vacancy={v} onOpen={setOpenId} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-brand-gray bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="text-xs text-gray-400 font-mono">
            Внутренний портал вакансий · {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-400">
            По вопросам:{" "}
            <a href="mailto:hr@company.ru" className="text-brand-green hover:underline">
              hr@company.ru
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
