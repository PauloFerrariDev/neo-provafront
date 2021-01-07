export interface CardProps {
  badges?: JSX.Element[];
  className?: string;
  deletable: boolean;
  id: number;
  imageURL: string | null;
  name: string;
}
