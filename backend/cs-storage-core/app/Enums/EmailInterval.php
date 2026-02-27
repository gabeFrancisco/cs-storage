<?php

namespace App\Enums;

enum EmailInterval: int
{
    case DAILY = 0;
    case WEEKLY = 1;
    case MONTHLY = 2;
}