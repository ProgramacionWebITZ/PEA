var logi;
var ajax;
function login(){
    document.getElementById("error").innerHTML="";
    var f = document.querySelector("#form-login");
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
        
    } else {
        ajax = new ActiveXObject(microsofXMLHTTP);
    }
    ajax.onreadystatechange = procesarLogin;
    ajax.open("GET", "peticion/peticionLogin.jsp?control="+f.control.value+"&pass="+f.pass.value, true);
    ajax.send();
}
function procesarLogin(){
    if (ajax.readyState==4 && ajax.status==200) {
        var respuesta = ajax.responseText;
        var inicio = respuesta.indexOf('{');
        var fin = respuesta.indexOf('}');
        var contenido = respuesta.substring(inicio, fin+1);
        if (contenido=="{}") {
            document.getElementById("error").innerHTML="<p style='color: red; fontsize: 18px;'>Usurio o contraseña incorrecta</p>";
        } else {
            contenido= "["+contenido+"]";
            logi=JSON.parse(contenido);
            var rol="";
            var usu="";
            for (var i = 0; i < logi.length; i++) {
                rol=logi[i].rol;
                usu = logi[i].nombre;
            }
            if (rol=="alum") {
                window.location.href = "http://localhost:8080/ProyectoFinal/vista/jsp/alumno.jsp?usuario="+usu;
            }
            if (rol=="profe") {
                window.location.href = "http://localhost:8080/ProyectoFinal/vista/jsp/profesor.jsp?usuario="+usu;
            }
        }        
    }
}
$(document).ready(function () {
   $(".jumbotron").html("hola");
   $( "#men" ).hide();
   
   $("#ic").click(function () {
    $("#men").show();
});
});
