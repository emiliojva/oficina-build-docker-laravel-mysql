<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioRelacionadoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario_relacionado', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('usuario_id');
			$table->integer('usuario_id_relacao');
			$table->integer('criado_por');
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->boolean('ativo')->nullable()->default(1);
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
		Schema::drop('usuario_relacionado');
	}

}
