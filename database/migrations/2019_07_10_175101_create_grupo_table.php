<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGrupoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('grupo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('descricao', 190);
			$table->text('obs', 65535)->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'))->index('index5');
			$table->dateTime('data_atualizacao')->nullable()->index('index6');
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
		Schema::drop('grupo');
	}

}
