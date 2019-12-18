<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $with = ['products'];
    protected $appends = ['address'];
    protected $guarded = [];
    protected $casts = ['status' => 'integer', 'total' => 'integer'];

    public function products()
    {
        return $this->belongsToMany('App\Product')->withPivot('qty');
    }

    public function addresses()
    {
        return $this->belongsToMany('App\Address', 'order_address');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getAddressAttribute()
    {
        if (!$this->addresses()->first()) {
            return '-';
        }
        return $this->addresses()->first()->address;
    }
}
