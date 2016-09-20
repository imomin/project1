'use strict';

export default class GroupController {
  /*@ngInject*/
  constructor(Group, Auth, $http, $scope, socket, Modal) {
    // Use the User $resource to fetch all users
    this.Group = Group;
    this.groups = this.Group.query();
    this.$http = $http;
    this.socket = socket;
    this.auth = Auth;
    this.user = this.auth.getCurrentUserSync();
  	$scope.$on('$destroy', function() {
  		socket.unsyncUpdates('group');
  	});
    this.Modal = Modal;
  }

  addGroup(){
    self = this;
    if (self.newGroup) {
      self.Group.save({
        name: self.newGroup,
        info: '',
        user: self.user._id
      }, function(data) {
        self.groups.push(data);
        self.newGroup = '';
      }, function(err) {
        debugger;
      });
    }
  }

  delete(group) {
    self = this;
    self.Modal.confirm.delete(function(){
      group.$remove();
      self.groups.splice(self.groups.indexOf(group), 1);
      // this.$http.delete('/api/groups/' + group._id);
    })(group.name);
  }
}