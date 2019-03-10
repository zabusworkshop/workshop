sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "tinyapp/utils/welcome",
    "sap/ui/model/json/JSONMOdel",
    "sap/m/MessagePopover",
    "sap/m/MessageItem",
    "sap/ui/model/Filter"
], function (Controller, welcome, JSONModel, MessagePopover, MessageItem, Filter) {
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
        	this.getView().setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "messages");
        },
        
        onListSelectionChange: function (oEvent) {
        	var oBindingContext = oEvent.getParameter("listItem").getBindingContext("viewModel");
        	var sTitle = oBindingContext.getProperty("name");
        	welcome.greet(sTitle);
        	this.getView().byId("title").setBindingContext(oBindingContext, "viewModel");
        },
        
        getMessagePopover: function () {
        	if (!this.oMessagePopover) {
        		var oMessageItem = new MessageItem({
					description: "{messages>description}",
					type: "{messages>type}",
					title: "{messages>message}"
				});
        		this.oMessagePopover = new MessagePopover({
        			items: {
        				path: "messages>/",
        				template: oMessageItem
        			}
        		});
        		this.getView().addDependent(this.oMessagePopover);
        	}
        	return this.oMessagePopover;
        },
        
        onMessageButtonPress: function (oEvent) {
        	var oMessagePopover = this.getMessagePopover();
        	if (oMessagePopover.isOpen()) {
        		oMessagePopover.close();
        	} else {
        		this.getMessagePopover().openBy(oEvent.getSource());
        	}
        },
        
        onEmployeeSearch: function (oEvent) {
        	var sValue = oEvent.getParameter("newValue");
        	var aFilters = [];
        	if (sValue) {
        		aFilters.push(new Filter({
        			filters: [
        				new Filter("FirstName", "Contains", sValue),
        				new Filter("LastName", "Contains", sValue)
        			],
        			and: false
        		}));
        	}
        	this.getView().byId("employeeList").getBinding("items").filter(aFilters);
        }
    });
});