<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'checkAdmin'])->except('show', 'index');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $price = $request->query('price');

        if ($price === 'asc' || $price === 'desc') {
            return Product::orderBy('price', $price)->paginate(15);
        }

        return Product::latest()->paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
        ]);

        $product = Product::create($request->except(['image', 'tagId']));
        if ($request->tagId) {
            $product->tags()->attach($request->tagId);
        }
        if ($request->has('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection();
        }

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Product
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Product $product
     * @return Product
     * @throws \Exception
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => ['required', 'string'],
        ]);

        $product->update($request->except(['image', 'tagId']));
        if ($request->tagId) {
            $product->tags()->sync($request->tagId);
        } else {
            $product->tags()->detach();
        }

        if ($request->has('image')) {
            if (!$product->getMedia()->isEmpty()) {
                $product->getFirstMedia()->delete();
            }
            $product->addMediaFromRequest('image')->toMediaCollection();
        }

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Product::find($id)->delete()) {
            return response()->json(null, 200);
        }
        return response()->json(['message' => 'Ошибка удаления'], 422);
    }
}
