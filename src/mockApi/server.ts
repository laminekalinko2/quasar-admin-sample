// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createServer, RestSerializer, Response } from 'miragejs';
import models from './models';
import factories from './factories';
import fixtures from './fixtures';
import { registerRoutes } from './routes';
import faker from '@faker-js/faker';

export function makeServer({ environment = 'test' }) {
   return createServer({
      environment,
      serializers: {
         application: RestSerializer.extend({
            root: false,
            embed: true,
            include: ['userGroup', 'brand'],
            serializeIds: ['always'],
         }),
      },
      models,

      factories,

      routes() {
         this.timing = 200;
         this.urlPrefix = import.meta.env.VITE_API_BASEURL as string;

         registerRoutes(this);

         this.post('/login', (schema, request) => {
            const payload = JSON.parse(request.requestBody);

            if (payload.username == 'admin' && payload.password == '12345') {
               return {
                  accessToken: 'myekdjffjng89',
                  accessUser: {
                     email: 'admin@admin.com',
                     firstName: 'Kalinko',
                     lastName: 'Admin',
                  },
               };
            }

            return {
               incorrectCedentials: true,
            };
         });
      },

      fixtures,

      seeds(server) {
         server.createList('userGroup', 5);
         server.createList('brand', 3).forEach((brand) => {
            server.createList('user', 3, { brand });
         });
         server.loadFixtures();
      },
   });
}
