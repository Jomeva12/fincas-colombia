<?php

include('conexion.php');


if(isset($_POST['id'])){
    $id=$_POST['id'];

$query="SELECT*from post2 where idpost2='$id'";

  $result =mysqli_query($connection,$query);   
  $json=array(); 
  
      while($row=mysqli_fetch_array($result)){
        $json[]=array(
          'id'=>$row['idpost2'], 

          'title'=>$row['title'],
          'description'=>$row['description'],
          'imageURL'=>$row['imageURL'],
          'date'=>$row['date'],
          
           ); 
            }
       $jsonString=json_encode($json);
      echo $jsonString;

        } else{


            echo "no se encontro";
        }



?>