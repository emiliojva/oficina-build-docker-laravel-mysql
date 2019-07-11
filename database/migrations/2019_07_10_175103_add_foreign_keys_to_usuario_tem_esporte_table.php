<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTemEsporteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario_tem_esporte', function(Blueprint $table)
		{
			$table->foreign('esporte_id', 'fk_usuario_has_esporte_esporte1')->references('id')->on('esporte')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_usuario_has_esporte_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_tipo_id', 'fk_usuario_tem_esporte_usuario_tipo1')->references('id')->on('usuario_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario_tem_esporte', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_has_esporte_esporte1');
			$table->dropForeign('fk_usuario_has_esporte_usuario1');
			$table->dropForeign('fk_usuario_tem_esporte_usuario_tipo1');
		});
	}

}
