<?php

use App\Models\CashRegister;

class CashRegisterService
{
    public function getAll()
    {
        return CashRegister::all();
    }

    public function getById($id)
    {
        return CashRegister::findOrFail($id);
    }

    public function create(){

    }
}
