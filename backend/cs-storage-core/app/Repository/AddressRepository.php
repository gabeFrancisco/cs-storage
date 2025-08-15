<?php

namespace App\Repository;

use App\Models\Address;
use Illuminate\Support\Facades\DB;

class AddressRepository
{
    public function getAllAddresses()
    {
        $addresses = DB::select(
            'select id, created_at, updated_at, road, number, complement, neighborhood, city, state from addresses'
        );

        return $addresses;
    }

    public function createAddress(Address $address)
    {
        $address = DB::selectOne(
            'insert into addresses(created_at, road, number, complement, neighborhood, city, state)
                    values (?,?,?,?,?,?,?) returning *',
            [
                $address->created_at,
                $address->road,
                $address->number,
                $address->complement,
                $address->neighborhood,
                $address->city,
                $address->state
            ]
        );

        return $address;
    }
}
