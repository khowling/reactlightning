({
	init : function(component, event, helper) {
        console.log ('controller: init - ' + component.get("v.ReactBooted"));
        $A.createComponent("ltng:require", {
            scripts: ["/resource/myteam002"],
            afterScriptsLoaded: component.getReference("c.reactLoaded")
        }, function(requireCmp) {
            var body = component.get("v.body");
            body.push(requireCmp);
            component.set("v.body", body);
        }); 
	},
    reactLoaded: function(component, event, helper) {
        console.log ('controller: reactLoaded');
		if (!component.get("v.ReactBooted")) {
            console.log ('controller: reactLoaded - should boot app');
            component.set("v.ReactBooted", helper.initReact(component));
        }
    }
})