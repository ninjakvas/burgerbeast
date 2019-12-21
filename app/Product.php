<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Product extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $guarded = [];
    protected $hidden = ['media'];
    protected $appends = ['image', 'thumbnail', 'tag'];
    protected $casts = ['price' => 'integer'];

    public function orders()
    {
        return $this->belongsToMany('App\Order');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }

    /**
     * @param Media|null $media
     * @throws \Spatie\Image\Exceptions\InvalidManipulation
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')
            ->crop('crop-center', 100, 70)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('450x300')
            ->crop('crop-center', 450, 300)
            ->keepOriginalImageFormat();
    }

    public function getImageAttribute()
    {
        $image = $this->getFirstMediaUrl('default', '450x300');
        if (!$image) {
            return 'http://via.placeholder.com/450x300';
        }
        return $image;
    }

    public function getThumbnailAttribute()
    {
        $image = $this->getFirstMediaUrl('default', 'thumb');
        if (!$image) {
            return 'http://via.placeholder.com/100x70';
        }
        return $image;
    }

    public function getTagAttribute()
    {
        $firstTag = $this->tags()->first();
        if ($firstTag) {
            return $firstTag->id;
        }
        return 0;
    }
}
