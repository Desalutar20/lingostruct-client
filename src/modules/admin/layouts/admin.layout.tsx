import { Sidebar } from "@/modules/shared/components/sidebar/sidebar";
import styles from "./styles.module.css";
import { useGetUser } from "@/modules/shared/hooks/use-get-user";
import { Link, Outlet } from "@tanstack/react-router";
import { ROUTES } from "@/core/const/routes.const";
import { Building2, Menu, Users } from "lucide-react";
import { Drawer } from "@/core/components/drawer/drawer";
import { AppButton } from "@/core/components/app-button/app-button";

const links = [
  {
    to: ROUTES.admin.users.href,
    label: "Users",
    icon: <Users />,
  },
  {
    to: ROUTES.admin.workspaces.root.href,
    label: "Workspaces",
    icon: <Building2 />,
  },
] as const;

export const AdminLayout = () => {
  const user = useGetUser();
  if (!user) return null;

  const sidebar = (className?: string) => (
    <Sidebar
      className={className}
      user={user}
      content={
        <nav>
          {links.map(({ to, label, icon }) => (
            <Link
              activeProps={{ className: styles.activeLink }}
              activeOptions={{ exact: false, includeSearch: false }}
              className={styles.link}
              to={to}
              key={to}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      }
    />
  );

  return (
    <div className={styles.container}>
      {sidebar(styles.desktop)}
      <Drawer
        swipeDirection="left"
        trigger={
          <AppButton className={styles.button} variant="ghost" aria-label="Open navigation">
            <Menu size={20} />
          </AppButton>
        }
        renderContent={() => sidebar()}
      />
      <div className={styles.page}>
        <Outlet />
      </div>
    </div>
  );
};
