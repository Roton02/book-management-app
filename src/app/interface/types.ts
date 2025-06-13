export interface IUser {
    password: string;
    id: string;
    email: string;
    name: string | null;
    role: string;
}


export interface IBook {
  title: string;
  body: string;
  authorId: string; // We use authorId instead of full User object for data input
  publishedYear: number;
  genre: string;
  isbn: string;
  coverImageUrl?: string;
}
