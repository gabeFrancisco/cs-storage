<?php

namespace App\Repository;

use App\Models\CashRegister;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CashRegisterRepository
{

    public function getAllCashRegisters()
    {
        $cashRegisters = DB::select(
            'SELECT id, value, description, payment_type, created_at, updated_at
                    FROM cash_registers'
        );

        return $cashRegisters;
    }

    public function getCashRegister(int $id)
    {
        $cashRegister = DB::selectOne(
            'SELECT id, value, description, payment_type, created_at, updated_at
                    FROM cash_registers
                    WHERE id = ?',
            [$id]
        );

        return $cashRegister;
    }

    public function getAllByDate($date)
    {
        $cashRegisters = DB::select(
            'SELECT id, value, description, payment_type, created_at, updated_at
                    FROM cash_registers
                    WHERE created_at = ?
            ',
            [
                $date
            ]
        );

        return $cashRegisters;
    }

    public function createCashRegister(CashRegister $cashRegister)
    {
        $dbCashRegister = DB::selectOne(
            'INSERT INTO cash_registers(value, payment_type, description, created_at)
                    VALUES (?,?,?,?) returning *',
            [
                $cashRegister->value,
                $cashRegister->payment_type->value,
                $cashRegister->description,
                $cashRegister->created_at
            ]
        );

        return $dbCashRegister;
    }

    public function updateCashRegister(CashRegister $cashRegister)
    {
        $dBcashRegister = DB::selectOne(
            'UPDATE cash_registers
                    SET value = ?, payment_type = ?, description = ?, updated_at = ?
                    WHERE id = ? returning *
            ',
            [
                $cashRegister->value,
                $cashRegister->payment_type->value,
                $cashRegister->description,
                Carbon::now(),
                $cashRegister->id
            ]
        );

        return $dBcashRegister;
    }

    public function deleteCashRegister(int $id)
    {
        DB::delete(
            'DELETE from cash_registers WHERE id = ?',
            [$id]
        );
    }

    public function getDayAndMonthTotal()
    {
        $day = DB::selectOne(
            "SELECT SUM(value) AS total FROM cash_registers WHERE created_at = current_date"
        );

        $month = DB::selectOne('SELECT SUM(value) AS total FROM cash_registers WHERE strftime("%m", created_at) = strftime("%m", "now")
        ');

        return [
            "day" => $day->total != null ? $day->total : 0,
            "month" => $month->total != null ? $month->total : 0
        ];
    }
}
