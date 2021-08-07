<?php

use App\Models\RecitalsModel;
use App\Models\SessionModel;
use Config\Services;
use Firebase\JWT\JWT;

function getJWTFromRequest($authenticationHeader): string
{
    if (is_null($authenticationHeader)) { //JWT is absent
        throw new Exception('Missing or invalid JWT in request');
    }
    //JWT is sent from client in the format Bearer XXXXXXXXX
    return explode(' ', $authenticationHeader)[1];
}

function validateJWTFromRequest(string $token)
{
    $sessionModel = new SessionModel();
    $sessionModel->findJwt($token, 'Reciter');
}

function validateAdminJwt(string $token) {
    $sessionModel = new SessionModel();    
    $sessionModel->findJwt($token, 'Admin');
    // $sessionModel->findAdminUsername($decodedToken->username);
}

function getSignedJWTForReciter(string $inviteCode, string $username)
{
    $issuedAtTime = time();
    $tokenTimeToLive = getenv('JWT_TIME_TO_LIVE');
    $tokenExpiration = $issuedAtTime + $tokenTimeToLive;
    $payload = [
        'inviteCode' => $inviteCode,
        'access' => ['accept-invite'],
        'username' => $username,
        'iat' => $issuedAtTime,
        'exp' => $tokenExpiration,
    ];

    $jwt = JWT::encode($payload, Services::getSecretKey());
    return $jwt;
}

function getSignedJWTForAdmin(string $username)
{
    $issuedAtTime = time();
    $tokenTimeToLive = getenv('JWT_TIME_TO_LIVE');
    $tokenExpiration = $issuedAtTime + $tokenTimeToLive;
    $payload = [
        'username' => $username,
        'access' =>  ['admin-home', 'admin-list', 'admin'],
        'iat' => $issuedAtTime,
        'exp' => $tokenExpiration,
    ];

    $jwt = JWT::encode($payload, Services::getSecretKey());
    return $jwt;
}