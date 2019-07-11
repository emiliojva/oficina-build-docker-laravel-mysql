<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTemPermissaoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_tem_permissao', function(Blueprint $table)
		{
			$table->integer('usuario_id')->index('fk_usuario_has_permissao_usuario_idx');
			$table->integer('permissao_id')->index('index5');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index6');
			$table->dateTime('data_atualizacao')->nullable()->index('index7');
//			$table->primary(['usuario_id','permissao_id']);
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
		Schema::drop('usuario_tem_permissao');
	}

}
