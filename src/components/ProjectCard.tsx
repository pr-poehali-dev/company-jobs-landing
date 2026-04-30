import { Project } from "@/data/projects";
import Icon from "@/components/ui/icon";

type Props = {
  project: Project;
  onOpen: (id: number) => void;
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ProjectCard({ project, onOpen }: Props) {
  const days = daysSince(project.addedDate);
  const isNew = days <= 7;

  return (
    <div className="group bg-white border border-brand-gray hover:border-brand-green transition-all duration-200 flex flex-col h-full hover:shadow-lg">
      {project.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="h-8 flex items-center gap-2 mb-4">
          {isNew && !project.isArchived && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-green text-white shrink-0" title="Новый проект">
              <Icon name="Sparkles" size={14} />
            </span>
          )}
          {project.isArchived && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full shrink-0">
              <Icon name="Archive" size={11} />
              В архиве
            </span>
          )}
          <span
            className="ml-auto text-xs font-medium text-gray-600 px-2.5 py-1 rounded-full shrink-0"
            style={{ backgroundColor: "rgb(217,217,217)" }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-[15px] font-semibold text-brand-green-deep leading-snug mb-3 group-hover:text-brand-green transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon name="MapPin" size={13} />
            <span>{project.location}</span>
          </div>
          {project.participants !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Icon name="Users" size={13} />
              <span>{project.participants} участников</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-gray">
          <span className="text-xs text-gray-400 font-mono">
            {days === 0 ? "Сегодня" : `${days} д. назад`}
          </span>
          <button
            onClick={() => onOpen(project.id)}
            className="flex items-center gap-2 bg-brand-green-deep text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-green transition-colors duration-150"
          >
            Подробнее
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}