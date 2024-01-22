export type User = {
  _id?: string;
  email: string;
  password: string;
};

export type UserCredentials = Pick<User, 'email' | 'password'>;

export type Car = {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
};

export type CarFindOptions = {
  filter?: CarFilterOptions;
  sort?: CarSortOptions;
};

export type CarFilterOptions = Partial<Omit<Car, '_id'>>;

export type CarSortOptions = {
  field: keyof Omit<Car, '_id'>;
  direction?: 'ASC' | 'DESC';
};

export type AuthResponse = {
  token: string;
};
