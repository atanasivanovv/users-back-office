export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TaskFilters {
  status: "all" | "completed" | "incomplete";
  title: string;
  userId: string;
}
