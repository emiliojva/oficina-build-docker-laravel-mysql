<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEventoTemEsporteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('evento_tem_esporte', function(Blueprint $table)
		{
			$table->foreign('esporte_id', 'fk_evento_has_esporte_esporte1')->references('id')->on('esporte')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_id', 'fk_evento_has_esporte_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_tipo_id', 'fk_evento_tem_esporte_evento_tipo1')->references('id')->on('evento_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('evento_tem_esporte', function(Blueprint $table)
		{
			$table->dropForeign('fk_evento_has_esporte_esporte1');
			$table->dropForeign('fk_evento_has_esporte_evento1');
			$table->dropForeign('fk_evento_tem_esporte_evento_tipo1');
		});
	}

}
