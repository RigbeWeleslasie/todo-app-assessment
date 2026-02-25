<?php
namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private function getToken(Request $request) {
        return $request->header('X-Device-Token');
    }

    public function index(Request $request) {
        $token = $this->getToken($request);
        return response()->json(
            Task::where('device_token', $token)->latest()->get()
        );
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date'    => 'nullable|date|after_or_equal:today',
            'priority'    => 'nullable|in:low,medium,high',
            'completed'   => 'nullable|boolean',
        ]);

        $validated['device_token'] = $this->getToken($request);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show(Task $task) {
        return response()->json($task);
    }

    public function update(Request $request, Task $task) {
        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date'    => 'nullable|date|after_or_equal:today',
            'priority'    => 'nullable|in:low,medium,high',
            'completed'   => 'nullable|boolean',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json(null, 204);
    }
}
