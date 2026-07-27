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
import ComingSoonPlaceholder from "@/components/ComingSoonPlaceholder";

const defaultVacancyFilters: Filters = {
  department: [],
  location: [],
  sortBy: "date_desc",
  onlyInternal: false,
  onlyNew: false,
  experience: [],
  workFormat: [],
  employmentType: [],
};

const defaultProjectFilters: ProjectFilters = {
  department: [],
  location: [],
  sortBy: "date_desc",
  onlyNew: false,
  workFormat: [],
  duration: [],
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
    if (vacancyFilters.department.length > 0) list = list.filter((v) => vacancyFilters.department.includes(v.department));
    if (vacancyFilters.location.length > 0) list = list.filter((v) => vacancyFilters.location.includes(v.location));
    if (vacancyFilters.experience.length > 0) list = list.filter((v) => vacancyFilters.experience.includes(v.experience));
    if (vacancyFilters.workFormat.length > 0) list = list.filter((v) => vacancyFilters.workFormat.includes(v.workFormat));
    if (vacancyFilters.employmentType.length > 0) list = list.filter((v) => vacancyFilters.employmentType.includes(v.employmentType));
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
    if (projectFilters.department.length > 0) list = list.filter((p) => projectFilters.department.includes(p.department));
    if (projectFilters.location.length > 0) list = list.filter((p) => projectFilters.location.includes(p.location));
    if (projectFilters.workFormat.length > 0) list = list.filter((p) => projectFilters.workFormat.includes(p.workFormat));
    if (projectFilters.duration.length > 0) list = list.filter((p) => projectFilters.duration.includes(p.duration));
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

      <div className="max-w-7xl mx-auto px-6 pt-4">
        <nav className="flex items-center gap-2 mb-24" style={{ fontFamily: "'Gilroy', sans-serif", fontSize: "9pt" }}>
          <a href="#" className="underline transition-colors" style={{ color: "rgb(3,128,115)" }}>Главная</a>
          <span className="text-gray-400">—</span>
          <a href="#" className="underline transition-colors" style={{ color: "rgb(3,128,115)" }}>Расти в ТОФС</a>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          Расти в ТОФС
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex border-b border-brand-gray mt-4">
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
            Вакансии группы компаний
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
            <div className="flex items-start gap-4 bg-blue-50 border-l-4 border-brand-blue px-5 py-4 mb-6">
              <Icon name="Info" size={20} className="text-brand-blue shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed" style={{ color: "rgb(0,80,140)" }}>
                Сотрудники компании допускаются к участию в отборе на вакансии только при условии, что они отработали в текущей должности{" "}
                <span className="font-bold" style={{ fontFamily: "'Gilroy', sans-serif" }}>не менее 2 лет</span>.
              </p>
            </div>
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

        {activeTab === "projects" && <ComingSoonPlaceholder />}
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