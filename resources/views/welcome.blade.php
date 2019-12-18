<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}} - доставка еды</title>
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>
<body>
<div id="cooking-loader">
    <div id="cooking">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div id="area">
            <div id="sides">
                <div id="pan"></div>
                <div id="handle"></div>
            </div>
            <div id="pancake">
                <div id="pastry"></div>
            </div>
        </div>
    </div>
</div>
<div id="app"></div>
<script src="{{asset('js/app.js')}}"></script>
</body>
</html>
