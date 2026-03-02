<?php

namespace App\Services;

use App\Enums\EmailInterval;
use App\Http\Requests\UserPreferencesCreationRequest;
use App\Models\UserPreferences;
use App\Repository\UserPreferencesRepository;
use Carbon\Carbon;

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

    private function getRequestData(UserPreferencesCreationRequest $request)
    {
        $email_interval = $request->input('email_interval');

        $userPreferences = new UserPreferences();

        $userPreferences->id = 0;
        $userPreferences->created_at = Carbon::now();
        $userPreferences->log_email = $request->input('log_email');
        $userPreferences->email_interval = EmailInterval::from($email_interval);
        $userPreferences->user_id = request()->user()->id;

        return $userPreferences;

    }

    public function create(UserPreferencesCreationRequest $request)
    {
        $userPreferences = $this->getRequestData($request);
        return $userPreferences;
    }
}