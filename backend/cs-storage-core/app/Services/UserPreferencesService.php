<?php

namespace App\Services;

use App\Repository\UserPreferencesRepository;

class UserPreferencesService
{
    private UserPreferencesRepository $_repository;

    public function __construct(UserPreferencesRepository $repository)
    {
        $this->_repository = $repository;
    }

    public function get(int $user_id)
    {
        return $this->_repository->getUserPreferences($user_id);
    }
}