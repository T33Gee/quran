<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class UserModel extends Model
{
    protected $table = 'users';
    protected $allowedFields = [
        'username',
        'password',
        'user_type'
    ];

                          
    public function findUserByUsername(string $username)
    {
        $user = $this->asArray()->where(['username' => $username])->first();
        if (!$user) throw new Exception('User does not exist for specified email address');
        return $user;
    }
}