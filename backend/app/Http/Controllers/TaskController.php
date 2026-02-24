<?php
namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        return response()->json(Task::all());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date'    => 'nullable|date',
            'priority'    => 'nullable|in:low,medium,high',
            'completed'   => 'nullable|boolean',
        ]);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task) {
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json(null, 204);
    }
}
