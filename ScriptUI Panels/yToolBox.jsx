﻿var scriptUIPanel = this;
YTB =
{   
    info :
    {
        name : "yToolBox",
        ver : 0.51,
        status : "alpha",
        url : "yorchnet.com",
        description : "My mixed bag of tools"
    },
    resources :
    {
        icon : new File('../yScripts/yNet.png'),
        header :  new File('../yScripts/header.png')
    },
    appearence :
    {
      buttonHeight : 30,
      buttonWidth : 126  
    },
    tools : [],
    createUI : function createUI()
    {
        var res ="group\
        {\
        orientation:'column',\
        alignment:['fill','fill'],\
        margins:[0,0,0,0]\
        header: Group\
        {\
            orientation:'column',\
            alignment:['center','top'],\
            margins:[0,0,0,0]\
            title: Image\
            {\
                icon:'" + this.resources.header.path + '/' + this.resources.header.name + "',\
                preferredSize: [175, 35]},\
                ver: StaticText\
                {\
                    text:'" + this.info.ver + "',\
                    alignment:['center','center']\
                }\
                desc: StaticText\
                {\
                    text:'" + this.info.description + "',\
                    alignment:['center','center']\
                },\
        },\
        main: Group\
        {\
            orientation:'column',\
            alignment:['fill','fill'],\
            alignChildren:['center','center'],\
        },\
        footer: Group\
        {\
        alignment:['center','bottom'], \
                icn_app: Image {icon:'" + this.resources.icon.path + '/' + this.resources.icon.name + "',preferredSize: [15, 18]},\
                txt_info: StaticText { text:'"+ this.info.url + "', alignment:['fill','center'] },\
            }, \
        }";
        this.window.grp = this.window.add( res );
        
        this.window.layout.layout(true);
        this.customizeUI();
        
        //EventHandlerAssignment
        this.window.onResize = this.resize;
        this.window.onClose = this.close;
        this.window.onDraw = this.autoLayout;
    },
    customizeUI : function customizeUI()
    {
        var g  = this.window.graphics;    
        var orange = g.newBrush(g.BrushType.SOLID_COLOR, [1, .45, 0, 1]);    
        this.window.grp.main.graphics.backgroundColor = orange;
    },
    addTool : function addTool( aTool )
    {
        /**** TO DO ****/
        // Check that the tool object is unique.
        // Call for a window resize so it refreshes propperly.
        //alert( aTool.info.name );
        
        this.tools.push( aTool );
        //alert( aTool.btnLauyout );
        var btn  = this.window.grp.main.add( aTool.btnLauyout );
        
        btn.onClick = aTool.activate;
        btn.yTool = aTool; // add a reference to the tool so I can access info on it later...
        
        //alert(btn.onClick);

        this.window.layout.layout(true);
        this.window.layout.resize();
        
        return aTool;
        
    },
    //EVENT HANDLERS
    resize : function resize()
    {
        this.layout.resize();
    },
    close : function close()
    {
        YTB = null;
        delete this;
    },
    init : function init()
    {
        this.window = ( scriptUIPanel instanceof Panel ) ? scriptUIPanel: new Window( "palette" , this.info.name , undefined, { resizeable : true } );
        this.createUI();
    }
    
};

YTB.init();

#include "../yScripts/y_setStructure.jsx";
#include "../yScripts/y_CompHerder.jsx";
#include "../yScripts/RenderToProject.jsx";
#include "../yScripts/y_colorProbe.jsx";
#include "../yScripts/y_BindBetween2.jsx";
#include "../yScripts/y_CPOffset.jsx";
#include "../yScripts/y_puppetRig.jsx";
#include "../yScripts/y_stopMotionLayer.jsx";

