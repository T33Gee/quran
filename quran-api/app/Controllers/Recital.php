<?php

namespace App\Controllers;

use App\Models\RecitalsModel;
use App\Models\RecitalDetailsModel;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class Recital extends BaseController
{
    public function pledgeToRecite() {
        $rules = [            
            'inviteCode' => 'required|max_length[8]|min_length[8]',
            'itemName' => 'required|max_length[255]',
            'username' => 'required|max_length[255]'
        ];
        $input = $this->getRequestInput($this->request);                
        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }
        $this->updatePledgeStatus($input, 'NotStarted', 'Pledged', NULL, $input['username']);
    }

    public function pledgeCompleted() {
        $rules = [            
            'inviteCode' => 'required|max_length[8]|min_length[8]',
            'itemName' => 'required|max_length[255]',
            'username' => 'required|max_length[255]'
        ];
        $input = $this->getRequestInput($this->request);                
        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }
        $this->updatePledgeStatus($input, 'Pledged', 'Complete', $input['username'], $input['username']);
        try{
            $recitalModel = new RecitalsModel();            
            $recitalInfo = $recitalModel->findRecitalByInviteCode($input['inviteCode']);                        
            $recitalDetailsModel = new RecitalDetailsModel();            
            $recitalComplete = $recitalDetailsModel->isRecitalComplete($recitalInfo['id']);
            if($recitalComplete)  $recitalModel->markAsComplete($input['inviteCode']);
        } catch(Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not update recital status'
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
                    'id' => $detail->id,
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

    private function updatePledgeStatus($input, $oldStatus, $newStatus, $oldUsername, $newUsername) {
        try{
            $recitalModel = new RecitalsModel();
            $recitalInfo = $recitalModel->findRecitalByInviteCode($input['inviteCode']);            
            $recitalDetailsModel = new RecitalDetailsModel();
            $recitalDetailsModel->updateRecitalItemStatus($input['id'],$recitalInfo['id'], $input['itemName'], $oldStatus, $newStatus, $oldUsername, $newUsername);
            return $this->getResponse(
                [
                    'message' => 'Pledge successfully updated',
                ]
            );
        } catch(Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not update pledge'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        } 
    }
}