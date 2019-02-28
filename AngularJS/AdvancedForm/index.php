<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Scenario</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <style>
    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }

    label {
      font-weight: bold;
    }

    input {
      width: 160px;
    }
  </style>
</head>
<body>
  <?php if(isset($_POST['username'])) : ?>
    <h1>Welcome <?php echo $_POST['fname'] . ' ' . $_POST['lname']; ?>!</h1>
    <p><b>Username:</b> <?php echo $_POST['username']; ?>, <?php echo $_POST['age'] ?> y/o</p>
    <p><b>E-mail:</b> <?php echo $_POST['email']; ?></p>
    <p><b>Phone number:</b> <?php echo $_POST['phone']; ?></p>
    <p><b>Address:</b> <?php echo $_POST['address']; ?>, <?php echo $_POST['zipcode'] ?></p>
    <br>
    <a href="<?php echo $_POST['website'] ?>">Go to website</a>
  <?php else : ?>
    <div ng-app="">
      <form name="form" action="index.php" method="post" ng-model="form">
        <table>
          <tr>
            <td><label for="username">Username:</label></td>
            <td><input type="text" name="username" placeholder="Username123" ng-model="username" required /></td>
            <td>{{form.username.$valid}}</td>
          </tr>
          <tr>
            <td><label for="email">E-mail:</label></td>
            <td><input type="email" name="email" placeholder="example@email.com" ng-model="email" required /></td>
            <td>{{form.email.$valid}}</td>
          </tr>
          <tr>
            <td><label for="fname">First name:</label></td>
            <td><input type="text" name="fname" placeholder="John" ng-model="fname" required /></td>
            <td>{{form.fname.$valid}}</td>
          </tr>
          <tr>
            <td><label for="lname">Last name:</label></td>
            <td><input type="text" name="lname" placeholder="Doe" ng-model="lname" required /></td>
            <td>{{form.lname.$valid}}</td>
          </tr>
          <tr>
            <td><label for="phone">Phone number:</label></td>
            <td><input type="text" name="phone" placeholder="+4676 123 45 67" ng-model="phone" required /></td>
            <td>{{form.phone.$valid}}</td>
          </tr>
          <tr>
            <td><label for="age">Age:</label></td>
            <td><input type="number" name="age" placeholder="23" ng-model="age" required /></td>
            <td>{{form.age.$valid}}</td>
          </tr>
          <tr>
            <td><label for="address">Address:</label></td>
            <td><input type="text" name="address" placeholder="Addressway 10" ng-model="address" required /></td>
            <td>{{form.address.$valid}}</td>
          </tr>
          <tr>
            <td><label for="zipcode">Zip code:</label></td>
            <td><input type="number" name="zipcode" placeholder="12345" ng-model="zipcode" required /></td>
            <td>{{form.zipcode.$valid}}</td>
          </tr>
          <tr>
            <td><label for="website">Website:</label></td>
            <td><input type="url" name="website" placeholder="http://www.exampleweb.ex" ng-model="website" required /></td>
            <td>{{form.website.$valid}}</td>
          </tr>
          <tr>
            <td><label for="password">Password:</label></td>
            <td><input type="password" name="password" ng-model="password" required /></td>
            <td>{{form.password.$valid}}</td>
          </tr>
        </table>
        <input type="submit" name="submit" value="Registrera" ng-disabled="form.$invalid" />
      </form>
    </div>
  <?php endif; ?>
</body>
</html>