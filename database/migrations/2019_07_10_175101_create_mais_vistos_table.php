<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMaisVistosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mais_vistos', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('usuario_id')->nullable()->index('fk_mais_vistos_usuario1_idx');
			$table->string('ip', 45)->nullable();
			$table->string('quantidade', 45)->nullable();
			$table->string('tipo_de_conteudo', 45)->nullable();
			$table->string('tempo_ativo', 45)->nullable();
			$table->string('rota', 45)->nullable();
			$table->string('slug', 245)->nullable();
			$table->integer('criado_por')->nullable();
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
		Schema::drop('mais_vistos');
	}

}
