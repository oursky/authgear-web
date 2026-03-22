export default {
  routes: [
    { method: 'GET',    path: '/pricing-page', handler: 'pricing-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/pricing-page', handler: 'pricing-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/pricing-page', handler: 'pricing-page.delete', config: { policies: [] } },
  ],
};
