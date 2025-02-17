<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->generateSlug();
        });

        static::updating(function ($model) {
            if ($model->isDirty($model->slugSource ?? '')) {
                $model->generateSlug();
            }
        });
    }

    protected function generateSlug()
    {
        $sourceField = $this->slugSource ?? null;

        if (!empty($sourceField) && empty($this->attributes['slug'])) {
            $base = Str::slug($this->{$sourceField}, '-');
            $this->attributes['slug'] = $this->makeSlugUnique($base);
        }
    }

    protected function makeSlugUnique($slugBase)
    {
        $slug = $slugBase;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = "{$slugBase}-" . $count++;
        }

        return $slug;
    }
}
