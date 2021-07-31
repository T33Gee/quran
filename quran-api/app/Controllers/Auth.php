<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;
use ReflectionException;
use App\Models\RecitalsModel;
use App\Models\UserModel;

class Auth extends BaseController
{
    /**
     * Register a new user
     * @return Response
     * @throws ReflectionException
     */
    // public function register()
    // {
    //     $rules = [
    //         'name' => 'required',
    //         'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[user.email]',
    //         'password' => 'required|min_length[8]|max_length[255]'
    //     ];

    //     $input = $this->getRequestInput($this->request);
    //     if (!$this->validateRequest($input, $rules)) {
    //         return $this
    //             ->getResponse(
    //                 $this->validator->getErrors(),
    //                 ResponseInterface::HTTP_BAD_REQUEST
    //             );
    //     }

    //     $userModel = new UserModel();
    //    $userModel->save($input);
     

       

    //     return $this
    //         ->getJWTForUser(
    //             $input['email'],
    //             ResponseInterface::HTTP_CREATED
    //         );

    // }

    /**
     * Authenticate Existing User
     * @return Response
     */
    public function login()
    {
        $rules = [
            'username' => 'required|min_length[6]|max_length[50]',
            'password' => 'required|min_length[8]|max_length[255]|validateUser[username, password]'
        ];

        $errors = [
            'password' => [
                'validateUser' => 'Invalid login credentials provided'
            ]
        ];

        $input = $this->getRequestInput($this->request);


        if (!$this->validateRequest($input, $rules, $errors)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }
       return $this->getJWTForAdmin($input['username']);       
    }

    public function enterRoom() 
    {
        $rules = [
            'inviteCode' => 'required|min_length[8]|max_length[8]',
            'username' => 'required|max_length[20]'];
        $input = $this->getRequestInput($this->request);
        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }
        $recitalModel = new RecitalsModel();
        $username = $input['username'];
        $inviteCode = $input['inviteCode'];
        $username = $recitalModel->getUniqueName($inviteCode, $username);
        return $this->getJWTForReciter($inviteCode);
    }

    public function validateInviteCode() {
        $rules = [
            'inviteCode' => 'required|min_length[8]|max_length[8]'];
            $input = $this->getRequestInput($this->request);
            if (!$this->validateRequest($input, $rules)) {
                return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
            }
            $recitalModel = new RecitalsModel();
            $inviteCode = $input['inviteCode'];
            $recital = $recitalModel->findRecitalByInviteCode($inviteCode);
            return $recital;
    }

    private function getJWTForReciter(string $inviteCode, int $responseCode = ResponseInterface::HTTP_OK)
    {
        try {
            $recitalModel = new RecitalsModel();
            $recital = $recitalModel->findRecitalByInviteCode($inviteCode);
            unset($recital['inviteCode']);
            helper('jwt');

            return $this->getResponse(['accessToken' => getSignedJWTForReciter($inviteCode)]);
        } catch (Exception $exception) {
            return $this->getResponse(['accessToken' => ''], $responseCode);
        }
    }

    private function getJWTForAdmin($username, int $responseCode = ResponseInterface::HTTP_OK)
    {
        try {
            $model = new UserModel();
            $user = $model->findUserByUsername($username);
            unset($user['password']);
            helper('jwt');

            return $this->getResponse(['accessToken' => getSignedJWTForAdmin($username)]);
        } catch (Exception $exception) {
            return $this->getResponse(['accessToken' => ''], $responseCode);
        }
    }
}