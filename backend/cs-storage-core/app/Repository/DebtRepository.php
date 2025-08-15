<?php

namespace App\Repository;

use App\Models\Debt;
use Illuminate\Support\Facades\DB;

class DebtRepository
{
    public function createDebt(Debt $debt)
    {
        $dbDebt = DB::selectOne(
            'insert into debts(value, forecast, customer_id, created_at)
                values (?,?,?,?)',
            [
                $debt->value,
                $debt->forecast,
                $debt->customer_id,
                $debt->created_at
            ]
        );

        return $dbDebt;
    }
}
