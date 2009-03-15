var linkHandler = new LinkHandler();
var main;
var WordDefinator = Class.create({

    initialize: function()
    {
        var tagsComTexto = new Array(
            $$("li"),
            $$("p"),
            $$("pre"),
            $$("td"),
            $$("th"),
            $$("blockquote"),
            $$("q"),
            $$("dd"),
            $$("dt"),
            $$("label"),
            $$("h1"),
            $$("h2"),
            $$("h3"),
            $$("h4"),
            $$("h5"),
            $$("h6"),
            $$("caption")
        );
        tagsComTexto = tagsComTexto.flatten();
        tagsComTexto.each(function(tag)
        {
            tag.addClassName("wd_tag");
        });
    },

    criaJanela: function(parametroUrls)
    {
        $$("body")[0].insert(
            new Element("div", {'id':'wd_janelinha'})
        ).insert(
            new Element("div", {'id':'wd_div_iframe'}).insert(
                new Element("ul", {'id':'wd_nav','style':'list-style-type:none'}).insert(
                    new Element("li", {'class':'wd_item', 'id':'http://pt.wikipedia.org/wiki/'+parametroUrls}).update("Wikipedia(Pt)").observe("click", function(){
                        $("wd_iframe").src = this.id;
                    })
                ).insert(
                    new Element("li", {'class':'wd_item', 'id':'http://en.wikipedia.org/wiki/'+parametroUrls}).update("Wikipedia(En)").observe("click", function(){
                        $("wd_iframe").src = this.id;
                    })
                ).insert(
                    new Element("li", {'class':'wd_item', 'id':'http://michaelis.uol.com.br/moderno/portugues/index.php?lingua=portugues-portugues&palavra='+parametroUrls}).update("Michaelis").observe("click", function(){
                        $("wd_iframe").src = this.id;
                    })
                ).insert(
                    new Element("li", {'class':'wd_item', 'id':'http://dictionary.reference.com/browse/'+parametroUrls}).update("Dictionary").observe("click", function(){
                        $("wd_iframe").src = this.id;
                    })
                )
            ).insert(
                new Element("iframe", {'id':'wd_iframe'})
            )
        );
        $("wd_janelinha").hide();
        $("wd_div_iframe").hide();
        $("wd_janelinha").setStyle("top: 0px; left: 0px; position: fixed; width: 100%; height: 100%; background-color: black;");
//         $("wd_janelinha").setOpacity(0.5);
        $("wd_div_iframe").setStyle("left: 50%; top: 50%; margin: -320px 0 0 -360px; position: fixed; width: 720px; height: 640px; background-color: #aaa; border: 1px solid #fff");
        $("wd_nav").setStyle("float: right;");
        $$("#wd_nav li").invoke("setStyle", {'display': 'inline', 'padding': '5px 5px 15px 5px', 'border': '2px solid #efefef', 'background':'#dedede','color':'#2222aa','cursor':'pointer'});
        $("wd_iframe").setStyle("width: 100%; height: 95%; border: none;");
    }
});

document.observe("dom:loaded", function()
{
    var elmBody;
    main = new WordDefinator();

    document.observe('keydown', function(event){
    //aparentemente o direito eh 115 e o esquerdo 116 no linux. No artigo diz que eh 91
        if(event.keyCode == 119)
        {
            this.elmBody = $$("body")[0].innerHTML;
            var tags;
            $$(".wd_tag").each(function(tag){
                tags = linkHandler.insereLinks(tag);
                tag.update(tags.join(" "));
            });

            $$(".wd_link").each(function(wd_link){
                wd_link.observe("click", function(evt){

                    main.criaJanela(wd_link.id.gsub(/.*\//,''));
                    $("wd_iframe").src = wd_link.id;
                    new Effect.Opacity('wd_janelinha', { from: 0, to: 0.5 });
                    $("wd_janelinha").show();
                    new Effect.SlideDown('wd_div_iframe', { duration: 3.0 });
                    $("wd_div_iframe").show();

                });
            });
        }
        else if(event.keyCode == Event.KEY_ESC)
        {
            if($("wd_janelinha") != undefined && $("wd_div_iframe") != undefined && $("wd_iframe") != undefined)
            {
                $("wd_janelinha").hide();
                $("wd_div_iframe").hide();
                $("wd_iframe").hide();
            }
            $$("body")[0].update(this.elmBody);
        }
    });
});