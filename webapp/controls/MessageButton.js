sap.ui.define([
	"sap/m/Button"
], function(Button) {
	"use strict";
	return Button.extend("tinyapp.controls.MessageButton", {
		metadata: {
			properties: {
				messages: {
					type: "object",
					defaultValue: []
				}
			},
			aggregations: {
				messagePopover: {
					type : "sap.m.MessagePopover",
					multiple: false
				}
			}
		},
		
		_getMaxSeverity: function (aMessages) {
			var types = {
				"None": 0,
				"Success": 1,
				"Information": 2,
				"Warning": 3,
				"Error": 4
			};
			
			return aMessages
				.reduce(function (oMaxSeverity, oMessage) {
					if (types[oMessage.getType()] > oMaxSeverity.index) {
						oMaxSeverity.index = types[oMessage.getType()];
						oMaxSeverity.title = oMessage.getType();
					}
					return oMaxSeverity;
				}, {
					index: 0,
					title: "None"
				});
		},
		
		_calculateButtonTypeByMessages: function (aMessages) {
			var oMaxSeverity = this._getMaxSeverity(aMessages);
			var sButtonType = "Accept";
			if (oMaxSeverity.index < 2) {
				sButtonType = "Accept";
			} else if (oMaxSeverity.index < 3) {
				sButtonType = "Default";
			} else {
				sButtonType = "Reject";
			}
			return sButtonType;
		},
		
		_calculateButtonIconByMessages: function (aMessages) {
			var oMaxSeverity = this._getMaxSeverity(aMessages);
			var aIcons = ["message-success", "message-success", "message-information", "message-warning", "message-error"];
			return "sap-icon://" + aIcons[oMaxSeverity.index];
		},
		
		setMessages: function (aMessages) {
			this.setProperty("messages", aMessages);
			this.setVisible(aMessages.length > 0);
			this.setType(this._calculateButtonTypeByMessages(aMessages));
			this.setIcon(this._calculateButtonIconByMessages(aMessages));
		},
		
		_onMessagesChange: function (oEvent) {
			
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