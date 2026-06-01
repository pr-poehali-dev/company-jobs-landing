type NavItem = { label: string; active?: boolean };

const NAV_LINKS: NavItem[] = [
  { label: "Новости" },
  { label: "Лекции и вебинары" },
  { label: "Опросы" },
  { label: "Политики группы компаний" },
  { label: "Устойчивое развитие" },
  { label: "Медиатека" },
  { label: "Расти в ТОФС", active: true },
  { label: "HR портал" },
];

export default function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">

        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-9 h-9 rounded-full shrink-0"
            style={{ background: "linear-gradient(135deg, rgb(3,190,147) 50%, rgb(0,120,190) 50%)" }}
          />
          <span
            className="text-sm font-bold text-gray-800 whitespace-nowrap"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Компания
          </span>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-end h-full">
          {NAV_LINKS.map(({ label, active }) => (
            <a
              key={label}
              href="#"
              className="underline whitespace-nowrap transition-colors hover:opacity-75 flex items-center h-full relative"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                fontWeight: 700,
                fontSize: "9pt",
                color: active ? "rgb(3,190,147)" : label === "HR портал" ? "rgb(3,128,115)" : "rgb(55,65,81)",
                boxShadow: active ? "inset 0 -3px 0 rgb(3,190,147)" : "none",
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="#"
            aria-label="Telegram"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-80 shrink-0"
            style={{ backgroundColor: "rgb(3,128,115)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>

      </div>
    </nav>
  );
}