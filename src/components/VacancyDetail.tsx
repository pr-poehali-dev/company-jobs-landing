import { Vacancy } from "@/data/vacancies";
import Icon from "@/components/ui/icon";

type Props = {
  vacancy: Vacancy;
  onBack: () => void;
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

export default function VacancyDetail({ vacancy, onBack }: Props) {
  const days = daysSince(vacancy.addedDate);
  const isNew = days <= 7;

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green-deep transition-colors mb-8"
      >
        <Icon name="ArrowLeft" size={16} />
        Назад к вакансиям
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-5">
            {isNew && (
              <span className="inline-flex items-center gap-1 bg-brand-green text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-wider">
                <Icon name="Sparkles" size={11} />
                Новое
              </span>
            )}
            {vacancy.isInternal && (
              <span className="inline-flex items-center gap-1 border border-brand-blue text-brand-blue text-xs font-semibold px-2.5 py-1 uppercase tracking-wider">
                <Icon name="Lock" size={11} />
                Только внутренний отбор
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-brand-green-deep leading-tight mb-6">
            {vacancy.title}
          </h1>

          {vacancy.image && (
            <img
              src={vacancy.image}
              alt={vacancy.title}
              className="w-full h-60 object-cover mb-8 border border-brand-gray"
            />
          )}

          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-brand-green inline-block" />
              О вакансии
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">{vacancy.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-brand-green inline-block" />
              Обязанности
            </h2>
            <ul className="space-y-2.5">
              {vacancy.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-brand-green inline-block" />
              Требования
            </h2>
            <ul className="space-y-2.5">
              {vacancy.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green-dark flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-brand-gray p-6 sticky top-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
              Детали вакансии
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Building2" size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Департамент</p>
                  <p className="text-sm font-medium text-brand-green-deep">{vacancy.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Локация</p>
                  <p className="text-sm font-medium text-brand-green-deep">{vacancy.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Monitor" size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Формат работы</p>
                  <p className="text-sm font-medium text-brand-green-deep">{vacancy.format}</p>
                </div>
              </div>

              {vacancy.salary && (
                <div className="flex items-start gap-3">
                  <Icon name="Banknote" size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Вознаграждение</p>
                    <p className="text-sm font-medium text-brand-green-deep">{vacancy.salary}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Icon name="Calendar" size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Дата добавления</p>
                  <p className="text-sm font-medium text-brand-green-deep font-mono">
                    {new Date(vacancy.addedDate).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-gray pt-5">
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Для отклика на вакансию отправьте резюме и сопроводительное письмо на:
              </p>
              <a
                href={`mailto:${vacancy.contactEmail}?subject=Отклик на вакансию: ${vacancy.title}`}
                className="flex items-center justify-center gap-2 w-full bg-brand-green text-white font-semibold text-sm py-3 px-4 hover:bg-brand-green-dark transition-colors"
              >
                <Icon name="Mail" size={16} />
                Отправить резюме
              </a>
              <p className="text-center text-xs text-gray-400 font-mono mt-2">{vacancy.contactEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
