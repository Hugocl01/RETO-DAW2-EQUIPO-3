<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    // Se llama automáticamente cuando el modelo use este trait
    protected static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->generateSlug();
        });
    }

    protected function generateSlug()
    {
        // Miramos qué campo usar para generar el slug.
        // $slugSource es una propiedad que cada modelo define.
        $sourceField = $this->slugSource ?? null;

        if (! empty($sourceField) && empty($this->attributes['slug'])) {
            $base = Str::slug($this->attributes[$sourceField], '-');
            $this->attributes['slug'] = $this->makeSlugUnique($base);
        }
    }

    protected function makeSlugUnique($slugBase)
    {
        $slug = $slugBase;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $count++;
            $slug = "{$slugBase}-{$count}";
        }

        return $slug;
    }
}
