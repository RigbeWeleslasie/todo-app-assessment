public function up() {
    Schema::table('tasks', function (Blueprint $table) {
        $table->string('device_token')->nullable()->index();
    });
}

public function down() {
    Schema::table('tasks', function (Blueprint $table) {
        $table->dropColumn('device_token');
    });
}
