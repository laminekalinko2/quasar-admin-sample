// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Model, hasMany, belongsTo } from 'miragejs';
import { UserGroup, User, Brand } from '@/types';

export default {
   brand: Model.extend<Partial<Brand>>({}),
   user: Model.extend<Partial<User>>({
      userGroup: hasMany(),
      brand: belongsTo(),
   }),
   userGroup: Model.extend<Partial<UserGroup>>({}),
};
