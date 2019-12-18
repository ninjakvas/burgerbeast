<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $timestamps = false;
    public $guarded = [];
    public $casts = ['nav' => 'boolean'];

    public function products()
    {
        return $this->belongsToMany('App\Product');
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
