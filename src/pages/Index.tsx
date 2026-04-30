import { useState, useMemo } from "react";
import { vacancies, Vacancy } from "@/data/vacancies";
import { projects, Project } from "@/data/projects";
import VacancyCard from "@/components/VacancyCard";
import VacancyFilters, { Filters } from "@/components/VacancyFilters";
import VacancyDrawer from "@/components/VacancyDrawer";
import ProjectCard from "@/components/ProjectCard";
import ProjectFiltersPanel, { ProjectFilters } from "@/components/ProjectFilters";
import ProjectDrawer from "@/components/ProjectDrawer";
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
      <header className="bg-brand-green-deep text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-green flex items-center justify-center">
                <Icon name="Briefcase" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide leading-none">
                  Карьера внутри компании
                </p>
                <p className="text-xs text-white/50 leading-none mt-0.5 font-sans">
                  вакансии компании
                </p>
              </div>
            </div>
            {newVacanciesCount > 0 && (
              <div className="flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs font-bold text-brand-green">
                  {newVacanciesCount} {newVacanciesCount === 1 ? "новая вакансия" : "новые вакансии"}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative w-full h-28 overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/7a8c2455-9630-4268-a8fb-59f94fd876e1/bucket/b0490317-9fc8-499d-a3d5-66bac707157c.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">Найди работу, которая вдохновляет!</h1>
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