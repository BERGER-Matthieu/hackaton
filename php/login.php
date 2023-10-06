<?php
    //will connect to the database and check if a user with this username or email and this password exist
    require_once("connect.php");

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: JSON");

    $body = file_get_contents('php://input');
    $data = json_decode($body);

    $nameOrMail = $data->nameOrEmail;
    $password = md5($data->password);
    
    $isLoggedIn = FALSE;
    $message = "This account does not exist.";
    $id = "";

    $sql = "SELECT * FROM account WHERE email = '$nameOrMail' OR username = '$nameOrMail' AND password = '$password'";
    $result = $conn->query($sql);

    if($result->num_rows === 1) {
        $isLoggedIn = TRUE;
        $message = "You've been logged in.";

        $row = $result->fetch_assoc();
        $id = $row["id"];
    }

    $response = [];
    $response["isLoggedIn"] = $isLoggedIn;
    $response["message"] = $message;
    $response["id"] = $id;


    echo json_encode($response, JSON_PRETTY_PRINT);
?>