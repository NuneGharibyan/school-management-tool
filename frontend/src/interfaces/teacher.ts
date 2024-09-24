export interface ITeacher {
  id: number;
  name: string;
  subjects: { id: number; name: string }[];
}
