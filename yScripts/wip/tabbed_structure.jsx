﻿template_str="\
01 MAIN\
    02 PComp\
03 Source Layers\
04 Movies\
05 Other Projects\
06 Audio\
07 References\
";

var FolderStructure = function(){
    var template = template_str.split('\n');
    template = template.slice(1,template.length-1);
    var tab="    ";
    for(var i = 0; i < template.length; i++){
        alert(template[i].split(tab));
        this[template[i]]='';
        }
    this.print = function(){
        for (var i in this){
            }
        };
};
fs = new FolderStructure()

fs.print();
