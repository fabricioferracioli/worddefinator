    //WordHandler: classe para manipulação de tokens
    var WordHandler = Class.create({

    initialize: function() {

        this.palavrasComuns = ['a','e','ou','de','da','do','em','as','os','uns','um','o','das','dos','se','nas','para'];
        
        this.pontuacao = /[.,:;*'"%()]/;
    },

    //Método que Verifica se uma Palavra qualquer é Palavra comum que não necessita de definição
    isPalavraComum: function(palavra){

        if(palavra.empty() || this.palavrasComuns.indexOf(palavra.toLowerCase()) == -1)
        {
            return false;
        }
        return true;
    },

    //Método que Verifica se uma Palavra qualquer é Simbolo e que não necessita de definição
    isPontuacao: function(palavra){

        if(palavra.empty() || this.pontuacao.indexOf(palavra) == -1)
        {
            return true;
        }
        return false;

    },

    retiraPontuacao: function(palavra){
        return palavra.gsub(this.pontuacao, "");
    }
});
