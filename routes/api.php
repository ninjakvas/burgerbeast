<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// user
Route::post('users/login', 'UserController@login')->name('users.login');
Route::get('users', 'UserController@index')->name('users.index');
Route::post('users', 'UserController@register')->name('users.register');
Route::put('users', 'UserController@update')->name('users.update');
Route::post('users/logout', 'UserController@logout')->name('users.logout');
Route::get('users/current', 'UserController@currentUser')->name('users.current');

// addresses
Route::apiResource('address', 'AddressController')->except('show');

// orders
Route::apiResource('orders', 'OrderController')->except(['show', 'destroy']);

// products
Route::apiResource('products', 'ProductController');

// Tags
Route::apiResource('tags', 'TagController');
