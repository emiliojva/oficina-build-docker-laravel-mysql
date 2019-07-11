<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEventoTagsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('evento_tags', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('descricao', 245)->nullable();
			$table->timestamp('data_criacao')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('data_atualizacao')->nullable();
			$table->string('slug', 245)->nullable();
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
		Schema::drop('evento_tags');
	}

}
