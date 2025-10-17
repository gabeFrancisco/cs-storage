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
        Schema::create("estimates", function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->string("title");
            $table->string("observations")->nullable();
            $table->decimal('total');

            $table->integer('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');
        });

        Schema::create("estimate_items", function(Blueprint $table){
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("description")->nullable();
            $table->integer("quantity");
            $table->decimal("price");
            $table->integer("product_type");
            $table->decimal("total");

            $table->integer("estimate_id");
            $table->foreign("estimate_id")
                ->references('id')
                ->on('estimates')
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
