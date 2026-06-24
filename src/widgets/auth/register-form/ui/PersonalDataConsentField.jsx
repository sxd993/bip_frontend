import { Link } from "react-router-dom";
import { Field } from "@/shared/ui/Field";
import { validationRules } from "@/shared/utils/validators";

export const PersonalDataConsentField = ({ register, error }) => (
  <Field error={error}>
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 rounded border-border text-primary accent-primary focus:ring-primary"
        {...register("personalDataConsent", validationRules.personalDataConsent)}
      />
      <span className="text-sm leading-relaxed text-text-muted">
        Я согласен на{" "}
        <Link
          to="/#"
          onClick={(event) => event.stopPropagation()}
          className="text-primary transition-colors hover:text-primary-hover"
        >
          обработку персональных данных
        </Link>
      </span>
    </label>
  </Field>
);
