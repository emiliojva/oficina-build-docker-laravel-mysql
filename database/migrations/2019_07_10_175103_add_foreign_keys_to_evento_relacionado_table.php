<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEventoRelacionadoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('evento_relacionado', function(Blueprint $table)
		{
			$table->foreign('evento_id_a', 'fk_evento_has_evento_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_id_b', 'fk_evento_has_evento_evento2')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('evento_relacionado', function(Blueprint $table)
		{
			$table->dropForeign('fk_evento_has_evento_evento1');
			$table->dropForeign('fk_evento_has_evento_evento2');
		});
	}

}
