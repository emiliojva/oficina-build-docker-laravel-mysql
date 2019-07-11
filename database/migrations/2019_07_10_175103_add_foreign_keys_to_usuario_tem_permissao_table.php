<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTemPermissaoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario_tem_permissao', function(Blueprint $table)
		{
			$table->foreign('permissao_id', 'fk_usuario_has_permissao_permissao1')->references('id')->on('permissao')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_usuario_has_permissao_usuario')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario_tem_permissao', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_has_permissao_permissao1');
			$table->dropForeign('fk_usuario_has_permissao_usuario');
		});
	}

}
