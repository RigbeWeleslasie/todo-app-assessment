<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Task::create([
    'title' => 'Finish Laravel Backend',
    'description' => 'Ensure all API routes are working',
    'completed' => false
   ]);

  \App\Models\Task::create([
    'title' => 'Build React Frontend',
    'description' => 'Use Tailwind for styling',
    'completed' => false
]);
    }
}

