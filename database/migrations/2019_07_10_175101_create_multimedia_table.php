<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMultimediaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('multimedia', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('descricao', 190);
			$table->string('nome_do_arquivo', 254)->comment('NOME DO ARQUIVO OU URL');
			$table->text('historia', 65535)->nullable();
			$table->string('slug', 245)->nullable();
			$table->string('tamanho', 145)->nullable();
			$table->string('nome_original_upload', 245)->nullable();
			$table->integer('multimedia_tipo_id')->index('fk_multimedia_multimedia_tipo1_idx');
			$table->string('formato', 145)->nullable();
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
		Schema::drop('multimedia');
	}

}
