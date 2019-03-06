sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "tinyapp/utils/welcome",
    "sap/ui/model/json/JSONMOdel"
], function (Controller, welcome, JSONModel) {
    "use strict";

    return Controller.extend("tinyapp.controller.Main", {

        onInit: function () {
        	this.getView().setModel(new JSONModel({
        		cities: [{
        			id: 1,
        			name: "Moscow"
        		}, {
        			id: 2,
        			name: "St. Petersburg"
        		}],
        		simpleText: ""
        	}), "viewModel");
        },
        
        onListSelectionChange: function (oEvent) {
        	var oBindingContext = oEvent.getParameter("listItem").getBindingContext("viewModel");
        	var sTitle = oBindingContext.getProperty("name");
        	welcome.greet(sTitle);
        	this.getView().byId("title").setBindingContext(oBindingContext, "viewModel");
        }
    });
});