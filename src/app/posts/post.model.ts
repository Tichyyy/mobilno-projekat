export interface Post {
  id: string;
  content: string;
  userId: string;
  timestamp: string;
  userName: string;
  isEditing?: boolean; // Dodajemo ovu opciju
  newContent?: string; // Dodajemo ovu opciju
}
