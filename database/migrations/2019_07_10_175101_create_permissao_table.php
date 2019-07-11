<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePermissaoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('permissao', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('descricao', 190)->index('index2');
			$table->text('obs', 65535)->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index3');
			$table->dateTime('data_atualizacao')->nullable()->index('index4');
            $table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('permissao');
	}

}
