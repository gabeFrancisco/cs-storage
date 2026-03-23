<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $road
 * @property string|null $number
 * @property string|null $complement
 * @property string|null $neighborhood
 * @property string|null $city
 * @property string|null $state
 * @property-read \App\Models\Customer|null $customer
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereComplement($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereNeighborhood($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereRoad($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Address extends Model
{
    protected $fillable = [
        'road',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state'
    ];

    public function customer()
    {
        return $this->hasOne(Customer::class, 'address_id');
    }
}
