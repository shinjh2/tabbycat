var Window = React.createFactory(React.createClass({

	// renders the window into the DOM
	render:function(){

		// creates a Tab object for each tab in the window
		var tabs = this.props.tabs.map(tab => {
			return Tab({
				// the window the tab is a part of
				window:this.props.window,
				// the tab object 
				tab:tab,
				// if the tab is the one currently open
				current:!!this.props.currentTab[tab.id],
			});
		});

		// returns the DOM of the rendered tabs in the window
		return React.DOM.div({}, tabs);
	}
}));


