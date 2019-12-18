<?php
$server = "localhost";
$username = "root";
$password = "rootroot";
$conn = mysqli_connect($server,$username,$password);	
if(!$conn)					
    die("can not connect to the server $server");
$sql = $conn->query('CREATE DATABASE IF NOT EXISTS LocalStorage');
if(!$sql)
    die("error");	
mysqli_select_db($conn, 'LocalStorage');
$sql = "CREATE TABLE IF NOT EXISTS LocalStorageObjects (
    EventType VARCHAR(300) DEFAULT NULL,
    EvenTarget VARCHAR(300) DEFAULT NULL,
    EvenDate VARCHAR(300) DEFAULT NULL
    )";
$sql = $conn->query($sql);
if(!$sql)
    die("failed to create the database");
?>