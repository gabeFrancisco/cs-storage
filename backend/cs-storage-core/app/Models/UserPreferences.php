<?php

namespace App\Models;

use App\Enums\EmailInterval;

class UserPreferences extends BaseModel
{
    public $user_id;
    public $log_email;
    public EmailInterval $email_interval;
}
