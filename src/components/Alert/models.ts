type Role = "success" | "info" | "warning" | "danger";

export interface AlertProps {
  role: Role;
  text: string;
}
