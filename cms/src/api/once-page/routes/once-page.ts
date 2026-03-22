export default {
  routes: [
    { method: 'GET',    path: '/once-page', handler: 'once-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/once-page', handler: 'once-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/once-page', handler: 'once-page.delete', config: { policies: [] } },
  ],
};
