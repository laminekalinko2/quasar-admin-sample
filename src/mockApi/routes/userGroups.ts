import { Server, Response } from 'miragejs';

export default (server: Server) => {
   server.get('/user-groups', (schema, request) => {
      return schema.all('userGroup');
   });

   server.get('/user-groups/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('userGroup', id);

      if (data) {
         return data.attrs;
      }

      return new Response(404, {}, { errors: ['enitity does not exist'] });
   });

   server.post('/user-groups', (schema, request) => {
      const payload = JSON.parse(request.requestBody);
      const userGroupId = payload?.id ?? 0;
      const userGroup = schema.find('userGroup', userGroupId);

      if (!userGroup) {
         return schema.create('userGroup', payload);
      }

      userGroup.update({ ...payload });
      return schema.find('userGroup', userGroupId);
   });

   server.del('/user-groups/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('userGroup', id);

      if (data) {
         data.destroy();
      }

      return new Response(200);
   });
};
