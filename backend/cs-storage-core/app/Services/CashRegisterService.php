<?php

namespace App\Services;

use App\Http\Requests\CashRegisterRequest;
use App\Models\CashRegister;
use App\Repository\CashRegisterRepository;
use Error;
use Carbon\Carbon;

class CashRegisterService
{
    private CashRegisterRepository $_repository;
    public function __construct(CashRegisterRepository $repository) {
        $this->_repository = $repository;
    }
    public function getAll()
    {
        return $this->_repository->getAllCashRegisters();
    }

    public function getAllByToday()
    {
        return CashRegister::whereDate('created_at', Carbon::today())->get();
    }

    //TODO
    public function getAllByDate($date)
    {
        return CashRegister::where('created_at', $date)->get();
    }

    public function getById($id)
    {
        return $this->_repository->getCashRegister($id);
    }

    public function create(CashRegisterRequest $request)
    {
        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');
        $created_at = $request->input('created_at');

        if ($payment_type < 0 && $payment_type > 4) {
            throw new Error("Payment type is invalid!");
        }

        $register = $this->_repository->createCashRegister(new CashRegister(
            $value, $payment_type, $description, $created_at
        ));

        return $register;
    }

    public function update(CashRegisterRequest $request)
    {
        $id = $request->input("id");

        $value = $request->input("value");
        $payment_type = $request->input('payment_type');
        $description = $request->input('description');
        $created_at = $request->input('created_at');

        if ($payment_type < 0 && $payment_type > 4) {
            throw new Error("Payment type is invalid!");
        }

        $dbRegister = $this->getById($id);

        CashRegister::where("id", $id)->update([
            'value' => $value,
            'payment_type' => $payment_type,
            'description' => $description,
            'created_at' => $created_at
        ]);

        $dbRegister->refresh();

        return $dbRegister;
    }

    public function remove($id)
    {
        $register = $this->getById($id);
        $register->delete();

        return $register;
    }

    public function getDayAndMonthTotal()
    {
        $day = CashRegister::whereDate('created_at', Carbon::today())->sum('value');
        $month = CashRegister::whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->get()->sum('value');

        return [
            'day' => $day,
            'month' => $month
        ];
    }
}
