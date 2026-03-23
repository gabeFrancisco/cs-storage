<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property numeric $value
 * @property int $payment_type
 * @property string $description
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister wherePaymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CashRegister whereValue($value)
 * @mixin \Eloquent
 */
class CashRegister extends Model
{
    protected $fillable = [
        'value',
        'payment_type',
        'description'
    ];


}
