export interface ISubject {
  id: number;
  name: string;
  teacher: {
    id: number;
    name: string;
  };
}
