/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/v1/groups', require('./api/v1/group'));
  app.use('/api/v1/logs', require('./api/v1/log'));
  app.use('/api/v1/tasks', require('./api/v1/task'));
  app.use('/api/v1/things', require('./api/v1/thing'));
  app.use('/api/v1/users', require('./api/v1/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
