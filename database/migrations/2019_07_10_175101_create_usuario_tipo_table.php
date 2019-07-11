<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTipoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tipo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('nome', 190)->nullable()->index('index4');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index5');
			$table->dateTime('data_atualizacao')->nullable()->index('index6');
			$table->text('descricao', 65535)->nullable();
			$table->string('slug', 245)->nullable();
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
		Schema::drop('usuario_tipo');
	}

}
