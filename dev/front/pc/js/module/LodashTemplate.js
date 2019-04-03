class LodashTemplate{
    constructor(){
        this.init();
    }
    init(){
        this.template = _.template;
        const templateSettings = _.templateSettings;
        templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;
    }
    add(target,templateName,obj,type){
        const $target = document.getElementById(target);
        const $template = document.getElementById(templateName);
        const compile = this.template($template.innerHTML);
        let html = compile({data: obj});
        $('#' + target).append(html)
    }
}

export default LodashTemplate;






