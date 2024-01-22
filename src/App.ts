import axios from 'axios';
import { AuthResponse, Car, UserCredentials } from './types';

export class App {
  credentials: UserCredentials;

  constructor(credentials: UserCredentials) {
    this.credentials = credentials;
  }

  private async login(): Promise<string> {
    const response = await axios
      .post<AuthResponse>('http://localhost:3000/api/v1/user/auth', this.credentials)
      .catch((error) => {
        throw new Error(JSON.stringify(error.response.data, null, 2));
      });

    return response.data.token;
  }

  async add(car: Car): Promise<Required<Car>> {
    const token = await this.login();

    const response = await axios
      .post<Required<Car>>(`http://localhost:3000/api/v1/cars`, car, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error.response.data, null, 2));
      });

    return response.data;
  }

  async find(options: Record<string, string>): Promise<Required<Car>[]> {
    const token = await this.login();

    let query: string[] = [];
    if (options.brand) query.push(`brand=${options.brand}`);
    if (options.model) query.push(`model=${options.model}`);
    if (options.year) query.push(`year=${options.year}`);
    if (options.price) query.push(`price=${options.price}`);
    if (options.sortField) query.push(`sort=${options.sortField}`);
    if (options.sortDirection) query.push(`direction=${options.sortDirection}`);

    const response = await axios
      .get<Required<Car>[]>(`http://localhost:3000/api/v1/cars?${query.join('&')}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error.response.data, null, 2));
      });

    return response.data;
  }

  async update(car: Required<Car>): Promise<Required<Car>> {
    const token = await this.login();

    const response = await axios
      .put<Required<Car>>(`http://localhost:3000/api/v1/cars/${car._id}`, car, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error.response.data, null, 2));
      });

    return response.data;
  }

  async delete(_id: string): Promise<Required<Car>> {
    const token = await this.login();

    const response = await axios
      .delete<Required<Car>>(`http://localhost:3000/api/v1/cars/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        throw new Error(JSON.stringify(error.response.data, null, 2));
      });

    return response.data;
  }
}
