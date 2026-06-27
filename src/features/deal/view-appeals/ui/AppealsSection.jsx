import { useNavigate } from "react-router-dom";
import AppealCard from "./AppealCard";
import { useAppealsSection } from "../model/useAppealsSection";
import { APPEALS_SECTION_VARIANTS } from "./appealsSectionConfig";
import { Loading } from "@/shared/ui/Loading";
import { Button } from "@/shared/ui/Button";

const AppealsSection = ({ variant = "active" }) => {
  const navigate = useNavigate();
  const config = APPEALS_SECTION_VARIANTS[variant] ?? APPEALS_SECTION_VARIANTS.active;
  const { paginatedAppeals, pagination, isLoading, error } = useAppealsSection({
    closed: config.closed,
  });

  const {
    totalAppeals,
    totalPages,
    currentPage,
    goToPrevPage,
    goToNextPage,
    goToPage,
  } = pagination;

  const shouldShowPagination = totalPages > 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">Ошибка загрузки: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <h2 className="text-lg font-semibold text-text sm:text-xl lg:text-xl">
            {config.title}
          </h2>
          <p className="mt-1 text-sm text-text-muted sm:text-base lg:text-sm">
            {totalAppeals === 0
              ? config.emptySubtitle
              : `Всего обращений: ${totalAppeals}`}
          </p>
        </div>
        {config.showCreateButton && (
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="w-full max-w-xs shrink-0 sm:w-auto lg:self-auto"
          >
            Создать обращение
          </Button>
        )}
      </div>

      {totalAppeals === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-background px-6 py-14 text-center">
          <div className="mx-auto mb-5 h-14 w-14 text-text-muted">
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-base font-medium text-text sm:text-lg lg:text-lg">
            {config.emptyTitle}
          </h3>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-muted sm:text-base lg:text-sm">
            {config.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginatedAppeals.map((appeal) => (
            <AppealCard key={appeal.id} appeal={appeal} />
          ))}
        </div>
      )}

      {shouldShowPagination && (
        <div className="mt-6 flex justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-3 py-2"
            >
              Назад
            </Button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition",
                  page === currentPage
                    ? "bg-primary font-medium text-on-primary"
                    : "border border-border text-text hover:border-primary",
                ].join(" ")}
              >
                {page}
              </button>
            ))}
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2"
            >
              Вперед
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppealsSection;
