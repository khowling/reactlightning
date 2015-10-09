({
	// Your renderer method overrides go here
	// The render() function typically returns a DOM node, an array of DOM nodes, or nothing
    // cmp : component body
    // helper
    // // A renderer should never fire an event. An alternative is to use an init event instead.
	render : function(cmp, helper) {
        var ret = this.superRender();
        console.log ('Renderer: render: ' + JSON.stringify(ret));
        
        var content = document.createElement("DIV");
     	$A.render(cmp.get("v.body"), content);
        // Convert CDATA content to HTML - security???
        var el = cmp.find("locator").getElement();
        el.innerHTML = content.innerText;
        
        return ret;
    },
	rerender : function(cmp, helper) {
        var ret = this.superRerender();
        console.log ('Renderer: RErender: ' + JSON.stringify(ret));
        return ret;
    },
    afterRender: function(cmp, helper) {
        console.log ('Renderer: afterRender : ' + cmp.get("v.ReactBooted"));
        if (!cmp.get("v.ReactBooted")) {
            console.log ('Renderer: afterRender - should boot app');
            cmp.set("v.ReactBooted", helper.initReact(cmp));
        }
    },
    unrender: function(cmp, helper) {
        console.log ('Renderer: unrender');
        var el = cmp.find("locator").getElement();
        cmp.get("v.React").unmountComponentAtNode(el);
		this.superUnrender();
    }
})