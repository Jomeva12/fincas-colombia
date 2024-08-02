<?php
// Incluir el archivo de conexión a la base de datos
include('conexion.php');

// Query para seleccionar todos los registros de la tabla 'post2'
$query = "SELECT * FROM post2";

// Ejecutar la consulta
$resultado = mysqli_query($connection, $query);

// Inicializar un array para almacenar los datos
$datos = array();

// Verificar si hay resultados
if (mysqli_num_rows($resultado) > 0) {
    // Recorrer los resultados y agregarlos al array
    while ($row = mysqli_fetch_assoc($resultado)) {
        $datos[] = array(
            'id' => $row['idpost2'],
            'title' => $row['title'],
            'description' => $row['description'],
            'imageURL' => $row['imageURL'],
            'date' => $row['date']
        );
    }
}

// Convertir el array a formato JSON
$jsonString = json_encode($datos);

// Imprimir el JSON
echo $jsonString;

// Cerrar la conexión a la base de datos
mysqli_close($connection);
?>
