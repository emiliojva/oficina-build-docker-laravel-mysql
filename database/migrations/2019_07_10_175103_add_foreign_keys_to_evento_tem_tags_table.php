<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEventoTemTagsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('evento_tem_tags', function(Blueprint $table)
		{
			$table->foreign('evento_id', 'fk_evento_has_evento_tags_evento1')->references('id')->on('evento')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('evento_tags_id', 'fk_evento_has_evento_tags_evento_tags1')->references('id')->on('evento_tags')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('evento_tem_tags', function(Blueprint $table)
		{
			$table->dropForeign('fk_evento_has_evento_tags_evento1');
			$table->dropForeign('fk_evento_has_evento_tags_evento_tags1');
		});
	}

}
