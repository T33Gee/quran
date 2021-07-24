<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class RecitalsModel extends Model
{
    protected $table = 'recitals';
    protected $allowedFields = [
        'recital_invite_code',
        'recital_type',
        'recital_name',
        'recital_started_date',
        'recital_status'
    ];

    // public function findClientById($id)
    // {
    //     $client = $this
    //         ->asArray()
    //         ->where(['id' => $id])
    //         ->first();

    //     if (!$client) throw new Exception('Could not find client for specified ID');

    //     return $client;
    // }

    // protected $beforeInsert = ['beforeInsert'];
    // protected $beforeUpdate = ['beforeUpdate'];

    // protected function beforeInsert(array $data): array
    // {
    //     return $this->getUpdatedDataWithHashedPassword($data);
    // }

    // protected function beforeUpdate(array $data): array
    // {
    //     return $this->getUpdatedDataWithHashedPassword($data);
    // }

    // private function getUpdatedDataWithHashedPassword(array $data): array
    // {
    //     if (isset($data['data']['password'])) {
    //         $plaintextPassword = $data['data']['password'];
    //         $data['data']['password'] = $this->hashPassword($plaintextPassword);
    //     }
    //     return $data;
    // }

    // private function hashPassword(string $plaintextPassword): string
    // {
    //     return password_hash($plaintextPassword, PASSWORD_BCRYPT);
    // }
                                      
    public function findRecitalByInviteCode(string $inviteCode)
    {
        $recital = $this->asArray()->where(['recital_invite_code' => $inviteCode])->first();
        if (!$recital)  throw new Exception('Recital does not exist for specified invite code');
        return $recital;
    }

    public function markAsComplete($inviteCode) {
        $recital = $this->findRecitalByInviteCode($inviteCode);
        $recital['recital_status'] = 'Complete';        
        if(!$this->update($recital['id'], $recital)) throw new Exception('Failed to mark recital as complete');
    }

    public function getAllRecitals() {
        return $this->findAll();
    }
}