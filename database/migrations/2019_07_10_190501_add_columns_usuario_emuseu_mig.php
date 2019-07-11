<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsUsuarioEmuseuMig extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

//        Schema::table('usuario', function (Blueprint $table) {
//            $table->primary('id');
//        });
        Schema::table('usuario', function (Blueprint $table) {
//            $table->bigInteger('id', true)->change();
            $table->rememberToken();
        });

        //
//        Schema::create('usuario', function (Blueprint $table) {
////            $table->bigInteger('id')->autoIncrements()->change();
//            $table->string('name');
////            $table->string('email')->unique()->change();
////            $table->timestamp('email_verified_at')->nullable();
////            $table->string('password');
//            $table->rememberToken();
////            $table->timestamps();
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
