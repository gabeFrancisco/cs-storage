<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('god', function () {
    $word = Http::get('https://bible-api.com/data/web/random/NT')
        ->json("random_verse");

    $this->comment(
        "\n" . $word["book"] . ' ' . $word["chapter"] . ":" . $word["verse"]
        . "\n" . $word["text"]
    );
})->purpose("Display a random Biblical verse");
