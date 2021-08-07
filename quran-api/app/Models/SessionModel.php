<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class SessionModel extends Model
{
    protected $table = 'sessions';
    protected $allowedFields = [
        'session_token',
        'session_type'
    ];

                          
    public function storeSessionToken(string $token, string $type)
    {
        $success = $this->save(['session_token' => $token, 'session_type' => $type]);
        if(!$success) throw new Exception('Error authorizing');
    }


    public function findJwt($jwt, $type) {
        $session = $this
            ->asArray()
            ->where(['session_token' => $jwt, 'session_type' => $type])
            ->first();
            
        if (!$session) 
            throw new Exception('No session found');

        return $session;
    }

    public function findAdminUsername($username) {
        $username = (new UserModel())
            ->asArray()
            ->where(['username' => $username, 'user_type' => 'Admin'])
            ->first();

        if (!$username) 
            throw new Exception('No user found');

        return $username;

    }

}