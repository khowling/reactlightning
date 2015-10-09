({
    initReact : function(component) {
        console.log ("helper: initReact");
        var React = window._React; // component.get("v.React");
        var App = window._App; // component.get("v.App");
        if (React && App) {
            var mountNode = component.find("locator").getElement();
            console.log ("helper: initReact : booting App ");
            React.render(React.createElement(App, {
                auraAction: $A,
                component: component,
                sldsUrl: component.get("v.sldsUrl")
            }), mountNode);
            return true;
        } else {
            console.log ("helper initReact: react not loaded");
            return false;
        }
	}
})