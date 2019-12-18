<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'order_address');
    }
}
