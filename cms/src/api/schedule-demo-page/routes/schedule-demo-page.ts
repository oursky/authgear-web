export default {
  routes: [
    { method: 'GET',    path: '/schedule-demo-page', handler: 'schedule-demo-page.find',   config: { policies: [] } },
    { method: 'PUT',    path: '/schedule-demo-page', handler: 'schedule-demo-page.update', config: { policies: [] } },
    { method: 'DELETE', path: '/schedule-demo-page', handler: 'schedule-demo-page.delete', config: { policies: [] } },
  ],
};
