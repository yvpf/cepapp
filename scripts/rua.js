function populateUFs() {
    var ufSelect = document.querySelector("select[name=uf]")
    console.log(ufSelect)

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (var state of states) {
                ufSelect.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`
            }

        })

}

populateUFs()

$(document).ready(function () {
    $("#uf").focusout(function () {

        var uf = $("#uf").val();

        $("#city").prop("disabled", false);
        
        var citysearch = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+ uf +"/municipios";
        
        $.ajax({
            url: citysearch,
            type: "get",
            dataType: "json",
            success: function (data) {
                $("#city").empty();
                for(var city of data){
                    $("#city").append(`<option value="${city.nome}">${city.nome}</option>`);
                    
                }
            },
            error: function (erro) {
                console.log(erro)
            }

        });
        
        console.log()

        $("#city").focusout( function(){
            var cidade = $("#city").val();

            $("#rua").focusout(function () {
                var rua = $("#rua").val();
                //console.log(cidade);
                var cidade2 = cidade.replace(/\s/g, '%20');
                //console.log(uf);
                //console.log(rua);
                var rua2 = rua.replace(/\s/g, '%20');
                var urrl = "http://viacep.com.br/ws/" + uf + "/" + cidade2 +"/"+rua2+"/json/"
                console.log(urrl);
                
                $.ajax({
                    url: urrl,
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        //$("#ceppos").val(data[0].cep);
                        $("#recebe").empty();
                        for(item of data){
                            
                            $("#recebe").append(`<p id="retorno">${item.cep}  ${item.logradouro}</p>`)
                        }
                        
                    },
                    error: function (erro) {
                        console.log(erro)
                    }

                });
                
            })

        })
  
    });
});
