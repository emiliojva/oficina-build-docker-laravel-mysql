<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTemAvatarTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tem_avatar', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('usuario_id')->index('fk_usuario_has_multimedia_usuario1_idx');
			$table->integer('multimedia_id')->index('fk_usuario_has_multimedia_multimedia1_idx');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->boolean('ativo')->nullable()->default(1);
//			$table->primary(['id','usuario_id','multimedia_id']);
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
		Schema::drop('usuario_tem_avatar');
	}

}
