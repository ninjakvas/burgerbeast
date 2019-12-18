<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['show', 'index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Tag[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request)
    {
        $isNav = $request->query('nav');
        $all = $request->query('all');
        if ($isNav) {
            return Tag::where('nav', '=', $isNav)->get();
        }
        if ($all) {
            return Tag::all();
        }
        return Tag::latest()->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->name;

        return Tag::create([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param $request
     * @param Tag $tag
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function show(Request $request, $tag)
    {
        $price = $request->query('price');

        $tag = Tag::where('slug', '=', $tag)->first();

        if (!$tag) {
            return response()->json(['message' => 'Tag does not exist'], 404);
        }

        if ($price === 'asc' || $price === 'desc') {
            return $tag->products()->orderBy('price', $price)->paginate(12);
        }
        return $tag->products()->latest()->paginate(12);
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
        $name = $request->name;
        $tag = Tag::find($id);
        $tag->update([
            'name' => $name,
            'nav' => $request->nav,
            'slug' => Str::slug($name)
        ]);
        return $tag;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Tag::find($id)->delete()) {
            return response()->json(null, 200);
        }
        return response()->json(['message' => 'Ошибка удаления'], 422);
    }
}
