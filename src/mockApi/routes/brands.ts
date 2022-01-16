import { Server, Response } from 'miragejs';

export default (server: Server) => {
   server.get('/brands', (schema, request) => {
      return schema.all('brand');
   });

   server.get('/brands/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('brand', id);

      if (data) {
         return data.attrs;
      }

      return new Response(404, {}, { errors: ['enitity does not exist'] });
   });

   server.post('/brands', (schema, request) => {
      const payload = JSON.parse(request.requestBody);
      const brandId = payload?.id ?? 0;
      const brand = schema.find('brand', brandId);

      if (!brand) {
         return schema.create('brand', { ...payload });
      }

      brand.update({ ...payload });
      return schema.find('brand', brandId);
   });

   server.del('/brands/:id', (schema, request) => {
      const id = request.params.id;
      const data = schema.find('brand', id);

      if (data) {
         data.destroy();
      }

      return new Response(200);
   });
};
