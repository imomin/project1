'use strict';

export function Modal($rootScope, $uibModal, $window) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {
    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.html'),
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      }
    },
    task: {//https://github.com/angular-fullstack/generator-angular-fullstack/issues/1905
            addTask: function(cb, data) { //my new modal
            cb = cb || angular.noop;
            return function() {
              var args = Array.prototype.slice.call(arguments),
              title = args.shift(),
              taskModal;
              var scope = { //openModal is a function the modal service defines.  It is just a wrapper for $Modal
                  modal:{
                    taskData:data,
                    minuteCRON:'*',
                    hourCRON:'*',
                    dayCRON:'*',
                    weekdayCRON:'*',
                    monthCRON:'*',
                    //cron:minuteCRON + "\t" + hourCRON + "\t" + dayCRON + "\t" + monthCRON + "\t" + weekdayCRON,
                    dismissable: true,
                    title: title,
                    template: './addTask.html',
                    buttons: [ {//this is where you define you buttons and their appearances
                      classes: 'btn-warning',
                      text: 'Cancel',
                      click: function(event) {
                        taskModal.dismiss(event);
                      }
                    },{
                      classes: 'btn-primary',
                      text: 'Save',
                      click: function(event) {
                        taskModal.close(event);
                      }
                    },]
                  },
                  setIsRecurring:function(bool) {
                    scope.modal.taskData.taskObj.isRecurring = bool;
                  },
                  updateCRON:function(){
                    scope.modal.cron = scope.modal.minuteCRON + "\t" + scope.modal.hourCRON + "\t" + scope.modal.dayCRON + "\t" + scope.modal.monthCRON + "\t" + scope.modal.weekdayCRON;
                  },
                  getSelection:function(arr) {
                  }
                }
              var modalScope = $rootScope.$new();
              angular.extend(modalScope, scope);
              scope.updateCRON();
              modalScope.$watch('modal.minuteCRON', function (newValue, oldValue) {
                if(newValue != oldValue) {
                  if(!newValue || newValue.length === 0 || newValue.indexOf("*") !== -1){
                    scope.modal.minuteCRON = "*";
                  }
                  else {
                    scope.modal.minuteCRON = newValue;
                  }
                  scope.updateCRON();
                }
              });
              modalScope.$watch('modal.hourCRON', function (newValue, oldValue) {
                if(newValue != oldValue) {
                  if(!newValue || newValue.length === 0 || newValue.indexOf("*") !== -1){
                    scope.modal.hourCRON = "*";
                  }
                  else {
                    scope.modal.hourCRON = newValue;
                  }
                  scope.updateCRON();
                }
              });
              modalScope.$watch('modal.dayCRON', function (newValue, oldValue) {
                if(newValue != oldValue) {
                  if(!newValue || newValue.length === 0 || newValue.indexOf("*") !== -1){
                    scope.modal.dayCRON = "*";
                  }
                  else {
                    scope.modal.dayCRON = newValue;
                  }
                  debugger;
                  scope.updateCRON();
                }
              });
              modalScope.$watch('modal.weekdayCRON', function (newValue, oldValue) {
                if(newValue != oldValue) {
                  if(!newValue || newValue.length === 0 || newValue.indexOf("*") !== -1){
                    scope.modal.weekdayCRON = "*";
                  }
                  else {
                    scope.modal.weekdayCRON = newValue;
                  }
                  scope.updateCRON();
                }
              });
              modalScope.$watch('modal.monthCRON', function (newValue, oldValue) {
                if(newValue != oldValue) {
                  if(!newValue || newValue.length === 0 || newValue.indexOf("*") !== -1){
                    scope.modal.monthCRON = "*";
                  }
                  else {
                    scope.modal.monthCRON = newValue;
                  }
                  scope.updateCRON();
                }
              });
              taskModal = $uibModal.open({
                template: require('./addTask.html'),
                windowClass: 'modal-primary',
                scope: modalScope,
                size: 'lg',
              });
              taskModal.result.then(function(event) {
                //cb.apply(event, args); //this is where all callback is actually called
                cb(data.taskObj);
              });
            }
          }
      }
  };
}

export default angular.module('cronboxApp.modal', [])
  .factory('Modal', Modal)
  .name;
