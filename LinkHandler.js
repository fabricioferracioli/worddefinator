var LinkHandler = Class.create({

    initialize: function(){
        this.wordHandler = new WordHandler();
    },
    /**
    criaLinks: recebe uma string, concatena a tag e cria um no da arvore dom
    */
    criaLink: function(word){

        var ancora = "<span class=\"wd_link\" style=\"color:blue;cursor:pointer;text-decoration:underline;\" id=\"http://pt.wikipedia.org/wiki/"+word+"\">"+word+"</span>";
        return ancora;
    },

    insereLinks: function(elementos)
    {
        var tags = $w(elementos.innerHTML.stripTags());
        for(var i=0; i < tags.length; i++)
        {
            tags[i] = this.wordHandler.retiraPontuacao(tags[i]);
            if(!this.wordHandler.isPalavraComum(tags[i]))
            {
                tags[i] = linkHandler.criaLink(tags[i]);
            }
        }

        return tags;
    }
});