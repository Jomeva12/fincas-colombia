// Función para cargar los datos y generar la tabla
function cargarDatos() {
    // Utiliza fetch para realizar una solicitud GET a 'php/listarTabla.php'
    fetch('php/listarTabla.php')
        .then(response => response.json()) // Convierte la respuesta en formato JSON
        .then(datos => { // Maneja los datos recibidos
            console.log(datos); // Imprime los datos en la consola para depuración
            generarTabla(datos); // Llama a la función para generar la tabla con los datos recibidos
        })
        .catch(error => console.error('Error al cargar los datos:', error)); // Muestra un error en la consola si ocurre
}

// Función para generar la tabla
function generarTabla(datos) {
    let plantilla = ""; // Inicializa una variable para almacenar el HTML de la tabla
    datos.forEach(element => { // Recorre cada elemento en los datos recibidos
        // Crea una fila de tabla con los datos del elemento
        plantilla += `
            <tr>
                <td>${element.title}</td> <!-- Muestra el título del elemento -->
                <td>${recortarTexto(element.description, 50)}</td> <!-- Muestra una descripción recortada del elemento -->
                <td><img src="${element.imageURL}" alt="" style="max-width: 150px;"></td> <!-- Muestra la imagen del elemento -->
                <td>${element.date}</td> <!-- Muestra la fecha del elemento -->
                <td><button onclick='eliminarRegistro(${element.id})' class="btn btn-danger">Eliminar</button></td> <!-- Botón para eliminar el elemento -->
            </tr>
        `;
    });
    document.getElementById("tabla-contenedor").innerHTML = plantilla; // Inserta el HTML generado en el contenedor de la tabla
}

// Función para recortar texto
function recortarTexto(texto, longitud) {
    // Si el texto es más largo que la longitud especificada, lo recorta y añade '...'
    return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
}

// Función para eliminar una fila
function eliminarRegistro(id) {
    if (confirm("¿Estás seguro de que deseas eliminarlo?")) { // Muestra una confirmación antes de eliminar
        // Utiliza fetch para realizar una solicitud POST a 'php/delete.php'
        fetch('php/delete.php', {
            method: 'POST', // Especifica el método POST
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
            },
            body: 'idpost2=' + id // Envía el ID del registro a eliminar
        })
        .then(response => response.json()) // Convierte la respuesta en formato JSON
        .then(respuesta => { // Maneja la respuesta del servidor
            if (respuesta.exito) { // Si la eliminación fue exitosa
                window.location.reload(); // Recarga la página para reflejar los cambios
            } else {
                console.error('Error al eliminar el registro'); // Muestra un error en la consola si ocurre
            }
        })
        .catch(error => console.error('Error al eliminar el registro:', error)); // Muestra un error en la consola si ocurre
    }
}

// Llamar a la función para cargar los datos y generar la tabla al cargar la página
window.onload = cargarDatos; // Ejecuta cargarDatos cuando la página se haya cargado completamente
