// TabbyCat object that updates itself to match current tabs/windows
var TabbyCat = React.createFactory(React.createClass({

	// initializes the application's parameters with current tabs
	getInitialState:function(){
		this.update();
		return {
			// Array of current windows
			windows:[],
			// The current tab that is open
			currentTab:{},
			// Object containing current tabs by id
			tabIds:{},
			// Object containing current windows by id
			windowIds:{},
		}
	},

	// renders the the application into a DOM
	render:function(){

		// creates the visual interface for the application via react.DOM
		return React.DOM.div({},
			this.state.windows.map(window => {
				
				// for each window, returns the window, its tabs, 
				// and if one of those tabs are currently open
				return Window({
					window,
					tabs:window.tabs,
					currentTab:this.state.currentTab,
				});
			}),
		)
	},

	// adds listeners that check for when any tabs/windows are changed, in which 
	// case the application's interface updates

	componentDidMount:function(){
		chrome.windows.onCreated.addListener(this.update.bind(this))
		chrome.windows.onRemoved.addListener(this.update.bind(this))
		chrome.tabs.onCreated.addListener(this.update.bind(this))
		chrome.tabs.onUpdated.addListener(this.update.bind(this))
		chrome.tabs.onMoved.addListener(this.update.bind(this))
		chrome.tabs.onDetached.addListener(this.update.bind(this))
		chrome.tabs.onRemoved.addListener(this.update.bind(this))
		chrome.tabs.onReplaced.addListener(this.update.bind(this))
	},

	// updates the application's interface to match the current tabs

	update:function(){

		//iterates through each chrome window for an update
		chrome.windows.getAll({populate:true},function(windows){

			// initializes windows array with current windows and
			// sets other parameters as empty
			this.state.windows = windows;
			this.state.windowIds = {};
			this.state.tabIds = {};

			// updates windowIds with the current windows
			for(var i = 0; i < windows.length; i++){
				this.state.windowIds[window.id] = windows[i];

				// updates tabIds with current tabs
				for(var j = 0; j < windows[i].tabs.length; j++){
					this.state.tabIds[windows[i].id] = windows[i].tabs[j];
				}
			}

			// resets currentTab to return false for tab ids 
			// that do not match the currently open tab
			for(var id in this.state.currentTab){
				if(!this.state.tabIds[id]) delete this.state.currentTab[id];
			}
			this.forceUpdate();
		}.bind(this));
	}

}));
