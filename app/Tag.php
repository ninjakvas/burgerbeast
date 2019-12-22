<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $guarded = [];
    public $casts = ['nav' => 'boolean'];
    protected $attributes = ['nav' => 0];

    public function products()
    {
        return $this->belongsToMany('App\Product');
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
