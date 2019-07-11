<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUsuarioTemAvatarTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('usuario_tem_avatar', function(Blueprint $table)
		{
			$table->foreign('multimedia_id', 'fk_usuario_has_multimedia_multimedia1')->references('id')->on('multimedia')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('usuario_id', 'fk_usuario_has_multimedia_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('usuario_tem_avatar', function(Blueprint $table)
		{
			$table->dropForeign('fk_usuario_has_multimedia_multimedia1');
			$table->dropForeign('fk_usuario_has_multimedia_usuario1');
		});
	}

}
