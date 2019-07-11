<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsuarioTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usuario', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('usuario_pai')->nullable();
			$table->string('login', 190)->nullable();
			$table->string('senha', 190);
			$table->string('email', 190)->unique('email_UNIQUE');
			$table->integer('pessoa_id')->index('fk_usuario_pessoa1_idx');
			$table->integer('usuario_tipo_id')->index('fk_usuario_usuario_tipo1_idx');
			$table->integer('usuario_status_id')->default(1)->index('fk_usuario_usuario_status1_idx');
			$table->string('slug', 245)->nullable();
			$table->boolean('superuser')->nullable();
			$table->integer('criado_por')->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index5');
			$table->dateTime('data_atualizacao')->nullable()->index('index6');
			$table->boolean('ativo')->nullable()->default(1);
			$table->string('hash_solicitacao', 32)->nullable()->default('f4552671f8909587cf485ea990207f3b');
//			$table->primary(['id','pessoa_id','usuario_tipo_id']);
			$table->index(['login','senha'], 'index4');
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
		Schema::drop('usuario');
	}

}
