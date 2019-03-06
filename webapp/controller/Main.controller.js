sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("tinyapp.controller.Main", {

        onInit: function () {

        },
        
        onListSelectionChange: function (oEvent) {
        	MessageToast.show("Welcome to " + oEvent.getParameter("listItem").getTitle());
        }
    });
});