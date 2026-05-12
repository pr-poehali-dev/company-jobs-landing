import { useState, useMemo } from "react";
import { vacancies, Vacancy } from "@/data/vacancies";
import { projects, Project } from "@/data/projects";
import VacancyCard from "@/components/VacancyCard";
import VacancyFilters, { Filters } from "@/components/VacancyFilters";
import VacancyDrawer from "@/components/VacancyDrawer";
import ProjectCard from "@/components/ProjectCard";
import ProjectFiltersPanel, { ProjectFilters } from "@/components/ProjectFilters";
import ProjectDrawer from "@/components/ProjectDrawer";
import TopNav from "@/components/TopNav";
import Icon from "@/components/ui/icon";

const defaultVacancyFilters: Filters = {
  department: "Все",
  location: "Все",
  sortBy: "date_desc",
  onlyInternal: false,
  onlyNew: false,
  experience: "Любой",
  workFormat: "Любой",
  employmentType: "Любой",
};

const defaultProjectFilters: ProjectFilters = {
  department: "Все",
  location: "Все",
  sortBy: "date_desc",
  onlyNew: false,
  experience: "Не имеет значения",
  workFormat: "Все",
  duration: "Любая",
  showArchived: false,
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

type Tab = "vacancies" | "projects";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("vacancies");

  const [vacancyFilters, setVacancyFilters] = useState<Filters>(defaultVacancyFilters);
  const [openVacancy, setOpenVacancy] = useState<Vacancy | null>(null);

  const [projectFilters, setProjectFilters] = useState<ProjectFilters>(defaultProjectFilters);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filteredVacancies = useMemo(() => {
    let list = [...vacancies];
    if (vacancyFilters.department !== "Все") list = list.filter((v) => v.department === vacancyFilters.department);
    if (vacancyFilters.location !== "Все") list = list.filter((v) => v.location === vacancyFilters.location);
    if (vacancyFilters.experience !== "Любой") list = list.filter((v) => v.experience === vacancyFilters.experience);
    if (vacancyFilters.workFormat !== "Любой") list = list.filter((v) => v.workFormat === vacancyFilters.workFormat);
    if (vacancyFilters.employmentType !== "Любой") list = list.filter((v) => v.employmentType === vacancyFilters.employmentType);
    if (vacancyFilters.onlyNew) list = list.filter((v) => daysSince(v.addedDate) <= 7);
    if (vacancyFilters.onlyInternal) list = list.filter((v) => v.isInternal);
    list.sort((a, b) => {
      const da = new Date(a.addedDate).getTime();
      const db = new Date(b.addedDate).getTime();
      return vacancyFilters.sortBy === "date_desc" ? db - da : da - db;
    });
    return list;
  }, [vacancyFilters]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (!projectFilters.showArchived) list = list.filter((p) => !p.isArchived);
    else list = list.filter((p) => p.isArchived);
    if (projectFilters.department !== "Все") list = list.filter((p) => p.department === projectFilters.department);
    if (projectFilters.location !== "Все") list = list.filter((p) => p.location === projectFilters.location);
    if (projectFilters.experience !== "Не имеет значения") list = list.filter((p) => p.experience === projectFilters.experience);
    if (projectFilters.workFormat !== "Все") list = list.filter((p) => p.workFormat === projectFilters.workFormat);
    if (projectFilters.duration !== "Любая") list = list.filter((p) => p.duration === projectFilters.duration);
    if (projectFilters.onlyNew) list = list.filter((p) => daysSince(p.addedDate) <= 7);
    list.sort((a, b) => {
      const da = new Date(a.addedDate).getTime();
      const db = new Date(b.addedDate).getTime();
      return projectFilters.sortBy === "date_desc" ? db - da : da - db;
    });
    return list;
  }, [projectFilters]);

  const newVacanciesCount = vacancies.filter((v) => daysSince(v.addedDate) <= 7).length;

  const handleOpenVacancy = (id: number) => {
    setOpenVacancy(vacancies.find((v) => v.id === id) ?? null);
  };

  const handleOpenProject = (id: number) => {
    setOpenProject(projects.find((p) => p.id === id) ?? null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopNav />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <nav className="flex items-center gap-2" style={{ fontFamily: "'Gilroy', sans-serif", fontSize: "9pt" }}>
            <a href="#" className="underline transition-colors" style={{ color: "rgb(3,128,115)" }}>Главная</a>
            <span className="text-gray-400">—</span>
            <a href="#" className="underline transition-colors" style={{ color: "rgb(3,128,115)" }}>Вакансии группы компаний</a>
          </nav>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Вакансии группы компаний
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex border-b border-brand-gray mt-6">
          <button
            onClick={() => setActiveTab("vacancies")}
            className="flex-1 py-3.5 text-sm transition-colors border-b-2 -mb-px"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: activeTab === "vacancies" ? 700 : 400,
              backgroundColor: activeTab === "vacancies" ? "rgb(213,232,229)" : "transparent",
              borderBottomColor: activeTab === "vacancies" ? "rgb(213,232,229)" : "transparent",
              color: activeTab === "vacancies" ? "#1a3a2f" : "#6b7280",
            }}
          >
            Вакансии компании
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className="flex-1 py-3.5 text-sm transition-colors border-b-2 -mb-px"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: activeTab === "projects" ? 700 : 400,
              backgroundColor: activeTab === "projects" ? "rgb(213,232,229)" : "transparent",
              borderBottomColor: activeTab === "projects" ? "rgb(213,232,229)" : "transparent",
              color: activeTab === "projects" ? "#1a3a2f" : "#6b7280",
            }}
          >
            Маркетплейс проектов
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === "vacancies" && (
          <>
            <VacancyFilters filters={vacancyFilters} onChange={setVacancyFilters} total={filteredVacancies.length} />
            {filteredVacancies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 bg-brand-gray flex items-center justify-center mb-4">
                  <Icon name="SearchX" size={24} className="text-gray-400" />
                </div>
                <p className="text-lg font-bold text-brand-green-deep mb-2">Вакансий не найдено</p>
                <p className="text-sm text-gray-500 mb-5">Попробуйте изменить условия фильтрации</p>
                <button
                  onClick={() => setVacancyFilters(defaultVacancyFilters)}
                  className="text-sm text-brand-green hover:underline font-semibold"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVacancies.map((v) => (
                  <VacancyCard key={v.id} vacancy={v} onOpen={handleOpenVacancy} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "projects" && (
          <>
            <ProjectFiltersPanel filters={projectFilters} onChange={setProjectFilters} total={filteredProjects.length} />
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 bg-brand-gray flex items-center justify-center mb-4">
                  <Icon name="SearchX" size={24} className="text-gray-400" />
                </div>
                <p className="text-lg font-bold text-brand-green-deep mb-2">Проектов не найдено</p>
                <p className="text-sm text-gray-500 mb-5">Попробуйте изменить условия фильтрации</p>
                <button
                  onClick={() => setProjectFilters(defaultProjectFilters)}
                  className="text-sm text-brand-green hover:underline font-semibold"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={handleOpenProject} />
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
            <a href="mailto:hr@company.ru" className="text-brand-green hover:underline font-semibold">
              hr@company.ru
            </a>
          </p>
        </div>
      </footer>

      <VacancyDrawer vacancy={openVacancy} onClose={() => setOpenVacancy(null)} />
      <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  );
};

export default Index;