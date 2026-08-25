import { areEqualByKeys } from "@/core/helpers/are-equal-by-keys";
import type { ApiSuccessResponse } from "@/core/lib/api";
import { useAppForm } from "@/core/lib/tanstack-form";
import type { User } from "@/core/types/api/shared/user.type";
import type { MutationOptions } from "@/core/types/tanstack.types";
import { getPresignedUrl } from "@/modules/shared/api/shared.api";
import { QUERY_KEYS } from "@/modules/shared/const/query-keys.const";
import { updateProfile } from "@/modules/users/api/users.api";
import { USERS_QUERY_KEYS } from "@/modules/users/const/users-query-keys.const";
import { avatarSchema } from "@/modules/users/schemas/avatar.schema";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/modules/users/schemas/update-profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUpdateProfile = (
  user: User,
  options?: MutationOptions<ApiSuccessResponse<string>, UpdateProfileInput>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutateAsync,
    mutate: _mutate,
    ...rest
  } = useMutation({
    ...options,
    mutationFn: (data: UpdateProfileInput) => updateProfile(data),
    onSuccess: (data, params, result, ctx) => {
      toast.success("Profile updated successfully");
      options?.onSuccess?.(data, params, result, ctx);
    },
    onError: (error, params, result, ctx) => {
      // setExternalErrors(error, r$)
      options?.onError?.(error, params, result, ctx);
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(user.avatarUrl);

  const form = useAppForm({
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      avatarUrl: user.avatarUrl,
    } as UpdateProfileInput,

    onSubmit: async ({ value }) => {
      if (areEqualByKeys(user, value, ["firstName", "lastName"]) && value.avatarUrl === undefined)
        return;

      if (file) {
        const { data } = await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.getPresignedUrl,
          queryFn: () => getPresignedUrl({ contentType: file.type }),
        });

        await fetch(data.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        value.avatarUrl = data.publicUrl;
      }

      await mutateAsync(value);

      cleanupFile();
      setFilePreview(value.avatarUrl ?? null);

      queryClient.setQueryData(USERS_QUERY_KEYS.getMe, (prev: ApiSuccessResponse<User>) => {
        const newUser = {
          ...prev.data,
          firstName: value.firstName || null,
          lastName: value.lastName || null,
          avatarUrl: value.avatarUrl || null,
        };
        router.update({ context: { user: newUser } });
        router.invalidate();

        return {
          ...prev,
          data: newUser,
        };
      });
    },
    validators: {
      onChange: updateProfileSchema,
    },
  });

  useEffect(() => {
    return () => {
      cleanupFile();
    };
  }, []);

  const cleanupFile = () => {
    if (filePreview && filePreview !== user.avatarUrl) {
      URL.revokeObjectURL(filePreview);
    }

    setFile(null);
  };

  const chooseImage = async (f: File) => {
    const result = await avatarSchema.safeParseAsync(f);
    if (!result.success) {
      return toast.error("Invalid image", {
        description: "Supported formats: JPEG, PNG, GIF, WebP. Maximum size: 5 MB.",
      });
    }

    if (filePreview && filePreview !== user.avatarUrl) {
      URL.revokeObjectURL(filePreview);
    }

    const url = URL.createObjectURL(f);

    setFile(f);
    setFilePreview(url);
    form.setFieldValue("avatarUrl", url);
  };

  const removeImage = () => {
    cleanupFile();

    if (filePreview === user.avatarUrl) {
      form.setFieldValue("avatarUrl", null);
      setFilePreview(null);
    } else {
      form.setFieldValue("avatarUrl", undefined);
    }
  };

  return {
    form,
    uploadAvatar: {
      chooseImage,
      removeImage,
      filePreview,
      resetFiles: cleanupFile,
    },
    ...rest,
  };
};
