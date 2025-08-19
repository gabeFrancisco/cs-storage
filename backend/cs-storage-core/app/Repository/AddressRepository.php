<?php

namespace App\Repository;

use App\Models\Address;
use Illuminate\Support\Facades\DB;

class AddressRepository
{
    private $selectAllQuery = 'select id, created_at, updated_at, road, number, complement, neighborhood, city, state from addresses';
    public function getAllAddresses()
    {
        $addresses = DB::select($this->selectAllQuery);

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

    public function updateAddress(Address $address)
    {
        $dbAddress = DB::selectOne(
            'update addresses
                set road = ?, number = ?, complement = ?,
                neighborhood = ?, city = ?, state = ?, updated_at = ?
                where id = ? returning *
          ',
            [
                $address->road,
                $address->number,
                $address->complement,
                $address->neighborhood,
                $address->city,
                $address->state,
                date("Y-m-d"),
                $address->id
            ]
        );

        return $dbAddress;
    }

    public function getAddress($id)
    {
        $dbAddress = DB::selectOne($this->selectAllQuery . ' where id = ?', [$id]);
        return $dbAddress;
    }
}
