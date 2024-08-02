$(function () {
    obtenerIdDesdeURL()
})

function obtenerIdDesdeURL() {
    // Suponiendo que `window.location.search` devuelve `?id=29`
    const parametrosURL = new URLSearchParams(window.location.search);
    const id = parametrosURL.get('id'); // Obtendrá '29'
    console.log(id); // Muestra el id en la consola
    listarDetalle(id)
  }


  function listarDetalle(id) {


   
      
console.log("entra")
       
           var dato= {
            id:id
           }
           $.ajax({
            url: 'php/detallePost.php',
            type: 'POST',
            data: dato,
            success: function (response) {
                    console.log(response);
                    let post = JSON.parse(response);
                    $("#titulo").html(post[0].title) 
                    $("#imagen").attr('src', post[0].imageURL);
                    $("#descripcion").html(post[0].description) 



                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error en AJAX: ", textStatus, errorThrown);
                    
                }
            });
       
    
}