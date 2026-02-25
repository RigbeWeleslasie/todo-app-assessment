<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('tasks', function (Blueprint $table) {
        if (!Schema::hasColumn('tasks', 'due_date')) {
            $table->date('due_date')->nullable();
        }
        if (!Schema::hasColumn('tasks', 'priority')) {
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
        }
    });
}
};
