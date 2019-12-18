<?php 
    if(isset($_POST['data'])){
        $data = json_decode($_POST['data'], true);
        $conn = new mysqli("localhost", "root", "rootroot", "LocalStorage");
        if($conn->connect_error)
            die($conn->connect_error);
        $event = $data['EventType'];
        $eventTarget = strval($data['EventTarget']);
        $eventTime = $data['EventTime'];
        $sql = "INSERT INTO LocalStorageObjects VALUES('$event', '$eventTarget', '$eventTime')";
        $conn->query($sql);
        if($conn->affected_rows > 0)
            echo "Inserted Successfully";
        else
            echo "A problem Occured";
    } 
?>