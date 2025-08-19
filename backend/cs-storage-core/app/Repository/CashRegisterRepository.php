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
            "select id, value, description, payment_type, created_at, updated_at from cash_registers"
        );

        return $cashRegisters;
    }

    public function getCashRegister(int $id)
    {
        $cashRegister = DB::selectOne(
            'select id, value, description, payment_type, created_at, updated_at from cash_registers where id = ?',
            [$id]
        );

        return $cashRegister;
    }

    public function getAllByTodayDate()
    {
        $cashRegisters = DB::select(
            'select id, value, description, payment_type, created_at, updated_at from cash_registers
                    where created_at = current_date
            '
        );

        return $cashRegisters;
    }

    public function createCashRegister(CashRegister $cashRegister)
    {
        $dBcashRegister = DB::selectOne(
            'insert into cash_registers(value, payment_type, description, created_at) values (?,?,?,?) returning *',
            [
                $cashRegister->value,
                $cashRegister->payment_type,
                $cashRegister->description,
                $cashRegister->created_at
            ]
        );

        return $dBcashRegister;
    }

    public function updateCashRegister(CashRegister $cashRegister)
    {
        $dBcashRegister = DB::selectOne(
            'update cash_registers
                    set value = ?, payment_type = ?, description = ?, updated_at = ?
                    where id = ? returning *
            ',
            [
                $cashRegister->value,
                $cashRegister->payment_type,
                $cashRegister->description,
                date('Y-m-d'),
                $cashRegister->id
            ]
        );

        return $dBcashRegister;
    }

    public function deleteCashRegister(int $id)
    {
        $cashRegister = DB::selectOne(
            'delete from cash_registers where id = ?',
            [$id]
        );

        return $cashRegister;
    }

    public function getDayAndMonthTotal()
    {
        $day = DB::selectOne('
            select sum(value) as total from cash_registers where created_at = current_date
        ');

        $month = DB::selectOne('
            select sum(value) as total from cash_registers where strftime("%m", created_at) = strftime("%m", "now")
        ');

        return [
            "day" => $day->total,
            "month" => $month->total
        ];
    }
}
