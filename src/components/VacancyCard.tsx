import { Vacancy } from "@/data/vacancies";
import Icon from "@/components/ui/icon";

type Props = {
  vacancy: Vacancy;
  onOpen: (id: number) => void;
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

export default function VacancyCard({ vacancy, onOpen }: Props) {
  const days = daysSince(vacancy.addedDate);
  const isNew = days <= 7;

  return (
    <div className="group bg-white border border-brand-gray hover:border-brand-green transition-all duration-200 flex flex-col h-full hover:shadow-lg relative">
      <span
        className="absolute top-3 right-3 z-10 text-xs font-medium text-gray-600 px-2.5 py-1 rounded-full"
        style={{ backgroundColor: "rgb(217,217,217)" }}
      >
        {vacancy.department}
      </span>

      {vacancy.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={vacancy.image}
            alt={vacancy.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="h-8 flex flex-wrap items-center gap-2 mb-4">
          {isNew && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-green text-white" title="Новая вакансия">
              <Icon name="Sparkles" size={14} />
            </span>
          )}
          {vacancy.isInternal && (
            <span className="inline-flex items-center gap-1 border border-brand-blue text-brand-blue text-xs font-semibold px-2.5 py-1 uppercase tracking-wider">
              <Icon name="Lock" size={11} />
              Только внутренний отбор
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-semibold text-brand-green-deep leading-snug mb-3 group-hover:text-brand-green transition-colors">
          {vacancy.title}
        </h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon name="MapPin" size={13} />
            <span>{vacancy.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon name="Monitor" size={13} />
            <span>{vacancy.format}</span>
          </div>
          {vacancy.salary && (
            <div className="flex items-center gap-2 text-sm font-medium text-brand-green-deep">
              <Icon name="Banknote" size={13} />
              <span>{vacancy.salary}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5 flex-1">
          {vacancy.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-gray">
          <span className="text-xs text-gray-400 font-mono">
            {days === 0 ? "Сегодня" : `${days} д. назад`}
          </span>
          <button
            onClick={() => onOpen(vacancy.id)}
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