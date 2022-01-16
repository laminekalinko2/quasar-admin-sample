import { Server, Response } from 'miragejs';

export default (server: Server) => {
   server.get('/users', (schema, request) => {
      return schema.all('user');
   });

   server.get('/users/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('user', id);

      if (data) {
         return data.attrs;
      }

      return new Response(404, {}, { errors: ['enitity does not exist'] });
   });

   server.post('/users', (schema, request) => {
      const payload = JSON.parse(request.requestBody);
      const userId = payload?.id ?? 0;
      const user = schema.find('user', userId);

      if (!user) {
         return schema.create('user', { ...payload, password: 123456 });
      }

      user.update({ ...payload });
      return schema.find('user', userId);
   });

   server.del('/users/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('user', id);

      if (data) {
         data.destroy();
      }
      return new Response(200);
   });
};
