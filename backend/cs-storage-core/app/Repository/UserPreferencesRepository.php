<?php

namespace App\Repository;

use App\Models\UserPreferences;
use DB;

class UserPreferencesRepository
{
    private $selectQuery = 'SELECT 
                                id, 
                                created_at, 
                                updated_at, 
                                log_email, 
                                email_interval, 
                                user_id
                            FROM user_preferences';
    public function getUserPreferences(int $user_id)
    {
        $user_preferences = DB::select($this->selectQuery . ' WHERE user_id = ?', [$user_id]);
        return $user_preferences;
    }

    public function createUserPreferences(UserPreferences $userPreferences)
    {
        $dbUserPreferences = DB::selectOne(
            'INSERT INTO user_preferences(log_email, email_interval, user_id, created_at)
            VALUES (?,?,?,?) returning *;',
            [
                $userPreferences->log_email,
                $userPreferences->email_interval,
                $userPreferences->user_id,
                $userPreferences->created_at
            ]
        );

        return $dbUserPreferences;
    }
}