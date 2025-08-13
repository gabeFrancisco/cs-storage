<?php

namespace App\Repository;

use Illuminate\Support\Facades\DB;

class CashRegisterRepository
{

    public function getAllCashRegisters()
    {
        $registers = DB::select(
            "select id, value, description, payment_type, created_at, updated_at from cash_registers"
        );

        return $registers;
    }
}
