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
      path: '/story/add/:name/:desc',
      handler: handlers.addStoryboard,
   },
   {
      method: 'get',
      path: '/story/update/:id/:name/:desc',
      handler: handlers.updateStoryboard,
   },
   {
      method: 'get',
      path: '/story/:id',
      handler: handlers.getStoryboard,
   },
   {
      method: 'get',
      path: '/scene/add/:sid/:name/:desc',
      handler: handlers.addStoryboardScene,
   },
   {
      method: 'get',
      path: '/scenes/list/for/story/:sid',
      handler: handlers.getStoryboardScenes,
   },
   {
      method: 'get',
      path: '/scene/delete/:id',
      handler: handlers.deleteScene,
   },
   {
      method: 'get',
      path: '/story/delete/:id',
      handler: handlers.deleteStory,
   },
]);

module.exports = api;
