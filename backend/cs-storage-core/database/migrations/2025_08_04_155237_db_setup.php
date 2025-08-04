<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cash_registers', function (Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->decimal('value');
            $table->integer('payment_type');
            $table->string('description');
        });

        Schema::create('addresses', function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->string('road')->nullable();
            $table->string('number')->nullable();
            $table->string('complement')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
        });

        Schema::create('customers', function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('phone');
            $table->string('cpf_cnpj')->nullable();

            $table->integer('address_id')->nullable();
            $table->foreign('address_id')
                ->references('id')
                ->on('addresses')
                ->onDelete('cascade');
        });

        Schema::create('debts', function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->decimal('value');
            $table->dateTime('forecast');
            $table->dateTime('paid_date')->nullable();

            $table->integer('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
