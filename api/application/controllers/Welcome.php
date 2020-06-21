<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// check session and permissions in base controller
class Welcome extends CI_Controller {
	public function sayHi(){
		// define returnApiOutput method in base controller
		print_r(json_encode(array("hi"=>"hello")));
	}
}
