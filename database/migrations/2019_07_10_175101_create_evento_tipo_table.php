<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTipoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_tipo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('nome', 245)->nullable();
			$table->text('descricao', 65535)->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->boolean('ativo')->nullable()->default(1);
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
		Schema::drop('evento_tipo');
	}

}
