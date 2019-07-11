<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsUsuarioEmuseuMigName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuario', function (Blueprint $table) {
            $table->string('name');
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('usuario', function (Blueprint $table) {
            $table->dropColumn('name');
        });

    }
}
