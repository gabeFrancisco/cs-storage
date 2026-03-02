<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPreferencesCreationRequest;
use App\Repository\UserPreferencesRepository;
use App\Services\UserPreferencesService;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    private UserPreferencesService $userPreferencesService;

    public function __construct(UserPreferencesService $userPreferencesService)
    {
        $this->userPreferencesService = $userPreferencesService;
    }
    public function get()
    {
        $user_id = request()->user()->id;
        $userPreferences = $this->userPreferencesService->get($user_id);
        return response()->json($userPreferences);
    }

    public function post(UserPreferencesCreationRequest $request)
    {
        $userPreferences = $this->userPreferencesService->create($request);
        return response()->json($userPreferences);
    }
}
