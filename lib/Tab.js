var Tab = React.createFactory(React.createClass({

	// initializes new tab as empty
	getInitialState:function(){
		return {};
	},

	// renders a tab object into the DOM
	render:function(){
		var titles = [];

		// adds the title of the tab to the DOM
		
		titles.push(React.DOM.div({className:"tabName"},this.props.tab.title))
		return React.DOM.div({
			className:"icon tab "
				+ (this.props.current?"current ":"")
				+ ("full "),

			style:{
				backgroundImage:this.returnIcon(),
				paddingLeft:"20px"
			},
			title:this.props.tab.title,
			onClick:this.click,
		},
		
			titles
			//React.DOM.div({className:"limiter"})
		);
	},

	// changes the current tab to the tab selected in the application
	click:function(e){
			chrome.tabs.update(this.props.tab.id,{selected:true});
			chrome.windows.update(this.props.window.id,{focused:true});
	},

	// matches the corresponding icon with the tab in the application display
	returnIcon:function(){
		if(this.props.tab.url.indexOf("chrome://")!==0){
			return this.props.tab.favIconUrl?("url("+this.props.tab.favIconUrl+")"):"";
		}
	}
}));
