<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMaisVistosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('mais_vistos', function(Blueprint $table)
		{
			$table->foreign('usuario_id', 'fk_mais_vistos_usuario1')->references('id')->on('usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('mais_vistos', function(Blueprint $table)
		{
			$table->dropForeign('fk_mais_vistos_usuario1');
		});
	}

}
