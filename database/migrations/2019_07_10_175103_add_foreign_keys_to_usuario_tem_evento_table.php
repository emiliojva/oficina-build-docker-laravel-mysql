<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTemEventoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario_tem_evento', function(Blueprint $table)
		{
			$table->foreign('evento_id', 'fk_usuario_has_evento_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_usuario_has_evento_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_tipo_id', 'fk_usuario_tem_evento_evento_tipo1')->references('id')->on('evento_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_tipo_id', 'fk_usuario_tem_evento_usuario_tipo1')->references('id')->on('usuario_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario_tem_evento', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_has_evento_evento1');
			$table->dropForeign('fk_usuario_has_evento_usuario1');
			$table->dropForeign('fk_usuario_tem_evento_evento_tipo1');
			$table->dropForeign('fk_usuario_tem_evento_usuario_tipo1');
		});
	}

}
