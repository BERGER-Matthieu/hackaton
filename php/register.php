<?php
    require_once("connect.php");

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: JSON");

    $body = file_get_contents('php://input');
    $data = json_decode($body);

    $email = $data->email;
    $username = $data->username;
    $password = $data->password;
    $confirmPassword = $data->confirmPassword;
    
    $isAdded = TRUE;
    $message = "Your account as been added.";

    if($password == "" && $confirmPassword == "" && $email == "" && $username == "") {
        $message = "please fill all the fields field";
        $isAdded = FALSE;
        goto add;
    }
    if($password != $confirmPassword) {
        $message = "please use the same password in the \"confirm pasword\" field";
        $isAdded = FALSE;
        goto add;
    }
    if(strlen($password) < 8) {
        $message = "pasword should be at least 8 character long";
        $isAdded = FALSE;
        goto add;
    }
    if(strlen($password) > 50) {
        $message = "password can't be longer than 50 chatacter long";
        $isAdded = FALSE;
        goto add;
    }
    if(!strpbrk($password, "!#$.,:;()")) {
        $message = "password must contain at least 1 special character (! # . , ; : ( ))";
        $isAdded = FALSE;
        goto add;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "Incvalid email format";
        $isAdded = FALSE;
        goto add;
    }
    
    //check if an account already exist with this email or username, if not it will create it else it will sent back the user to the login/register page with an error
    $sql = "SELECT * FROM account WHERE Email = '$email' OR Username = '$username'";
    $result = $conn->query($sql);
    
    if($result->num_rows > 0) {
        $message = "email or name already used";
        $isAdded = FALSE;
        goto add;
    } 
    
    add:

    if($isAdded) {
        $password = md5($password);
        $sql = "INSERT INTO account (username, email, password) VALUES ('$username', '$email', '$password')";
        $conn->query($sql);
    }

    $response = [];
    $response["isAdded"] = $isAdded;
    $response["message"] = $message;

    echo json_encode($response, JSON_PRETTY_PRINT);
?>