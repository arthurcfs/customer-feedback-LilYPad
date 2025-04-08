<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $query = Feedback::query();

        if ($request->has('rating')) {
            $query->where('rating', $request->rating);
        }

        return $query->orderByDesc('created_at')->limit(10)->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'message' => 'required|string',
            'rating' => 'required|integer|between:1,5',
        ]);

        return Feedback::create($validated);
    }
}
