import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { Factory } from 'miragejs';
import { User, UserGroup, Brand } from '@/types';

export default {
   brand: Factory.extend<Partial<Brand>>({
      name: () => faker.company.companyName(),
      email: () => faker.internet.email(),
      active: () => faker.datatype.boolean(),
      createdAt: () => dayjs(faker.date.past()).format(),
      updatedAt: () => dayjs(faker.date.past()).format(),
   }),
   userGroup: Factory.extend<Partial<UserGroup>>({
      groupName: () => faker.name.title(),
      description: () => faker.lorem.slug(),
      createdAt: () => dayjs(faker.date.past()).format(),
      updatedAt: () => dayjs(faker.date.past()).format(),
      deletedAt: () => dayjs(faker.date.past()).format(),
   }),
   user: Factory.extend<Partial<User>>({
      firstName: () => faker.name.firstName(),
      lastName: () => faker.name.lastName(),
      username: () => faker.internet.userName(),
      email: () => faker.internet.email(),
      password: () => faker.internet.password(),
      cellPhone: () => faker.phone.phoneNumber(),
      officePhone: () => faker.phone.phoneNumber(),
      createdAt: () => dayjs(faker.date.past()).format(),
      updatedAt: () => dayjs(faker.date.past()).format(),
      deletedAt: () => dayjs(faker.date.past()).format(),
   }),
};
