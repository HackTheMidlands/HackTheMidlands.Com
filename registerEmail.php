<?php
session_start();

require_once("SaveEmailResult.php");

if(!isset($_SESSION['visitedPage']) || $_SESSION['visitedPage'] !== "true"){
	die();
}

if(!isset($_POST['emailAddress'])){
	echo SaveEmailResult::$InvalidEmail;
	exit();
}

$email = $_POST['emailAddress'];

/*
TODO: MailChip

Checks that might be needed:
1. """Valid""" email
2. Make sure it's not @hackthemidlands.com
3. Make sure it doesn't exist already
4. General API error
*/

echo SaveEmailResult::$ErrorSaving;

?>
