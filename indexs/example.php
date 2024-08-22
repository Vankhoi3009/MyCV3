<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    echo "<h2>Welcome : " . $name . "</h2>";
    
}
?>
