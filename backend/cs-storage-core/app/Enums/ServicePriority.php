<?php

namespace App\Enums;

enum ServicePriority: int {
    case LOW = 0;
    case NORMAL = 1;
    case HIGH = 2;
}
