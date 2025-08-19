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

    public function createAddress(Address $address): Address
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

    public function updateAddress(Address $address):Address
    {
        $dbAddress = DB::selectOne(
            'update addresses
                set road = ?, set number = ?, set complement = ?,
                set neighborhood = ?, set city = ?, set state = ?, set updated_at = ?
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

    public function getAddress($id): Address
    {
        $dbAddress = DB::selectOne($this->selectAllQuery . ' where id = ?', [$id]);
        return $dbAddress;
    }
}
