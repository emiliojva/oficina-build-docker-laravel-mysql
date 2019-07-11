<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTemGrupoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario_tem_grupo', function(Blueprint $table)
		{
			$table->foreign('grupo_id', 'fk_usuario_has_grupo_grupo1')->references('id')->on('grupo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_usuario_has_grupo_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario_tem_grupo', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_has_grupo_grupo1');
			$table->dropForeign('fk_usuario_has_grupo_usuario1');
		});
	}

}
