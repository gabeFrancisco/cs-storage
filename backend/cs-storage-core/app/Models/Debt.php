<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property numeric $value
 * @property string $forecast
 * @property string|null $paid_date
 * @property int $customer_id
 * @property-read \App\Models\Customer $customer
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereForecast($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt wherePaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Debt whereValue($value)
 * @mixin \Eloquent
 */
class Debt extends Model
{
    protected $fillable = [
        'value',
        'forecast',
        'paid_date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
