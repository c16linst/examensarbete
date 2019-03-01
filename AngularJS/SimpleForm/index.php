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
  <div ng-app="">
    <form name="form" action="index.php" method="post" ng-model="form">
      <table>
        <tr>
          <td><label for="email">E-mail:</label></td>
          <td><input id="email-input" type="email" name="email" ng-model="email" placeholder="E-mail" required /></td>
          <td>{{form.email.$valid}}</td>
        </tr>
      </table>
      <input id="submit-form" type="submit" name="submit" value="Registrera" />
    </form>
  </div>
  <?php if(isset($_POST['email'])) : ?>
    <?php require_once('dbConn.php'); ?>
    <div>
      <p>You have entered the e-mail <b><?php echo $_POST['email']; ?></b></p>
    </div>
  <?php endif; ?>
</body>
</html>
