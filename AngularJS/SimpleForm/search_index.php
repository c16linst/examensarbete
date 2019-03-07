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
    <form name="form" action="search_index.php" method="post" ng-model="form">
      <table>
        <tr>
          <td><input id="search-input" type="text" name="search" ng-model="search" placeholder="Search..." required /></td>
          <td>{{form.search.$valid}}</td>
        </tr>
      </table>
      <input id="submit-form" type="submit" name="submit" value="Search" />
    </form>
  </div>
  <?php if(isset($_POST['search'])) : ?>
    <?php require_once('dbConn.php'); ?>
    <div>
      <p>You have entered the e-mail <b><?php echo $_POST['search']; ?></b></p>
    </div>
  <?php endif; ?>
</body>
</html>
