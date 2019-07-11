<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMultimediaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('multimedia', function(Blueprint $table)
		{
			$table->foreign('multimedia_tipo_id', 'fk_multimedia_multimedia_tipo1')->references('id')->on('multimedia_tipo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('multimedia', function(Blueprint $table)
		{
			$table->dropForeign('fk_multimedia_multimedia_tipo1');
		});
	}

}
