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
        Schema::create('missing_products', function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->dateTime('needed_day');
            $table->boolean('is_bought')->nullable();
            $table->string('image_url')->nullable();

            $table->integer('customer_id')->nullable();
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
