import type { Schema, Struct } from '@strapi/strapi';

export interface CmsLoginAndTech extends Struct.ComponentSchema {
  collectionName: 'components_cms_login_and_teches';
  info: {
    displayName: 'Login & Tech';
  };
  attributes: {
    methodsDetail: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Biometric',
          'Email',
          'Passwordless/SMS',
          'Email Magic Link',
          'Phone Number',
          'Password',
          'Passkey',
        ]
      > &
      Schema.Attribute.DefaultTo<'[]'>;
    technicalDetails: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['MFA', 'App2App', 'Mobile App', 'OAuth', 'Single Sign-On', 'Website']
      > &
      Schema.Attribute.DefaultTo<'[]'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cms.login-and-tech': CmsLoginAndTech;
    }
  }
}
