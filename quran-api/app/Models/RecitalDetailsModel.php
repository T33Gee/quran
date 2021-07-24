<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class RecitalDetailsModel extends Model
{
    protected $table = 'recital_details';
    protected $allowedFields = [
        'recital_id', 'recital_item_name',	'recital_user_name',	'recital_item_status'
    ];
    

    public function findRecitalDetailsByRecitalId(string $recitalId)
    {   
        $recitalDetails = $this->where('recital_id', $recitalId)->get()->getResult();
        if (!$recitalDetails)  throw new Exception('Recital does not exist for specified invite code');
        return $recitalDetails;
    }

    public function findRecitalItem($recitalId, $itemName, $status, $username = NULL){
        $recitalItem = $this->asArray()->where([
            'recital_id' => $recitalId,
            'recital_item_name' => $itemName,
            'recital_item_status' => $status,
            'recital_user_name' => $username
            ])->first();
        if (!$recitalItem)  throw new Exception('Recital item does not exist');
        return $recitalItem;
    }

    public function updateRecitalItemStatus($recitalId, $itemName, $oldStatus, $newStatus, $oldUsername, $newUsername){
        $item = $this->findRecitalItem($recitalId, $itemName, $oldStatus, $oldUsername);    
        $item['recital_user_name'] = $newUsername;
        $item['recital_item_status'] = $newStatus;
        $this->update($item['id'], $item);
    }


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
                                      
    // public function findUserByEmailAddress(string $emailAddress)
    // {
    //     $user = $this
    //         ->asArray()
    //         ->where(['email' => $emailAddress])
    //         ->first();

    //     if (!$user) 
    //         throw new Exception('User does not exist for specified email address');

    //     return $user;
    // }
}