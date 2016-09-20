'use strict';

export function GroupResource($resource) {
  'ngInject';

  return $resource('/api/v1/groups/:id/:controller', {
    id: '@_id'
  });
}
