import { Roles } from "src/types";

export interface AlertProps {
  role: Roles;
  text?: string;
  abilityURL?: string;
  onClose?: () => void;
}
