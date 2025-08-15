<?php

namespace App\Repository;

use App\Models\CashRegister;
use Illuminate\Support\Facades\DB;

class CashRegisterRepository
{

    public function getAllCashRegisters()
    {
        $cashRegisters = DB::select(
            "select id, value, description, payment_type, created_at, updated_at from cash_registers"
        );

        return $cashRegisters;
    }

    public function createCashRegister(CashRegister $cashRegister)
    {
        $cashRegister = DB::selectOne(
            'insert into cash_registers(value, payment_type, description, created_at) values (?,?,?,?) returning *',
            [
                $cashRegister->value,
                $cashRegister->payment_type,
                $cashRegister->description,
                $cashRegister->created_at
            ]
        );

        return $cashRegister;
    }

    public function getCashRegister(int $id){
        $cashRegister = DB::selectOne(
            'select id, value, description, payment_type, created_at, updated_at from cash_registers where id = ?',
            [$id]
        );

        return $cashRegister;
    }
}
