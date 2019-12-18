<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(['currentUser', 'update', 'logout']);
    }

    public function index()
    {
        return User::latest()->paginate(10);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'regex:/^\+380\d{3}\d{2}\d{2}\d{2}$/'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        $credentials = request(['phone', 'password']);

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $user->token = $user->createToken('access_token')->accessToken;
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'The username or password is incorrect'], 401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'regex:/^\+380\d{3}\d{2}\d{2}\d{2}$/', Rule::unique('users')],
            'name' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'phone' => $request->phone,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);

        $user = User::find($user->id);
        $user->token = $user->createToken('access_token')->accessToken;

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function currentUser(Request $request)
    {
        if (!$request->user()) {
            return response()->json([], 404);
        }
        return $request->user();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'name' => ['string', 'max:255'],
            'email' => ['email', Rule::unique('users')->ignore($user->id)],
            'phone' => ['required', 'regex:/^\+380\d{3}\d{2}\d{2}\d{2}$/', Rule::unique('users')->ignore($user->id)],
            'sex' => ['string', Rule::in(['male', 'female'])],
        ]);

        $user->update($request->all());
        return $user;
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'success'], 200);
    }
}
