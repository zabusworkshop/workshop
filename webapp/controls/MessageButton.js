sap.ui.define([
	"sap/m/Button"
], function(Button) {
	"use strict";
	return Button.extend("tinyapp.controls.MessageButton", {
		metadata: {
			properties: {
				
			},
			aggregations: {
				messagePopover: {
					type : "sap.m.MessagePopover",
					multiple: false
				}
			}
		},
		
		init: function() {
			this.attachPress(function (oEvent) {
				var oMessagePopover = this.getMessagePopover();
				if (oMessagePopover.isOpen()) {
					oMessagePopover.close();
				} else {
					oMessagePopover.openBy(this);
				}
			}.bind(this));
		},
		
		renderer: sap.m.ButtonRenderer
	});
});