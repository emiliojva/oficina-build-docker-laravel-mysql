<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoRelacionadoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_relacionado', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->integer('evento_id_a')->index('fk_evento_has_evento_evento1_idx');
			$table->integer('evento_id_b')->index('fk_evento_has_evento_evento2_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->boolean('ativo')->nullable()->default(1);
			$table->primary(['evento_id_a','evento_id_b']);
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
		Schema::drop('evento_relacionado');
	}

}
