<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario', function(Blueprint $table)
		{
			$table->foreign('pessoa_id', 'fk_usuario_pessoa1')->references('id')->on('pessoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_status_id', 'fk_usuario_usuario_status1')->references('id')->on('usuario_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_tipo_id', 'fk_usuario_usuario_tipo1')->references('id')->on('usuario_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_pessoa1');
			$table->dropForeign('fk_usuario_usuario_status1');
			$table->dropForeign('fk_usuario_usuario_tipo1');
		});
	}

}
