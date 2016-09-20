'use strict';

export function LogResource($resource) {
  'ngInject';

  return $resource('/api/v1/logs/:id/:controller', {
    id: '@_id'
  });
}
