<?php

namespace App\Controllers;

use App\Models\RecitalsModel;
use App\Models\RecitalDetailsModel;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class Admin extends BaseController
{

    /**
     * MOVE TO ADMIN
     */
    public function create()
    {
        $rules = [            
            'recitalType' => 'required',
            'recitalName' => 'required|max_length[255]'
        ];

        $input = $this->getRequestInput($this->request);
        

        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }

        // TODO find a way to validate enum values
        $recitalType = $input['recitalType'];
        if($recitalType!=='Khattam' && $recitalType!=='Surah') {
            return $this->getResponse(['Invalid recital type'], ResponseInterface::HTTP_BAD_REQUEST);
        }

        // TODO enable this feature when surah name can be specified
        // if($recitalType === 'Surah' && !$input['surahName']) return $this->getResponse(['pleasse specify surah name'], ResponseInterface::HTTP_BAD_REQUEST);
        $howManyTimes =  array_key_exists('recitalNumberOfTimes',$input) ? $input['recitalNumberOfTimes'] : 30;        
        $recitalTypePrependtext = '';
        if($recitalType === 'Surah' && !$howManyTimes){ 
            $howManyTimes = 40;            
        }
        if($recitalType === 'Khattam'){
             $howManyTimes = 30;
             $recitalTypePrependtext = 'Juz\'';
        }
        if(!$recitalTypePrependtext) $recitalTypePrependtext = 'Recital'; // TODO when surah name implemented change this
        $recitalModel = new RecitalsModel();
        $inviteCode = $this->generateRandomString();
        while($recitalModel->where('recital_invite_code', $inviteCode)->first()) {
            $inviteCode = $this->generateRandomString();
        }
        //TODO move mapping code
        $recitalInfo = [
            'recital_type' => $input['recitalType'],
            'recital_name' => $input['recitalName'],
            'recital_invite_code' => $inviteCode,
            'recital_started_date' => date('Y-m-d'),
            'recital_status' => 'Pending'
        ];
        $recitalModel->save($recitalInfo);
        

        $recitalId = $recitalModel->where('recital_invite_code', $inviteCode)->first()['id'];
        
        $recitalDetailsModel = new RecitalDetailsModel();
        
        $recitalDetailsData = array();        
        for($i=1;$i<=$howManyTimes;$i++){
            array_push($recitalDetailsData,array(
                'recital_item_name' => $recitalTypePrependtext.' '.$i,
                'recital_item_status' => 'NotStarted',
                'recital_id' => $recitalId,
            ));
        }

        $recitalDetailsModel->insertBatch($recitalDetailsData); 
        
        
        // var_dump($recitalDetailsModel->getLastQuery()->getQuery());die();

        return $this->getResponse(
            [
                'message' => 'Recital added successfully',
                'inviteCode' => $inviteCode
            ]
        );
    }
    /**
     * MOVE TO ADMIN
     */
    public function getAllRecitals() {
        try{
            $model = new RecitalsModel();
            return $this->getResponse($model->getAllRecitals());        
        } catch(Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not get recitals'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }
    
    /**
     * Get a single recital by invitecode
     */
    public function getDetails($inviteCode)
    {
        try {

            $model = new RecitalsModel();
            $recitalInfo = $model->findRecitalByInviteCode($inviteCode);
            $recitalId = $recitalInfo['id'];
            $recitalDetailsModel = new RecitalDetailsModel();
            $recitalDetails = $recitalDetailsModel->findRecitalDetailsByRecitalId($recitalId);            
            //TODO move mapping code
            $response = array();
            $response['inviteCode'] = $inviteCode;
            $response['recitalType'] = $recitalInfo['recital_type'];
            $response['recitalName'] = $recitalInfo['recital_name'];
            $response['startedDate'] = $recitalInfo['recital_started_date'];
            $response['recitalStatus'] = $recitalInfo['recital_status'];
            $response['recitalItems'] = array();
            foreach($recitalDetails as $detail) {
                array_push($response['recitalItems'], array(
                    'itemName' =>  $detail->recital_item_name,
                    'usersName' =>  $detail->recital_user_name,
                    'status' =>  $detail->recital_item_status
                ));
            }
            
            return $this->getResponse($response);

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not find recital details'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }

    private function generateRandomString($length = 8) {
        $characters = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

}