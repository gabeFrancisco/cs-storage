<?php

namespace App\Repository;

use App\Models\Address;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Mime\Header\DateHeader;

class AddressRepository
{
    private $selectAllQuery = 'SELECT id, created_at, updated_at, road, number, complement, neighborhood, city, state
                               FROM addresses';
    public function getAllAddresses()
    {
        $addresses = DB::select($this->selectAllQuery);

        return $addresses;
    }

    public function createAddress(Address $address)
    {
        $address = DB::selectOne(
            'INSERT INTO addresses(created_at, road, number, complement, neighborhood, city, state)
                    VALUES (?,?,?,?,?,?,?) returning *',
            [
                Carbon::now(),
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
            'UPDATE addresses
                    SET road = ?, number = ?, complement = ?,
                        neighborhood = ?, city = ?, state = ?, updated_at = ?
                    WHERE id = ? returning *
          ',
            [
                $address->road,
                $address->number,
                $address->complement,
                $address->neighborhood,
                $address->city,
                $address->state,
                Carbon::now(),
                $address->id
            ]
        );

        return $dbAddress;
    }

    public function getAddress($id)
    {
        $dbAddress = DB::selectOne($this->selectAllQuery . ' WHERE id = ?', [$id]);
        return $dbAddress;
    }

    public function deleteAddress($id){
        DB::delete(
            'DELETE from addresses WHERE id = ?',
            [$id]
        );
    }
}
