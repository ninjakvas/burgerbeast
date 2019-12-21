<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Product;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
//        'name' => $faker->name,
//        'phone' => '0976427023',
//        'email' => $faker->email,
        'name' => 'admin',
        'is_admin' => 1,
        'phone' => '+380999999999',
        'email' => 'dd@dd.net',
        'email_verified_at' => now(),
        'password' => bcrypt('password'),
        'remember_token' => Str::random(10),
    ];
});

$factory->define(Product::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(3),
        'subtitle' => $faker->sentence(2),
        'body' => $faker->text,
        'price' => $faker->numberBetween(50, 400)
    ];
});

$factory->define(\App\Tag::class, function (Faker $faker) {
    $name = $faker->sentence(1);
    return [
        'name' => $name,
        'slug' => Str::slug($name)
    ];
});
