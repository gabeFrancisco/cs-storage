<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property string $needed_day
 * @property int|null $is_bought
 * @property string|null $image_url
 * @property int|null $customer_id
 * @property string|null $customer_name
 * @property string|null $customer_phone
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereCustomerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereIsBought($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereNeededDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MissingProduct whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MissingProduct extends Model
{
    // public $name;
    // public $needed_day;
    // public $is_bought;
    // public $customer_name;
    // public $customer_phone;
    // public $image_url;

    protected $fillable = [
        'name',
        'needed_day',
        'is_bought',
        'customer_name',
        'customer_phone',
        'image_url'
    ];
}

