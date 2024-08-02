
$(function () {


    agregarnuevo();
    listarPost();



})

function agregarnuevo() {


    $("#guardar").on('click', function(e) {
        e.preventDefault(); // Prevenir la acción por defecto del formulario
console.log("entra")
       
            $(this).prop('disabled', true); // Deshabilita el botón para prevenir múltiples envíos

            var dato = new FormData($("#formulario")[0]);
            $.ajax({
                url: 'php/crearPost.php',
                type: 'POST',
                data: dato,
                contentType: false,
                processData: false,
                success: function (response) {
               
                    console.log(response);
                // Ocultar la vista previa de la imagen
                $("#previewImage").hide();
                // Resetea el formulario
                $("#formulario").trigger("reset");
                // Habilita el botón nuevamente
                $("#guardar").prop('disabled', false);
                // Mostrar la alerta después de ocultar la vista previa de la imagen
                alert("POST CREADO EXITOSAMENTE");
                // Recargar la página después de un segundo
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error en AJAX: ", textStatus, errorThrown);
                    alert("Error al crear el post.");
                    formEnviado = false; // Restablece el flag para permitir futuros envíos
                    $("#guardar").prop('disabled', false); // Habilita el botón nuevamente
                }
            });
          
    });
}

function listarPost() {
    $.ajax({
        url: './php/listarPost.php',
        type: 'GET',
        success: function (response) {
            let plantillaPost = "";
            let post = JSON.parse(response);
          
            post.forEach(p => {
                var fecha = new Date(p.date);
                var dia = fecha.getDate();
                var mes = fecha.getMonth();
                var nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                var nombreMes = nombresMeses[mes];
                let descripcionCorta = p.description.length > 100 
                ? p.description.substring(0, 100) + `<span  style="cursor: pointer;color: rgb(85, 141, 29);"><a target="_blank" href="./detallePost.html?id=${p.id}">....Ver mas</a></span>` 
                : p.description + `<span  style="cursor: pointer;color: rgb(85, 141, 29);"><a target="_blank" href="./detallePost.html?id=${p.id}">....Ver mas</a></span>`;
            
                plantillaPost += ` <div class="col-lg-4 col-md-6 mb-4 pb-2">
                    <div class="blog-item">
                        <div class="position-relative">
                            <img style="height: 200px; width: 150; object-fit: cover;" class="img-fluid w-100" src="${p.imageURL}" alt="">
                            <div class="blog-date">
                                <h6 class="font-weight-bold mb-n1">${dia}</h6>
                                <small class="text-white text-uppercase">${nombreMes}</small>
                            </div>
                        </div>
                        <div class="bg-white p-4">
                            <div class="d-flex mb-2">
                            <span  style="cursor: pointer;color: rgb(85, 141, 29);"><a target="_blank" href="./detallePost.html?id=${p.id}" style"margin-bottom: 30px;">${p.title}</a></span>
                              
                            </div>
                            <div style="height: 100px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; width: 100%; margin: auto; padding: 0 10px; box-sizing: border-box;" class="descripción-container">
                                <span id="descripcion-corta">${descripcionCorta}</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            
            $("#filaPost").html(plantillaPost);

            
        }
    });
}



