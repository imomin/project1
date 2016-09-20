'use strict';

describe('Component: GroupComponent', function () {

  // load the controller's module
  beforeEach(module('cronboxApp.group'));

  var GroupComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    GroupComponent = $componentController('group', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
