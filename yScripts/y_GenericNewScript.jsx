﻿#include "../yScripts/y_JSExtensions.jsx";

function GenericTool()
{
    this.info =
    {
	name : "GenericTool",
	version : 0.1,
	stage : "development",
	description : "Generic script to use as a base for new tools.",
	url : "yorchnet.com"
    };
    this.appearence =
    {
	buttonHeight : 30,
	buttonWidth : 126
    };
    this.resources = 
    {
	icon : new File('yNet.png'),
    };
    this.methods =
    {
	pad : function ( n , pad ) {
		zeros = "";
		for ( i = 0 ; i < pad ; i ++ )
		{
		    zeros+="0";
		}
		n = String(n);
		padded = zeros.substr( 0, pad - n.length ) + String(n) ;
		return padded
	    },
	replace: function( items , string , newString ){
	    for ( i = 0 ; i < items.length ; i ++ ){
		var item = items[i];
		item.name = item.name.replace( string , newString );
	    }
	    return true;
	},
	getSelectedProjectItems: function  (){
	    var items = [];
	    var p = app.project;
	    for ( var i = 1 ; i <= p.numItems ; i ++ ){
		var item = p.item(i);
		if ( item.selected ){
		    items.push(item);
		}
	    }
	    //items = items.concat( app.project.activeItem.selectedItems );
	    return items;
	},
	suffix: function ( items , suffix ){
	    for ( i = 0 ; i < items.length ; i ++ ){
		    var item = items[i];
		    if ( item.name.search( suffix ) != (item.name.length - suffix.length) ){
			item.name+= "_"+suffix;
		    }
		    
		}
		return true;
	    },
	prefix : function( items , prefix ){
		for ( i = 0 ; i < items.length ; i ++ )
		{
		    var item = items[i];
		    if ( item.name.search( prefix ) != 0 ){
			item.name = prefix + "_" + item.name;
		    }
		}
		return true;
	    },
	rename: function ( items , new_name ){
	    for ( i = 0 ; i < items.length ; i ++ ){
		var item = items[i];
		item.name = new_name + "_" + i;
	    }
	
	}
	
    }
    this.init = function init()
    {
        
	this.btnLauyout = 
	"button\
	 {\
	    preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'],\
	    text:'" + this.info.name + "',\
	    helpTip:'" + this.info.description + "'\
	 }";
	
	this. res = 
	 "window\
	{\
	    type:'palette',\
	    text:'" + this.info.name + ' ' + this.info.ver + ' ' + this.info.stage + "',\
	    info: Group \
	    {\
		alignment:['center','bottom'],\
		icon: Image \
		{\
		    icon:'" + this.resources.icon.path + '/' + this.resources.icon.name + "',\
		    preferredSize: [15, 18]\
		},\
		website: StaticText\
		{\
		    text:'" + this.info.url + "',\
		    alignment:['fill','center']\
		},\
	    }\
	}";
    }
    this.createUI = function createUI( )
    {
	var myUI = this;
	var res =
	" window {\
	    text: 'GenericTool',\
		alignment: ['fill','fill'], \
		alignChildren: ['center','top'], \
		orientation: 'column', \
		resizeable: 'true'\
	}"
	var res = 
	"window { \
	    text: 'GenericTool',\
	    alignment: ['fill','fill'], \
	    alignChildren: ['center','top'], \
	    orientation: 'column', \
	    resizeable: 'true',\
	    tabs: Panel {\
		type: 'tabbedpanel',\
		alignment: ['fill','fill'], \
		alignChildren: ['center','top'], \
		search_tab: Panel {\
		    type: 'tab',\
		    text: 'Search & Replace',\
		    orientation: 'column', \
		    alignChildren: ['center','top'], \
		    searchGrp: Group {\
			alignment: ['fill','fill'], \
			alignChildren: ['center','top'], \
			orientation: 'column', \
			searchString: EditText {text:'SEARCH FOR TEXT',alignment: ['fill','center']}, \
		    },\
		    replaceGrp: Group {\
			alignment: ['fill','fill'], \
			alignChildren: ['center','center'], \
			orientation: 'column', \
			replaceString: EditText {text:'REPLACE WITH TEXT',alignment: ['fill','center']}, \
		    }\
		    doItBtn: Button {text: 'Replace in selected Comps', alignment: ['center','center']} , \
		}\
		suprefix: Panel {\
		    type: 'tab',\
		    text: 'Suffix / Prefix',\
		    orientation: 'column', \
		    suprefixGrp: Group {\
			alignment: ['fill','fill'], \
			alignChildren: ['left','center'], \
			orientation: 'column', \
			pre:Group {\
			    alignment: ['fill','fill'], \
			    alignChildren: ['left','center'], \
			    orientation: 'row', \
			    prefixString: EditText {text:'PREFIX',alignment: ['fill','center']}, \
			    prefixBtn: Button {text: 'Preffix'} , \
			},\
			su:Group{\
			    alignment: ['fill','fill'], \
			    alignChildren: ['left','center'], \
			    orientation: 'row', \
			    sufixString: EditText {text:'SUFIX',alignment: ['fill','center']}, \
			    sufixBtn: Button {text: 'Sufix'} , \
			}\
		    },\
		},\
		rename_tab: Panel {\
		    type: 'tab',\
		    text: 'Rename',\
		    renameGrp: Group {\
			alignment: ['fill','fill'], \
			alignChildren: ['left','center'], \
			orientation: 'row', \
			renameString: EditText {text:'NEW NAME',alignment: ['fill','center']}, \
			renameBtn: Button {text: 'Rename'} ,\
		    }\
		}\
	    },\
	}";
		
	myUI.window = new Window( res );
	myUI.window.layout.layout(true);

	myUI.window.show();
	
	myUI.window.layout.onResizing = myUI.window.layout.onResize = function () { myUI.layout.resize();}
	
	//EVENT HANDLERS
	
	/*
	myUI.window.tabs.search_tab.doItBtn.onClick = function(){
	    var search_str = myUI.window.tabs.search_tab.searchGrp.searchString.text;
	    var replace_str = myUI.window.tabs.search_tab.replaceGrp.replaceString.text;
	    myUI.methods.replace( myUI.methods.getSelectedProjectItems() , search_str , replace_str );
	};
	
	myUI.window.tabs.suprefix.suprefixGrp.pre.prefixBtn.onClick = function(){
	    var pre = myUI.window.tabs.suprefix.suprefixGrp.su.prefixString.text;
	    myUI.methods.prefix( myUI.methods.getSelectedProjectItems() , pre );
	};
	
	myUI.window.tabs.suprefix.suprefixGrp.su.sufixBtn.onClick = function(){
	    var su = myUI.window.tabs.suprefix.suprefixGrp.su.sufixString.text;
	    myUI.methods.suffix( myUI.methods.getSelectedProjectItems() , su );
	};
	
	myUI.window.tabs.rename_tab.renameGrp.renameBtn.onClick = function(){
	    var new_name = myUI.window.tabs.rename_tab.renameGrp.renameString.text;
	    myUI.methods.rename( myUI.methods.getSelectedProjectItems() , new_name );
	};
	*/
	
	//END EVENT HANDLERS
	
	return(this);
    }
    
    this.yMainFunction = function yMainFunction()
    {
        w = this.createUI();
    }
    this.activate = function activate()
    {
	this.yTool.yMainFunction();
    }
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    gt = new GenericTool();
    gt.activate();
}
else
{
    YTB.addTool(new GenericTool());
}
