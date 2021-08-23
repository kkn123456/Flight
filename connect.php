<?php
$server = "localhost";
$username ="root";
$password = "";

$conn =  mysqli_connect($server, $username, $password);

if(!$con){
    die("connection failed". mysqli_connect_error());
}
// echo "success connect";

?>