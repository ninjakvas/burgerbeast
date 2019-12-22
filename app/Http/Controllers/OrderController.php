<?php

namespace App\Http\Controllers;

use App\Notifications\NewOrder;
use App\Notifications\SendPassword;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use App\User;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->except('store');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $all = $request->query('all');
        $reset = $request->query('reset');

        if ($user->is_admin && $all === '1') {
            if ($reset) {
                User::where('is_admin', '=', 1)->first()->notifications()->delete();
            }
            return Order::with('user')->latest()->paginate(10);
        }

        return $user->orders()->latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth('api')->user();
        $bonus = $request->query('bonus');
        if ($user) {
            $request->validate([
                'address' => ['required'],
            ]);
            $address = $user->addresses()->firstOrCreate($request->only(['address']));
        } else {
            $request->validate([
                'name' => ['required', 'string'],
                'phone' => ['required', 'regex:/^\+380\d{3}\d{2}\d{2}\d{2}$/', Rule::unique('users')],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'address' => ['required', 'string'],
            ]);
            $password = Str::random(8);
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => bcrypt($password)
            ]);
            $user->notify(new SendPassword($password));
            $address = $user->addresses()->create($request->only(['address']));
        }

        // create user order
        $newOrder = $user->orders()->create();
        // attach user address to order
        $newOrder->addresses()->attach($address);
        // attach products to order
        foreach ($request->products as $product) {
            $newOrder->products()->attach($product['id'], ['qty' => $product['qty']]);
        }
        // get order total price
        $orderTotal = $newOrder->products()->get()->sum(function ($item) {
            return $item->price * $item->pivot->qty;
        });
        if ($bonus === '1' && $user->bonus >= $orderTotal) {
            $user->update(['bonus' => $user->bonus - $orderTotal]);
            $newOrder->update(['total' => 0]);
        } else {
            $newOrder->update(['total' => $orderTotal]);
            $user->update(['bonus' => $user->bonus += $orderTotal * 0.1]);
        }
        User::where('is_admin', '=', 1)->first()->notify(new NewOrder());

        if (!auth('api')->user()) {
            $user->token = $user->createToken('access_token')->accessToken;
        }
        return $user->load('addresses');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Order::find($id)->update(['status' => (int)$request->status]);

        return response()->json('updated', 200);
    }
}
