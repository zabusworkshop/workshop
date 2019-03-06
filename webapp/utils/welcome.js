sap.ui.define(["sap/m/MessageToast"],
	function (MessageToast) {
		return {
			
			greet: function (sCity) {
				MessageToast.show("Welcome to " + sCity);
			}
			
		};
});