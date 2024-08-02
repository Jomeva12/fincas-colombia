<?php
include('conexion.php');

$imagen = $_FILES['imagen'];
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$fecha = date('Y-m-d');

$escaped_text = $connection->real_escape_string($descripcion);

if (($_FILES["imagen"]["type"] == "image/gif")
    || ($_FILES["imagen"]["type"] == "image/jpeg")
    || ($_FILES["imagen"]["type"] == "image/jpg")
    || ($_FILES["imagen"]["type"] == "image/png")) {

    $nombreTemporal = $imagen["tmp_name"];
    $rutaAGuardar = "./fotos/" . md5($nombreTemporal) . ".jpg";
    $ruta = "../fotos/" . md5($nombreTemporal) . ".jpg";
    $query = "INSERT into post2(title, description, imageURL, date) values('$titulo', '$escaped_text', '$rutaAGuardar', '$fecha');";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die("No se pudo guardar");
    } else {
        move_uploaded_file($nombreTemporal, $ruta);
        echo $ruta;
    }
} else {
    echo "Seleccione una imagen correcta";
}
?>
