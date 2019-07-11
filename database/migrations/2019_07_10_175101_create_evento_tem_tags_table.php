<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTemTagsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_tem_tags', function(Blueprint $table)
		{
			$table->integer('evento_id')->index('fk_evento_has_evento_tags_evento1_idx');
			$table->integer('evento_tags_id')->index('fk_evento_has_evento_tags_evento_tags1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
//			$table->primary(['evento_id','evento_tags_id']);
            $table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('evento_tem_tags');
	}

}
