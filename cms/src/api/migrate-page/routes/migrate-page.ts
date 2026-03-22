export default {
  routes: [
    { method: 'GET',    path: '/migrate-page', handler: 'migrate-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/migrate-page', handler: 'migrate-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/migrate-page', handler: 'migrate-page.delete', config: { policies: [] } },
  ],
};
