<?php
  
 include('conexion.php');

  $query="SELECT *from post2";
  
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




      

?>