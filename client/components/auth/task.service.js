'use strict';

export function TaskResource($resource) {
  'ngInject';

  return $resource('/api/v1/tasks/:id/:controller', {
    id: '@_id'
  });
}
