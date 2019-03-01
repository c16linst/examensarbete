<?php
  try {
    $user = 'root';
    $pass = '';

    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=examensarbete;', $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = $_POST['email'];

    // The query is crafted so that an SQL injection could actually occur
    $query = 'insert into emails values("'.$email.'")';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
  } catch(Exception $e) {
    print_r($e);
  }
?>
