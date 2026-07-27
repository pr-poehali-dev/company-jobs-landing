import Icon from "@/components/ui/icon";

export default function ComingSoonPlaceholder() {
  return (
    <div className="relative w-full border border-brand-gray rounded-2xl bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(3,128,115) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8">
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: "rgba(3,190,147,0.15)" }}
          />
          <span
            className="absolute inset-3 rounded-full animate-pulse"
            style={{ backgroundColor: "rgba(3,190,147,0.12)" }}
          />
          <div
            className="absolute inset-6 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: "rgb(213,232,229)" }}
          >
            <Icon
              name="Sparkles"
              size={32}
              className="text-brand-green-deep"
            />
          </div>

          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-brand-gray shadow-sm animate-bounce"
            style={{ animationDuration: "2.4s" }}
          >
            <Icon name="Rocket" size={15} className="text-brand-green" />
          </span>
          <span
            className="absolute -bottom-1 -left-2 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-brand-gray shadow-sm animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "0.4s" }}
          >
            <Icon name="FolderKanban" size={13} className="text-brand-green" />
          </span>
        </div>

        <h3
          className="text-xl sm:text-2xl font-bold text-brand-green-deep mb-2"
          style={{ fontFamily: "'Gilroy', sans-serif" }}
        >
          Скоро здесь будут опубликованы проекты компании
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Мы готовим раздел с внутренними проектами, к которым можно будет присоединиться. Загляните позже.
        </p>
      </div>
    </div>
  );
}
