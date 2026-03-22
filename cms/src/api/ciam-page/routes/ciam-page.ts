export default {
  routes: [
    { method: 'GET',    path: '/ciam-page', handler: 'ciam-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/ciam-page', handler: 'ciam-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/ciam-page', handler: 'ciam-page.delete', config: { policies: [] } },
  ],
};
