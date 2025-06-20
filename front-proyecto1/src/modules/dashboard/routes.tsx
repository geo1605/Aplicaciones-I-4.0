// src/routes/index.tsx
import UserForm from '../User/UserForm';  

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;
  icon?: string;
  roles?: string[];
  hidden?: boolean;
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: <UserForm />,
    label: 'Inicio',
    icon: 'HomeOutlined',
  },
  {
    path: '/users',
    element: <UserForm />,
    label: 'Usuarios',
    icon: 'UserOutlined',
  },
  {
    path: '/products',
    element: <UserForm />,
    label: 'Productos',
    icon: 'DashboardOutlined',
  },
  {
    path: '/orders',
    element: <UserForm />,
    label: 'Órdenes',
    icon: 'BarChartOutlined',
  },
];

export default routes;
