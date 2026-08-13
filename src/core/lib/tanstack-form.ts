import { FormButton } from "@/core/components/form-button/form-button";
import { FormInput } from "@/core/components/form-input/form-input";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    FormInput,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
});

export { useFieldContext, useFormContext, useAppForm };
