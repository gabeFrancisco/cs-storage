<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property string $description
 * @property string|null $service_date
 * @property int $customer_id
 * @property int $address_id
 * @property numeric|null $value
 * @property int $priority
 * @property-read \App\Models\Address $address
 * @property-read \App\Models\Customer $customer
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereServiceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ServiceOrder whereValue($value)
 * @mixin \Eloquent
 */
class ServiceOrder extends Model
{
    protected $fillable = [
        'title',
        'description',
        'priority',
        'service_date',
        'value',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, "customer_id");
    }

    public function address()
    {
        return $this->belongsTo(Address::class, "address_id");
    }
}
