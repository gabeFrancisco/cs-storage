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
    public function __construct(CashRegisterRepository $repository)
    {
        $this->_repository = $repository;
    }
    public function getAll()
    {
        return $this->_repository->getAllByTodayDate();
    }

    public function getAllByToday()
    {
        return $this->_repository->getAllByTodayDate();
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
            null,
            $value,
            $payment_type,
            $description,
            $created_at
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

        $register = $this->_repository->updateCashRegister(new CashRegister(
            $id,
            $value,
            $payment_type,
            $description,
            $created_at
        ));

        return $register;
    }

    public function remove($id)
    {
        $register = $this->_repository->deleteCashRegister($id);

        return $register;
    }

    public function getDayAndMonthTotal()
    {
        return $this->_repository->getDayAndMonthTotal();
    }
}
