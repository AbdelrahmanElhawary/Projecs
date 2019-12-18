<?php
    $all=array();
    if(isset($_GET['data'])){
        $sql = "SELECT * FROM LocalStorageObjects";
        $conn = new mysqli("localhost", "root", "rootroot", "LocalStorage");
        if($conn->connect_error){
            die($conn->connect_error);
        }
    }
    if($result = $conn->query($sql)){
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                array_push($all, $row);
            }
            echo json_encode($all);
        }
    }
    else{
        echo "No Data To Retrieve !";
    }
?>