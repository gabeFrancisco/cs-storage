<?php

namespace App\Http\Controllers;

use App\Repository\UserPreferencesRepository;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    private UserPreferencesRepository $userPreferencesRepository;

    public function __construct(UserPreferencesRepository $userPreferencesRepository)
    {
        $this->userPreferencesRepository = $userPreferencesRepository;
    }
    public function get()
    {
        $user_id = request()->user()->id;
        $userPreferences = $this->userPreferencesRepository->getUserPreferences($user_id);
        return response()->json($userPreferences);
    }
}
