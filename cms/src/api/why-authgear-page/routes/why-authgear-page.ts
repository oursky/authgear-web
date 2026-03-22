export default {
  routes: [
    { method: 'GET',    path: '/why-authgear-page', handler: 'why-authgear-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/why-authgear-page', handler: 'why-authgear-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/why-authgear-page', handler: 'why-authgear-page.delete', config: { policies: [] } },
  ],
};
