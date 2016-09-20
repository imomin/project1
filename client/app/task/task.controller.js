'use strict';

export default class TaskController {
  /*@ngInject*/
  constructor(Task, Group, Auth, Modal, appConfig, Util) {
    // Use the User $resource to fetch all users
    this.Task = Task;
    this.tasks = this.Task.query();
    this.auth = Auth;
    this.user = this.auth.getCurrentUserSync();
    this.Modal = Modal;
    this.timeZones = appConfig.timeZones;
    this.defaultTimeZone = Util.getClientTimezone();
    this.groups = Group.query();
  }


  addTask(){
    self = this;
    this.Modal.task.addTask(function(task) {
        task.user = self.user._id;
        self.Task.save(task, function(data) {
          debugger;
          self.tasks.push(data);
        }, function(err) {
          debugger;
        });
    }, {timeZones:this.timeZones,taskObj:{taskName:'testing',timezone:this.defaultTimeZone}, groups:this.groups})("Add New Schedule Task");


  }


  delete(task) {
    task.$remove();
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}