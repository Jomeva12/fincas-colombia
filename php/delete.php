<?php
// Conexión a la base de datos (asegúrate de incluir la conexión adecuada)
include('conexion.php');

// Verificar si se recibió un ID válido para eliminar
if (isset($_POST['idpost2'])) { // Cambio aquí: nombre del campo POST corregido
    $id = $_POST['idpost2'];

    // Consulta SQL para eliminar el registro con el ID especificado
    $query = "DELETE FROM post2 WHERE idpost2 = $id"; // Cambio aquí: nombre del campo en la consulta corregido

    // Ejecutar la consulta
    if (mysqli_query($connection, $query)) {
        // Si la eliminación se realiza con éxito, enviar una respuesta JSON al cliente
        echo json_encode(array('exito' => true));
    } else {
        // Si hay un error al eliminar el registro, enviar una respuesta JSON con un mensaje de error
        echo json_encode(array('exito' => false, 'mensaje' => 'Error al eliminar el registro'));
    }

    // Cerrar la conexión a la base de datos
    mysqli_close($connection);
} else {
    // Si no se recibió un ID válido, enviar una respuesta JSON con un mensaje de error
    echo json_encode(array('exito' => false, 'mensaje' => 'ID no recibido'));
}
?>
