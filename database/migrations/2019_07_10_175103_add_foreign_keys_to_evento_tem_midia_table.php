<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEventoTemMidiaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('evento_tem_midia', function(Blueprint $table)
		{
			$table->foreign('evento_id', 'fk_evento_has_evento_midia_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('multimedia_id', 'fk_evento_has_evento_midia_evento_midia1')->references('id')->on('multimedia')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_tipo_id', 'fk_evento_tem_midia_evento_tipo1')->references('id')->on('evento_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('multimedia_tipo_id', 'fk_evento_tem_midia_multimedia_tipo1')->references('id')->on('multimedia_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('evento_tem_midia', function(Blueprint $table)
		{
			$table->dropForeign('fk_evento_has_evento_midia_evento1');
			$table->dropForeign('fk_evento_has_evento_midia_evento_midia1');
			$table->dropForeign('fk_evento_tem_midia_evento_tipo1');
			$table->dropForeign('fk_evento_tem_midia_multimedia_tipo1');
		});
	}

}
