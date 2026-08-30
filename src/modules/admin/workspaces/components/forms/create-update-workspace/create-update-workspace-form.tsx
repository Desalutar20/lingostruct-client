import type { AdminWorkspace } from "@/core/types/api/admin/admin-workspace.type";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useCreateUpdateWorkspace } from "@/modules/admin/workspaces/hooks/use-create-update-workspace";
import {
  WORKSPACE_CITY_MAX_LENGTH,
  WORKSPACE_COUNTRY_MAX_LENGTH,
  WORKSPACE_NAME_MAX_LENGTH,
  WORKSPACE_POSTAL_CODE_MAX_LENGTH,
  WORKSPACE_STREET_MAX_LENGTH,
  WORKSPACE_STREET_NUMBER_MAX_LENGTH,
} from "../../../const/admin-workspace-schemas.const";
import { useSelector } from "@tanstack/react-form";
import { areEqualByKeys } from "@/core/helpers/are-equal-by-keys";

type Props = {
  className?: string;
  workspace?: AdminWorkspace;
};

export const CreateUpdateWorkspaceForm = ({ workspace, className }: Props) => {
  const { form, isPending } = useCreateUpdateWorkspace(workspace);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={classNames(styles.form, className)}
    >
      <fieldset disabled={isPending}>
        <form.AppField
          name="name"
          children={(field) => (
            <field.FormInput
              className={styles.name}
              placeholder="Enter"
              label="Organization name"
              maxLength={WORKSPACE_NAME_MAX_LENGTH}
            />
          )}
        />

        <form.AppField
          name="country"
          children={(field) => (
            <field.FormInput
              className={styles.country}
              placeholder="Enter"
              label="Country"
              maxLength={WORKSPACE_COUNTRY_MAX_LENGTH}
            />
          )}
        />

        <form.AppField
          name="city"
          children={(field) => (
            <field.FormInput
              className={styles.city}
              placeholder="Enter"
              label="City"
              maxLength={WORKSPACE_CITY_MAX_LENGTH}
            />
          )}
        />

        <form.AppField
          name="street"
          children={(field) => (
            <field.FormInput
              className={styles.street}
              placeholder="Enter"
              label="Street"
              maxLength={WORKSPACE_STREET_MAX_LENGTH}
            />
          )}
        />

        <form.AppField
          name="streetNumber"
          children={(field) => (
            <field.FormInput
              className={styles.streetNumber}
              placeholder="Enter"
              label="Street number"
              maxLength={WORKSPACE_STREET_NUMBER_MAX_LENGTH}
            />
          )}
        />

        <form.AppField
          name="postalCode"
          children={(field) => (
            <field.FormInput
              className={styles.postalCode}
              placeholder="Enter"
              label="Postal Code"
              maxLength={WORKSPACE_POSTAL_CODE_MAX_LENGTH}
            />
          )}
        />
        <Button form={form} workspace={workspace} isPending={isPending} />
      </fieldset>
    </form>
  );
};

const Button = ({
  form,
  workspace,
  isPending,
}: {
  form: ReturnType<typeof useCreateUpdateWorkspace>["form"];
  workspace?: AdminWorkspace;
  isPending: boolean;
}) => {
  const name = useSelector(form.store, (state) => state.values.name);
  const country = useSelector(form.store, (state) => state.values.country);
  const city = useSelector(form.store, (state) => state.values.city);
  const street = useSelector(form.store, (state) => state.values.street);
  const streetNumber = useSelector(form.store, (state) => state.values.streetNumber);
  const postalCode = useSelector(form.store, (state) => state.values.postalCode);

  const disabled =
    isPending ||
    (workspace &&
      areEqualByKeys(workspace, { name, country, city, street, streetNumber, postalCode }, [
        "name",
        "country",
        "city",
        "street",
        "streetNumber",
        "postalCode",
      ]));

  return (
    <form.AppForm>
      <form.FormButton disabled={disabled} withSpinner={true} className={styles.button}>
        {workspace === undefined ? "Create" : "Save"}
      </form.FormButton>
    </form.AppForm>
  );
};
