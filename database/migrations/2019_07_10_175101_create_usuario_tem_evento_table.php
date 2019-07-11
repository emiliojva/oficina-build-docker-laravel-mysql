<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTemEventoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tem_evento', function(Blueprint $table)
		{
			$table->integer('id');
			$table->integer('usuario_id')->index('fk_usuario_has_evento_usuario1_idx');
			$table->integer('evento_id')->index('fk_usuario_has_evento_evento1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->boolean('ativo')->nullable()->default(1);
			$table->integer('usuario_tipo_id')->index('fk_usuario_tem_evento_usuario_tipo1_idx');
			$table->integer('evento_tipo_id')->index('fk_usuario_tem_evento_evento_tipo1_idx');
//			$table->primary(['usuario_id','evento_id','id']);
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
		Schema::drop('usuario_tem_evento');
	}

}
