const micro = require('micro');
const microApi = require('micro-api');
const handlers = require('./handler');

const api = microApi([
  {
      method: 'get',
      path: '/',
      handler: handlers.help,
   },
   {
      method: 'get',
      path: '/story/list',
      handler: handlers.listStoryboards,
   },
   {
      method: 'get',
      path: '/story/:id',
      handler: handlers.getStoryboard,
   },
   {
      method: 'post',
      path: '/story',
      handler: handlers.addStoryboard,
   },
   {
      method: 'put',
      path: '/story/:id',
      handler: handlers.updateStoryboard,
   },
   {
      method: 'delete',
      path: '/story/:id',
      handler: handlers.deleteStoryboard,
   },
   {
      method: 'get',
      path: '/story/add',
      handler: handlers.showAddStoryForm,
   },
   {
      method: 'get',
      path: '/story/ed/:id',
      handler: handlers.showStoryboardForm,
   },
]);

module.exports = api;
