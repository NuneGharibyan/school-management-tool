export interface ISubject {
  id: number;
  name: string;
  grade: number;
  teacher: {
    id: number;
    name: string;
  };
}
