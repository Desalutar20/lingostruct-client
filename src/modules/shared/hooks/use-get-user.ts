import { useLocation, useNavigate, useRouteContext, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { ROUTES } from "@/core/const/routes.const";

export const useGetUser = () => {
  const { user } = useRouteContext({ from: "/protectedLayout" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({
        to: ROUTES.auth.signIn.href,
        search: { redirectPath: location.href },
      });
    }
  }, [user]);

  return user;
};
