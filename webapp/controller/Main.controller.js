sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "tinyapp/utils/welcome"
], function (Controller, welcome) {
    "use strict";

    return Controller.extend("tinyapp.controller.Main", {

        onInit: function () {

        },
        
        onListSelectionChange: function (oEvent) {
        	welcome.greet(oEvent.getParameter("listItem").getTitle());
        }
    });
});