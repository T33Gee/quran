<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;
use ReflectionException;
use App\Models\RecitalsModel;

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
    // public function login()
    // {
    //     $rules = [
    //         'email' => 'required|min_length[6]|max_length[50]|valid_email',
    //         'password' => 'required|min_length[8]|max_length[255]|validateUser[email, password]'
    //     ];

    //     $errors = [
    //         'password' => [
    //             'validateUser' => 'Invalid login credentials provided'
    //         ]
    //     ];

    //     $input = $this->getRequestInput($this->request);


    //     if (!$this->validateRequest($input, $rules, $errors)) {
    //         return $this
    //             ->getResponse(
    //                 $this->validator->getErrors(),
    //                 ResponseInterface::HTTP_BAD_REQUEST
    //             );
    //     }
    //    return $this->getJWTForUser($input['email']);

       
    // }

    public function enterRoom() 
    {
        $rules = ['inviteCode' => 'required|min_length[8]|max_length[8]'];
        $input = $this->getRequestInput($this->request);
        if (!$this->validateRequest($input, $rules)) {
            return $this->getResponse($this->validator->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }
        return $this->getJWTForReciter($input['inviteCode']);
    }

    private function getJWTForReciter(string $inviteCode, int $responseCode = ResponseInterface::HTTP_OK)
    {
        try {
            $model = new RecitalsModel();
            $recital = $model->findRecitalByInviteCode($inviteCode);
            unset($recital['inviteCode']);
            helper('jwt');

            return $this->getResponse([
                            'message' => 'User authenticated successfully',
                            'access_token' => getSignedJWTForReciter($inviteCode)
                    ]);
        } catch (Exception $exception) {
            return $this->getResponse(
                    [
                        'message' => $exception->getMessage(),
                        'access_token' => ''
                    ],
                    $responseCode
                );
        }
    }
}