<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTemEsporteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_tem_esporte', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('evento_id')->index('fk_evento_has_esporte_evento1_idx');
			$table->integer('esporte_id')->index('fk_evento_has_esporte_esporte1_idx');
			$table->integer('evento_tipo_id')->index('fk_evento_tem_esporte_evento_tipo1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
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
		Schema::drop('evento_tem_esporte');
	}

}
