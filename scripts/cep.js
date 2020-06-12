$(document).ready(function () {
    $("#txtCep").focusout(function(){

        var cep = $("#txtCep").val();
        var urlStr = "https://viacep.com.br/ws/"+ cep +"/json/"

        $.ajax({
            url: urlStr,
            type :  "get",
            dataType : "json",
            success : function(data){
                $("#txtCidade").val(data.localidade);
                $("#txtEstado").val(data.uf);
                $("#txtBairro").val(data.bairro);
                $("#txtRua").val(data.logradouro);
                $("#txtComplemento").val(data.complemento);
                console.log(data);

            },
            error : function(erro){
                console.log(erro)
            }
        });
    });
});