<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTemMidiaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_tem_midia', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('evento_id')->index('fk_evento_has_evento_midia_evento1_idx');
			$table->integer('multimedia_id')->index('fk_evento_has_evento_midia_evento_midia1_idx');
			$table->integer('evento_tipo_id')->index('fk_evento_tem_midia_evento_tipo1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->integer('multimedia_tipo_id')->index('fk_evento_tem_midia_multimedia_tipo1_idx');
//			$table->primary(['id','evento_id','multimedia_id']);
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
		Schema::drop('evento_tem_midia');
	}

}
