export const ROUTES = {
  
  Auth:{
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    Logout: 'auth/logout',
  },
  DASHBOARD: 'api/dashboard',
  TASK_FORM: '/task/create',
  LANDING: 'api/landing',
  FETCH_TASK_BY_USER:'task/user/:userId',
  UPDATE_TASK:'task/:taskId',
  DELETE_TASK:'task/:taskId',
};