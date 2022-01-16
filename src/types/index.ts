export interface MenuItem {
   icon?: string;
   label: string;
   to?: string | Record<string, unknown>;
   children?: MenuItem[];
}

export interface Brand {
   id?: number | string;
   name: string;
   email: string;
   active: boolean;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
}

export interface UserGroup {
   groupName: string;
   description: string;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
}

export interface User {
   id?: number | string;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   cellPhone: string;
   officePhone: string;
   password: string;
   userGroups: UserGroup[];
   userGroupIds: number[];
   brandId?: number | string;
   brand?: Brand;
   active: boolean;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
}
