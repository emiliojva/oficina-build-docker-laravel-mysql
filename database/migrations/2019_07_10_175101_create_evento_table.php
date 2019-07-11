<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento', function(Blueprint $table)
		{
			$table->integer('id');
			$table->integer('evento_tipo_id')->index('fk_evento_evento_tipo1_idx');
			$table->integer('usuario_id')->index('fk_evento_usuario1_idx');
			$table->integer('evento_id')->nullable()->index('fk_evento_evento1_idx');
			$table->integer('multimedia_id_capa')->nullable()->index('fk_evento_multimedia1_idx');
			$table->string('slug', 245)->nullable();
			$table->string('titulo', 245)->nullable();
			$table->text('descricao')->nullable();
			$table->text('historia', 65535)->nullable();
			$table->boolean('autorizacao');
			$table->dateTime('data_inicio_evento')->nullable();
			$table->dateTime('data_fim_evento')->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index4');
			$table->dateTime('data_atualizacao')->nullable()->index('index5');
			$table->boolean('ativo')->nullable()->default(1);
			$table->primary(['id','evento_tipo_id']);
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
		Schema::drop('evento');
	}

}
