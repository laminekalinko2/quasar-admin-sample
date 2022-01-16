import { Server } from 'miragejs';

import users from './users';
import userGroups from './userGroups';
import brands from './brands';

export const registerRoutes = (server: Server) => {
   userGroups(server);
   users(server);
   brands(server);
};
