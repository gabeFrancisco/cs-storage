<?php

namespace App\Repository;

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
}