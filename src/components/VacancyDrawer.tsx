import { useEffect } from "react";
import { Vacancy } from "@/data/vacancies";
import Icon from "@/components/ui/icon";

type Props = {
  vacancy: Vacancy | null;
  onClose: () => void;
};

function daysSince(dateStr: string): number {
  const added = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
}

export default function VacancyDrawer({ vacancy, onClose }: Props) {
  useEffect(() => {
    if (vacancy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [vacancy]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isOpen = !!vacancy;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {vacancy && <DrawerContent vacancy={vacancy} onClose={onClose} />}
      </div>
    </>
  );
}

function DrawerContent({ vacancy, onClose }: { vacancy: Vacancy; onClose: () => void }) {
  const days = daysSince(vacancy.addedDate);
  const isNew = days <= 7;

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray bg-white sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-brand-green-deep hover:bg-brand-gray transition-colors"
          aria-label="Закрыть"
        >
          <Icon name="X" size={18} />
        </button>

        <div className="flex flex-wrap gap-2 justify-end">
          {isNew && (
            <span className="inline-flex items-center gap-1 bg-brand-green text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
              <Icon name="Sparkles" size={11} />
              Новое
            </span>
          )}
          {vacancy.isInternal && (
            <span className="inline-flex items-center gap-1 border border-brand-blue text-brand-blue text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
              <Icon name="Lock" size={11} />
              Только внутренний отбор
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {vacancy.image && (
          <div className="h-52 overflow-hidden">
            <img
              src={vacancy.image}
              alt={vacancy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="px-8 pt-7 pb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">
            {vacancy.department}
          </p>
          <h2 className="text-2xl font-bold text-brand-green-deep leading-snug mb-6">
            {vacancy.title}
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-7">
            <div className="bg-gray-50 border border-brand-gray px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Локация</p>
              <div className="flex items-center gap-1.5">
                <Icon name="MapPin" size={13} className="text-brand-green" />
                <p className="text-sm font-semibold text-brand-green-deep">{vacancy.location}</p>
              </div>
            </div>
            <div className="bg-gray-50 border border-brand-gray px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Формат</p>
              <div className="flex items-center gap-1.5">
                <Icon name="Monitor" size={13} className="text-brand-green" />
                <p className="text-sm font-semibold text-brand-green-deep">{vacancy.format}</p>
              </div>
            </div>
            {vacancy.salary && (
              <div className="bg-gray-50 border border-brand-gray px-4 py-3">
                <p className="text-xs text-gray-400 mb-0.5">Вознаграждение</p>
                <div className="flex items-center gap-1.5">
                  <Icon name="Banknote" size={13} className="text-brand-green" />
                  <p className="text-sm font-semibold text-brand-green-deep">{vacancy.salary}</p>
                </div>
              </div>
            )}
            <div className="bg-gray-50 border border-brand-gray px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Добавлено</p>
              <div className="flex items-center gap-1.5">
                <Icon name="Calendar" size={13} className="text-brand-green" />
                <p className="text-sm font-semibold text-brand-green-deep font-mono">
                  {new Date(vacancy.addedDate).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-7">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-green inline-block" />
              О вакансии
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{vacancy.description}</p>
          </div>

          <div className="mb-7">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-green inline-block" />
              Обязанности
            </h3>
            <ul className="space-y-2.5">
              {vacancy.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-green-dark inline-block" />
              Требования
            </h3>
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
      </div>

      <div className="px-8 py-5 border-t border-brand-gray bg-white sticky bottom-0">
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          Отправьте резюме и сопроводительное письмо на адрес:
        </p>
        <div className="flex gap-3">
          <a
            href={`mailto:${vacancy.contactEmail}?subject=Отклик на вакансию: ${vacancy.title}`}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-green text-white font-bold text-sm py-3 px-4 hover:bg-brand-green-dark transition-colors"
          >
            <Icon name="Mail" size={16} />
            Отправить резюме
          </a>
          <button
            onClick={onClose}
            className="px-5 py-3 border border-brand-gray text-sm font-semibold text-gray-600 hover:border-brand-green-deep hover:text-brand-green-deep transition-colors"
          >
            Закрыть
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 font-mono mt-2">{vacancy.contactEmail}</p>
      </div>
    </>
  );
}
