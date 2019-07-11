<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEventoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('evento', function(Blueprint $table)
		{
			$table->foreign('evento_id', 'fk_evento_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_tipo_id', 'fk_evento_evento_tipo1')->references('id')->on('evento_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('multimedia_id_capa', 'fk_evento_multimedia1')->references('id')->on('multimedia')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_evento_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('evento', function(Blueprint $table)
		{
			$table->dropForeign('fk_evento_evento1');
			$table->dropForeign('fk_evento_evento_tipo1');
			$table->dropForeign('fk_evento_multimedia1');
			$table->dropForeign('fk_evento_usuario1');
		});
	}

}
