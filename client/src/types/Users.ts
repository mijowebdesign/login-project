export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'manager' | 'admin';
}
