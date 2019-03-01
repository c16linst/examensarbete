<?php
  try {
    $user = 'root';
    $pass = '';

    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=examensarbete;', $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $username = $_POST['username'];
    $email = $_POST['email'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $phone = $_POST['phone'];
    $website = $_POST['website'];
    $age = $_POST['age'];
    $address = $_POST['address'];
    $zipcode = $_POST['zipcode'];
    $country = $_POST['country'];
    $pwd = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // The query is crafted so that an SQL injection could actually occur
    $query = 'insert into users values("'.$username.'","'.$pwd.'","'.$email.'","'.$fname.'","'.$lname.'","'.$phone.'","'.$website.'","'.$age.'","'.$address.'","'.$zipcode.'","'.$country.'")';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
  } catch(Exception $e) {
    print_r($e);
  }
?>
