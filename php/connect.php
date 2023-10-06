<?php
    $conn = mysqli_connect("localhost", "root", "", "hackaton");

    if (!$conn) {
        echo "Connection failed!";
    }
?>