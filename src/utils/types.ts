export interface Post {
  isSaved: boolean;
  id: string;
  firstName: string;
  lastName: string;
  date: number;
  description: string;
  path: string;
  image: string;
  tags: string[];
  time: number;
}
export interface PostProps {
  username?: string;
  date: number;
  description: string;
  path: string;
  id?: string;
  firstName: string;
  lastName: string;
  image: string;
  tags?: string[];
  displayImage: boolean;
  displayDescription: boolean;
  isSaved?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
}

export interface UserData {
  id: number | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
  date: Date;
}
export interface RouteParams {
  imagePath?: string;
}
export interface AuthState {
  isAuthenticated: boolean;
}
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
}
