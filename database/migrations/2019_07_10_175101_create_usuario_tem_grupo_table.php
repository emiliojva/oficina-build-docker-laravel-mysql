<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTemGrupoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tem_grupo', function(Blueprint $table)
		{
			$table->integer('usuario_id')->index('fk_usuario_has_grupo_usuario1_idx');
			$table->integer('grupo_id')->index('fk_usuario_has_grupo_grupo1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
//			$table->primary(['usuario_id','grupo_id']);
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
		Schema::drop('usuario_tem_grupo');
	}

}
