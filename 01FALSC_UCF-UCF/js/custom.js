var js = document.createElement('script');
js.src = "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
document.head.appendChild(js);

(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

"use strict";
'use strict';

//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
app.controller('SearchBookmarkFilterAfterController', [function () {
    var vm = this;
}]);

app.component('prmSearchBookmarkFilterAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBookmarkFilterAfterController',
    template: '\n    <primo-explore-help-menu parent-ctrl="$ctrl.parentCtrl"></primo-explore-help-menu>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('primoExploreHelpMenuStudioConfig', [{ "logToConsole": false, "publishEvents": false, "helpMenuTitle": "Search Help", "helpMenuWidth": 500 }]);
//Auto generated code by primo app store DO NOT DELETE!!! -END-

  /* start from-library component */

  app.component('prmRequestAfter', {
      bindings: { parentCtrl: '<' },
      controller: function($scope) {
          var myVar = setInterval(activateFilter, 2000);

          function activateFilter() {

              $('md-select[name="owner"]').parent().hide()

              var pickUpLocations = ["UCF Main Library",
                      "UCF Downtown Library",
                      "UCF West Orlando",
                      "UCF Rosen",
                      "UCF Daytona Beach",
                      "UCF Sanford/Lake Mary",
                      "UCF Cocoa",
                      "Distance Learner"];

              var owners = ["RES_SHARE",
                      "CFWTN",
                      "CFMTN",
                      "RES_SHARE",
                      "CFDBG",
                      "CFSLM",
                      "CFBCC",
                      "RES_SHARE"];

              var defaultOwnerCode = "RES_SHARE";
              
              var ownerCode = $scope.$ctrl.parentCtrl.requestService._formData.owner;
              var ownerCodeUser = "";
              var pickupLocationCode = $scope.$ctrl.parentCtrl.requestService._formData.preferredLocalPickupLocation;
              var form = $scope.$ctrl.parentCtrl.requestService._form;
              var pickupLocationLabel = "";
              var index = -1;

              if (ownerCode != null && pickupLocationCode != null && form != null && form.length > 20) {
                  
                  //Get label corresponding to pickup location code set in form
                  for (let i = 0; i < form.length; i++) {
                      var formEntry = form[i];
                      if (formEntry.key == "preferredLocalPickupLocation") {
                          for (let j = 0; j < formEntry.options.length; j++) {
                              if (formEntry.options[j].value == pickupLocationCode) {
                                  pickupLocationLabel = formEntry.options[j].label;
                              }
                          }
                      }
                  }

                  //Get index of matching entry in internal lookup table
                  for (let i = 0; i < pickUpLocations.length; i++) {
                      if (pickupLocationLabel.startsWith(pickUpLocations[i])) {
                          index = i;
                          break;
                      }
                  }

                  if (index > -1)
                  {
                      ownerCodeUser = owners[index];
                  }
                  else
                  {
                      ownerCodeUser = defaultOwnerCode;
                  }
                  
                  if (ownerCode != ownerCodeUser && ownerCodeUser != "") {
                      $scope.$ctrl.parentCtrl.requestService._formData.owner = ownerCodeUser;
                  }
              }
          }
      }
  });

  /* end from-library component */

  /* start add hathi component */
  /////////////////////////////////////////////////////////////
  app.component("hathiComponent", {
    controller: "HathiController",
    require: {
      prmActionCtrl: "^prmActionList",
    },
    bindings: { parentCtrl: "<" },
    template: `{{$ctrl.showHathiAction()}}`,
  });

  app.component("prmActionListAfter", {
    template: "<hathi-component></hathi-component>",
  });

  app.controller("HathiController", [
    function () {
      var vm = this;
      vm.showHathiAction = showHathiAction;

      function getTitle() {
        return getFirstValue(vm.prmActionCtrl.item.pnx.display.title);
      }

      function getISBN() {
        return getFirstValue(vm.prmActionCtrl.item.pnx.addata.isbn);
      }

      function getOCLC() {
        return getFirstOCLC(vm.prmActionCtrl.item.pnx.addata.oclcid);
      }

      function getAuthor() {
        return getFirstValue(vm.prmActionCtrl.item.pnx.addata.au);
      }

      function getEdition() {
        return getFirstValue(vm.prmActionCtrl.item.pnx.display.edition);
      }

      function getImprint() {
        return (
          getFirstValue(vm.prmActionCtrl.item.pnx.addata.pub) +
          ", " +
          getFirstValue(vm.prmActionCtrl.item.pnx.addata.date) +
          "."
        );
      }

      function getHathi() {
        return getFirstHathiValue(vm.prmActionCtrl.item.pnx.display.lds62);
      }

      function getFirstValue(data) {
        if (data) {
          return data[0] ?? "";
        } else {
          return "";
        }
      }

      function getFirstHathiValue(data) {
        if (data) {
          return data.find(element => element.includes("HATHI")) ?? "";
        } else {
          return "";
        }
      }

      function getFirstOCLC(data) {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let pos = data[i].toLowerCase().indexOf("(ocolc)");
            if (pos >= 0) {
              return data[i].substring(pos + 7);
            }
          }
        } else {
          return "";
        }
      }

      function showHathiAction() {
        if (vm.prmActionCtrl) {
          this.action = {
            name: "hathi_access",
            label: "Hathi Accessible",
            index: 0,
            link: "https://alma-apps.flvc.org/alma-form-email/email.jsp?inst=UCF&bib=",
            icon: {
              icon: "ic_accessibility_24px",
              iconSet: "action",
              type: "svg",
            },
          };
          if (getHathi() == "HATHI-IC" || getHathi() == "HATHI-OP") {
            if (!actionExists(this.action, vm.prmActionCtrl)) {
              vm.prmActionCtrl.actionListService.requiredActionsList.splice(
                this.action.index,
                0,
                this.action.name
              );
              vm.prmActionCtrl.actionListService.actionsToIndex[
                this.action.name
              ] = this.action.index;
              vm.prmActionCtrl.actionListService.onToggle[
                this.action.name
              ] = processLink(this.action);
              vm.prmActionCtrl.actionListService.actionsToDisplay.unshift(
                this.action.name
              );

              vm.prmActionCtrl.actionLabelNamesMap[
                this.action.name
              ] = this.action.label;
              vm.prmActionCtrl.actionIconNamesMap[
                this.action.name
              ] = this.action.name;
              vm.prmActionCtrl.actionIcons[this.action.name] = this.action.icon;
            }
          } else if (actionExists(this.action, vm.prmActionCtrl)) {
            delete vm.prmActionCtrl.actionListService.actionsToIndex[
              this.action.name
            ];
            delete vm.prmActionCtrl.actionListService.onToggle[
              this.action.name
            ];
            let i = vm.prmActionCtrl.actionListService.actionsToDisplay.indexOf(
              this.action.name
            );
            vm.prmActionCtrl.actionListService.actionsToDisplay.splice(i, 1);
            i = vm.prmActionCtrl.actionListService.requiredActionsList.indexOf(
              this.action.name
            );
            vm.prmActionCtrl.actionListService.requiredActionsList.splice(i, 1);
            delete vm.prmActionCtrl.actionLabelNamesMap[this.action.name];
            delete vm.prmActionCtrl.actionIconNamesMap[this.action.name];
            delete vm.prmActionCtrl.actionIcons[this.action.name];
          }
        }
      }

      function actionExists(action, ctrl) {
        return ctrl.actionListService.actionsToIndex.hasOwnProperty(
          action.name
        );
      }

      function processLink(action) {
        let processedLink = (action.link +=
          encodeURIComponent(getTitle()) +
          ";;;" +
          encodeURIComponent(getAuthor()) +
          ";;;" +
          encodeURIComponent(getImprint()) +
          ";;;" +
          encodeURIComponent(getEdition()) +
          ";;;" +
          encodeURIComponent(getISBN()) +
          ";;;" +
          encodeURIComponent(getOCLC()));
        return () => window.open(processedLink, "_blank");
      }
    },
  ]);
  /* end add hathi component */
  ////////////////////////////////////////////////////////////

  /* Start Collapse "Get It From Other Institutions" dropdown by default in full record display. */
  app.component("prmAlmaOtherMembersAfter", { 
    bindings: { 
      parentCtrl: "<", 
    }, 
    controller: [ 
      function () { 
        var ctrl = this; 
        ctrl.parentCtrl.isCollapsed = true; 
      }, 
    ], 
  }); 
  /* End Collapse "Get It From Other Institutions" */

})();


// libraryh3lp chat box code
(function() {
    var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
    x.src = (document.location.protocol === "https:" ? "https://" : "https://") + "us.libraryh3lp.com/js/libraryh3lp.js?34335"
    var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);
  })();
