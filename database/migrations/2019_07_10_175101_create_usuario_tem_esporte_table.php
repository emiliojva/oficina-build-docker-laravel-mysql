<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTemEsporteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tem_esporte', function(Blueprint $table)
		{
			$table->integer('id');
			$table->integer('usuario_id')->index('fk_usuario_has_esporte_usuario1_idx');
			$table->integer('esporte_id')->index('fk_usuario_has_esporte_esporte1_idx');
			$table->integer('usuario_tipo_id')->index('fk_usuario_tem_esporte_usuario_tipo1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
//			$table->primary(['id','usuario_id','esporte_id']);
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
		Schema::drop('usuario_tem_esporte');
	}

}
